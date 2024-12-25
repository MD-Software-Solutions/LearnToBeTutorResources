import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import './index.scss';

export default function WorksheetTable({ webUrl, grade }) {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [search, setSearch] = useState(''); 
    const [dialogVisible, setDialogVisible] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');

    
    const capitalizeWords = (str) =>
        str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
            .join(' ');

    // Helper function to extract the source from the URL
    const extractSource = (url) => {
        try {
            const hostname = new URL(url).hostname; // Get the hostname
            return hostname.replace('www.', ''); // Remove 'www.' for cleaner display
        } catch (error) {
            return 'Unknown Source'; // Fallback if URL parsing fails
        }
    };

    // Fetch message from the backend
    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/');
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchMessage();
    }, []);

    // Fetch the links from the backend
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/scrape-links-k5?url=${webUrl}`);
                const linksData = response.data.filteredPdfLinks || [];

                // Map links to data structure, including cleaned and capitalized titles and source extraction
                const tableData = linksData.map((link) => {
                    const rawTitle = link.split('/').pop().replace('.pdf', '');
                    const cleanedTitle = capitalizeWords(rawTitle.replace(`grade-${grade}-`, '')); // Clean and capitalize title
                    const source = extractSource(link); // Extract source from the link
                    return {
                        rawTitle: rawTitle, // Keep raw title for searching
                        title: cleanedTitle,
                        source: source,
                        link: link,
                    };
                });

                setLinks(linksData);
                setData(tableData);
            } catch (error) {
                console.error('Error fetching links:', error);
            } finally {
                setLoading(false); // Stop loading after the request completes
            }
        };

        fetchLinks();
    }, []);

    // Pagination state
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10); // Set the number of rows per page to 10

    const onPageChange = (event) => {
        setFirst(event.first);  // First record for the page
        setRows(event.rows);    // Number of rows per page
    };

    // Filtered data based on the search query
    const filteredData = data.filter(row =>
        row.rawTitle.toLowerCase().includes(search.toLowerCase())
    );

    // Link template for DataTable
    const linkTemplate = (rowData) => {
        return rowData.link ? (
            <a href={rowData.link} target="_blank" rel="noopener noreferrer">
                {rowData.link}
            </a>
        ) : (
            'Wait a minute...'
        );
    };

    // Title template for DataTable
    const titleTemplate = (rowData) => {
        return rowData.title || 'Wait a minute...';
    };

    // Source template for DataTable
    const sourceTemplate = (rowData) => {
        return rowData.source || 'Wait a minute...';
    };

    // Open button template
    const openTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-window-maximize"
                label='Open in page'
                onClick={() => {
                    setIframeSrc(rowData.link);
                    setDialogVisible(true);
                }}
            />
        );
    };

    // Calculate the data slice based on pagination
    const paginatedData = filteredData.slice(first, first + rows);

    return (
        <div>
            <h3>All the math worksheets you could want:</h3>
            <div className='space-t space-b'>
                <Toolbar
                    start={
                        <div>
                            <h3>Worksheet Explorer</h3>
                        </div>
                    }
                    end={
                        <div className="p-inputgroup">
                            <InputText
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title"
                            />
                        </div>
                    }
                />
            </div>
            <div className='datatable-style'>
                <DataTable
                    value={loading ? Array(rows).fill({}) : paginatedData}  // Show placeholder rows when loading
                    first={first}
                    rows={rows}
                    onPage={onPageChange}
                >
                    <Column field="title" header="Title" body={titleTemplate}></Column>
                    <Column field="source" header="Source" body={sourceTemplate}></Column>
                    <Column header="Link" body={linkTemplate}></Column>
                    <Column header="Open" body={openTemplate}></Column>
                </DataTable>
            </div>

            <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredData.length}
                onPageChange={onPageChange}
                rowsPerPageOptions={[10, 20, 30]}
                className='datatable_paginator'
            />

            <Dialog
                header="PDF Viewer"
                visible={dialogVisible}
                style={{ width: '90vw', height: '100%', margin: 0, padding: 0 }}
                maximizable
                onHide={() => setDialogVisible(false)}
            >
                {iframeSrc && (
                    <iframe
                        src={iframeSrc}
                        title="PDF Viewer"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                    ></iframe>
                )}
            </Dialog>
        </div>
    );
}
