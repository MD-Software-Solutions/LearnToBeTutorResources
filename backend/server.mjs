import express from 'express';  // Use import syntax
import cors from 'cors';
import * as cheerio from 'cheerio';  // Correct import for cheerio
import axios from 'axios';
import url from 'url';
import pLimit from 'p-limit';  // To limit concurrency

const app = express();
const port = 3400;

// Enable CORS for all origins
app.use(cors());

// Limit concurrency to a manageable number (e.g., 5 concurrent requests)
const limit = pLimit(5);

// Route to send a simple string
app.get('/', (req, res) => {
    res.send('Hello, this is a simple backend response!');
});

app.get('/scrape-links-k5', async (req, res) => {
    try {
        const scrapeURL = req.query.url;

        const response = await axios.get(scrapeURL);
        
        const $ = cheerio.load(response.data);

        const baseUrl = 'https://www.k5learning.com';
        const links = [];

        // Scrape the main links
        $('div.two-columns').each((index, element) => {
            $(element).find('p').each((i, pTag) => {
                let link = $(pTag).find('a').attr('href');
                if (link) {
                    if (link.startsWith('/')) {
                        link = url.resolve(baseUrl, link);
                    }
                    links.push(link);
                }
            });
        });

        // Step 4: Scrape additional links from each page found on the main page
        const allLinks = await Promise.all(links.map((link) => 
            limit(async () => {
                try {
                    const pageResponse = await axios.get(link);
                    const $$ = cheerio.load(pageResponse.data);

                    const pageLinks = [];
                    $$('.worksheet-table a').each((i, aTag) => {
                        let worksheetLink = $$(aTag).attr('href');
                        if (worksheetLink) {
                            if (worksheetLink.startsWith('/')) {
                                worksheetLink = url.resolve(baseUrl, worksheetLink);
                            }
                            pageLinks.push(worksheetLink);
                        }
                    });
                    return pageLinks;
                } catch (pageError) {
                    console.error(`Error scraping page ${link}:`, pageError);
                    return [];
                }
            })
        ));

        // Flatten the array of arrays (allLinks will be an array of arrays)
        const flattenedLinks = allLinks.flat();

        const pdfs = [];

        // Scrape the PDFs concurrently
        await Promise.all(
            flattenedLinks.map((link) =>
                limit(async () => {
                    try {
                        const pagesResponse = await axios.get(link);
                        const $$ = cheerio.load(pagesResponse.data);

                        $$('span.additional-links-url a').each((i, aTag) => {
                            let link = $$(aTag).attr('href');
                            if (link) {
                                if (link.startsWith('/')) {
                                    link = url.resolve(baseUrl, link);
                                }
                                pdfs.push(link);
                            }
                        });
                    } catch (error) {
                        console.error(`Error scraping PDF link ${link}:`, error);
                    }
                })
            )
        );

        // Filter out non-PDF links and unwanted links
        const filteredPdfs = pdfs.filter((link) => link !== 'https://www.k5learning.com/membership-info');

        // Return the links
        res.json({
            mainPageLinks: links,
            worksheetLinks: flattenedLinks,
            filteredPdfLinks: filteredPdfs,
        });
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: error });
    }
});

// Route for scraping topics (using your original function name and structure)
app.get('/scrape-topics', async (req, res) => {
    try {
        const baseUrl = 'https://www.mashupmath.com';
        const response = await axios.get('https://www.mashupmath.com/7th-grade-math-worksheets-free');
        const $ = cheerio.load(response.data);

        // Object to store links grouped by divs
        const groupedLinks = {};

        // Loop through each div with class sqs-html-content
        $('div.sqs-html-content').each((divIndex, divElement) => {
            const links = []; // Array to store links for the current div
            
            // Loop through styled p tags inside this div
            $(divElement).find('p[style="white-space:pre-wrap;"]').each((pIndex, pElement) => {
                let link = $(pElement).find('a').attr('href'); // Find the <a> tag and get the href attribute
                
                if (link && !link.toLowerCase().includes('signup') && link.toLowerCase().includes('pdf')) {
                    // If the link is relative, prepend the base URL
                    if (!link.startsWith('http') && !link.startsWith('https')) {
                        link = baseUrl + link;
                    }
                    links.push(link); // Add the link to the array for this div
                }
            });

            // Only add the div's links to the grouped object if there are any
            if (links.length > 0) {
                groupedLinks[`div-${divIndex}`] = links;
            }
        });

        // Return the grouped links in the response
        res.json(groupedLinks);
    } catch (error) {
        console.error('Error fetching or parsing the page:', error);
        res.status(500).send('Error scraping the page');
    }
});

// Listen to the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
