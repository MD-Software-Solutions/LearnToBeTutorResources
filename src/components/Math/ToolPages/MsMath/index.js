import React from "react";
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';

export default function MsMathPage() {
    const navigate = useNavigate();
    const items = [
        { label: 'Math Resources', command: () => navigate("/math-resources/home") },
        { label: 'Tools', command: () => navigate("/math-resources/tools?tool_type=none") },
        {
            label: 'Excalidraw Whiteboard Tool',
        }
    ];
    const home = { icon: 'pi pi-home', url: '/' };
    const header = (
        <>
            <BreadCrumb model={items} home={home} />
        </>
    );
    return (
        <>
            <Panel header={header}>
            <iframe 
                src="https://excalidraw.com/" 
                width="100%" 
                height="600px" 
                style={{ border: 'none' }}>
            </iframe>
            </Panel>

            
        </>
    );
}
