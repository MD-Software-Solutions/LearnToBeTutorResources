import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';

export const topicNames = [
    'Integers and Operations',
    'Fractions and Decimals',
    'Lengths + Measurement',
    'Exponents + Scientific Notation',
    'Factors + Square Roots',
    'Data + Central Tendency',
    'Ratios and Percents',
    'Probability',
    'Geometry',
    'Algebra',
    'Inequalities',
    'Word Problems',
];

export default function TopicSheetTable({ parameter }) {
    const [topics, setTopics] = useState({}); // Store topics data
    const [error, setError] = useState(null); // Store error message
    const [selectedList, setSelectedList] = useState([]); // Store selected topic's URLs
    const [first, setFirst] = useState(0); // Pagination state for first record
    const [rows, setRows] = useState(10); // Pagination state for number of rows
    const [dialogVisible, setDialogVisible] = useState(false); // Handle dialog visibility
    const [currentUrl, setCurrentUrl] = useState(''); // Current URL for iframe
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                // Fetch the topics data from the API
                const response = await axios.get('https://tutor-resource-scraper-ltb.onrender.com/scrape-topics');
                setTopics(response.data); // Store the fetched data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError(err.message); // Set error message if request fails
                setLoading(false); // Set loading to false even on error
            }
        };

        fetchTopics();
    }, []);

    // Update the selected list whenever the parameter or topics change
    useEffect(() => {
        if (parameter !== undefined && topics[`div-${parameter}`]) {
            // Extract URLs for the selected parameter
            setSelectedList(
                topics[`div-${parameter}`].map((link) => ({
                    url: link, // Map to an object with url as key
                }))
            );
        } else {
            // If no valid parameter, clear selected list
            setSelectedList([]);
        }
    }, [parameter, topics]);

    const onPageChange = (event) => {
        setFirst(event.first); // Set the first record index
        setRows(event.rows); // Set number of rows per page
    };

    const paginatedData = selectedList.slice(first, first + rows); // Slice data based on pagination

    const openDialog = (url) => {
        setCurrentUrl(url); // Set current URL for the dialog
        setDialogVisible(true); // Show the dialog
    };

    const closeDialog = () => {
        setDialogVisible(false); // Close the dialog
        setCurrentUrl(''); // Reset current URL
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}

            {parameter !== undefined && topicNames[parameter - 15] && (
                <h2>{topicNames[parameter - 15]}</h2> // Display the topic name based on parameter
            )}

            {/* Show skeleton when loading */}
            {loading ? (
                <div>
                    <Skeleton width="100%" height="2rem" />
                    <Skeleton width="100%" height="15rem" />
                    <Skeleton width="100%" height="2rem" />
                </div>
            ) : (
                <div>
                    {/* Data table to display the URLs */}
                    <DataTable value={paginatedData} tableStyle={{ minWidth: '50rem' }}>
                        <Column
                            field="url"
                            header="URL"
                            body={(rowData) => (
                                <a href={rowData.url} target="_blank" rel="noopener noreferrer">
                                    {rowData.url}
                                </a>
                            )}
                        ></Column>
                        <Column
                            body={(rowData) => (
                                <Button
                                    label="Open In Page"
                                    icon="pi pi-window-maximize"
                                    onClick={() => openDialog(rowData.url)} // Open URL in dialog on button click
                                />
                            )}
                            header="Action"
                        />
                    </DataTable>

                    {/* Pagination component */}
                    <div className="space-t">
                        <Paginator
                            first={first}
                            rows={rows}
                            totalRecords={selectedList.length}
                            rowsPerPageOptions={[5, 10, 20]}
                            onPageChange={onPageChange} // Update pagination state on page change
                        />
                    </div>
                </div>
            )}

            {/* Dialog to display the URL content */}
            <Dialog
                visible={dialogVisible}
                style={{ width: '80vw', height: '80vh' }}
                onHide={closeDialog} // Close dialog on hide
                header="Resource Link"
                maximizable
            >
                <iframe
                    src={currentUrl} // Display content in iframe
                    style={{ width: '100%', height: '100%' }}
                    title="Resource Link"
                ></iframe>
            </Dialog>
        </div>
    );
}
