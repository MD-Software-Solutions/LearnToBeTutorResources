import React from "react";
import './index.scss';
import { useParams } from "react-router-dom";
import DesmosPage from "./DesmosPage";
import MsMathPage from "./MsMath";
import GeoGebraPage from "./GeoGebra";

export default function ToolPage() {
    const { tool_type } = useParams();
    switch (tool_type) {
        case 'desmos':
            return (
                <div className="index-wrapper">
                    <div className="content-wrapper">
                        <DesmosPage />
                    </div>
                </div>
            );
        case 'Excalidraw-Whiteboard-Tool':
            return (
                <div className="index-wrapper">
                    <div className="content-wrapper">
                        <MsMathPage />
                    </div>
                </div>
            );
        case 'Geogebra-grapher':
            return (
                <div className="index-wrapper">
                    <div className="content-wrapper">
                        <GeoGebraPage />
                    </div>
                </div>
            );
    }
}