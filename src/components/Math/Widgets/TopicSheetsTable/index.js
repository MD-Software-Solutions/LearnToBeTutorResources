import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

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
    const [topics, setTopics] = useState({});
    const [error, setError] = useState(null);
    const [selectedList, setSelectedList] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('https://tutor-resource-scraper-ltb.onrender.com/scrape-topics'); 
                setTopics(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTopics();
    }, []);

    useEffect(() => {
        if (parameter !== undefined && topics[`div-${parameter}`]) {
            setSelectedList(
                topics[`div-${parameter}`].map((link, index) => ({
                    url: link,
                }))
            );
        } else {
            setSelectedList([]);
        }
    }, [parameter, topics]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const paginatedData = selectedList.slice(first, first + rows);

    const openDialog = (url) => {
        setCurrentUrl(url);
        setDialogVisible(true);
    };

    const closeDialog = () => {
        setDialogVisible(false);
        setCurrentUrl('');
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {parameter !== undefined && topicNames[parameter-15] && (
                <h2>{topicNames[parameter-15]}</h2>
            )}

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
                            onClick={() => openDialog(rowData.url)}
                        />
                    )}
                    header="Action"
                />
            </DataTable>

            <div className="space-t">
                <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={selectedList.length}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={onPageChange}
                />
            </div>

            {/* Dialog to display the URL content */}
            <Dialog
                visible={dialogVisible}
                style={{ width: '80vw', height: '80vh' }}
                onHide={closeDialog}
                header="Resource Link"
                maximizable
            >
                <iframe
                    src={currentUrl}
                    style={{ width: '100%', height: '100%' }}
                    title="Resource Link"
                ></iframe>
            </Dialog>
        </div>
    );
}
