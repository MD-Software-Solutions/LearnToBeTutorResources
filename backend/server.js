const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');
const app = express();
const url = require('url');
const port = 5000;

// Enable CORS for all origins (you can restrict this later for security purposes)
app.use(cors());

// Route to send a simple string
app.get('/', (req, res) => {
    res.send('Hello, this is a simple backend response!');
});

app.get('/scrape-links-k5', async (req, res) => {
    try {

        const scrapeURL = req.query.url

        const response = await axios.get(scrapeURL);
        
        const $ = cheerio.load(response.data);

        const baseUrl = 'https://www.k5learning.com';

        const links = [];

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
        const allLinks = [];
        for (const link of links) {
            try {
                // Fetch each individual page
                const pageResponse = await axios.get(link);
                const $$ = cheerio.load(pageResponse.data);

                // Extract all href links within the 'worksheet-table' class
                $$('.worksheet-table a').each((i, aTag) => {
                    let worksheetLink = $$(aTag).attr('href');
                    if (worksheetLink) {
                        // Resolve relative links to absolute links
                        if (worksheetLink.startsWith('/')) {
                            worksheetLink = url.resolve(baseUrl, worksheetLink);
                        }
                        allLinks.push(worksheetLink);
                    }
                });
            } catch (pageError) {
                console.error(`Error scraping page ${link}:`, pageError);
            }
        }

        const pdfs = [];

        for (const link of allLinks) {
            const pagesResponse = await axios.get(link);
            const $$ = cheerio.load(pagesResponse.data);

            $$('span.additional-links-url a').each((i, aTag) => {
                let link = $$(aTag).attr('href');
                if (link) {
                    if (link.startsWith('/')) {
                        link = url.resolve(baseUrl, link);
                    }
                }
                pdfs.push(link)
            });
        }

        const filteredPdfs = pdfs.filter(function (link) {
            return link !== "https://www.k5learning.com/membership-info";
        });
        

        

        // Step 6: Return all the PDF links
        res.json({
            mainPageLinks: links,
            worksheetLinks: allLinks,
            filteredPdfLinks: filteredPdfs,
        });

    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: error });
    }
});



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



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
