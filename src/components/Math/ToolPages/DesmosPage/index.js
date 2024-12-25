import React from "react";
import './index.scss';
import DesmosEmbed from "../DesmosTool";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';

export default function DesmosPage() {
    const navigate = useNavigate();
    const items = [
        { label: 'Math Resources', command: () => navigate("/math-resources/home") },
        { label: 'Tools', command: () => navigate("/math-resources/tools?tool_type=none") },
        {
            label: 'Desmos',
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
                <DesmosEmbed />
            </Panel>

            
        </>
    );
}
