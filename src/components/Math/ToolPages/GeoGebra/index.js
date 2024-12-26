import React from "react";
import DesmosEmbed from "../DesmosTool";
import { BreadCrumb } from 'primereact/breadcrumb';
import { Link, useNavigate } from "react-router-dom";
import { Panel } from 'primereact/panel';

export default function GeoGebraPage() {

    const navigate = useNavigate();
    const items = [
        { label: 'Math Resources', command: () => navigate("/LearnToBeTutorResources/math-resources/home") },
        { label: 'Tools', command: () => navigate("/LearnToBeTutorResources/math-resources/tools?tool_type=none") },
        {
            label: 'GeoGebra Graphing Utility',
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
                    src="https://www.geogebra.org/graphing"
                    width="100%"
                    height="600">
                </iframe>
            </Panel>

            
        </>
    );
}