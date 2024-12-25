import React, { useState, useEffect, useRef } from "react";
import './index.scss';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog'; // Import the Dialog component
import { useLocation, useParams, useNavigate } from "react-router-dom";
import MathWorksheetsTabs from "./Widgets/MathWorksheets";
import TopicWorkSheetsTab from "./Widgets/TopicSheets";


export default function MathResourcesPage() {
    const navigate = useNavigate();

    const { category } = useParams();
    const toolRef = useRef(null);
    const worksheetsRef = useRef(null);
    const topicRef = useRef(null);
    const quizRef = useRef(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const toolType = searchParams.get('tool_type'); 

    const [visible, setVisible] = useState(false);
    const [iframeSrc, setiframeSrc] = useState('');
    const [iframeTitle, setiframeTitle] = useState('');


    useEffect(() => {
        if (category === 'tools' && toolRef.current && toolType === 'none') {
            toolRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (category === 'tools' && toolType === 'desmos') {
            navigate("/math-resources/tools/ToolPages/desmos");
        } else if (category === 'home') {
            navigate("/math-resources/home");
        } else if (category === 'worksheets') {
            worksheetsRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (category === 'topics') {
            topicRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (category === 'quiz' && quizRef.current) {
            quizRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [category]);

    const desmos_footer_button = (
        <>
            <Button
                icon="pi pi-window-maximize"
                label="Open"
                onClick={() => {
                    window.location.href = '/math-resources/tools/ToolPages/desmos';
                }}
            />
        </>
    );

    const quizizzlink = 'https://quizizz.com/admin/search/math?source=MainHeader&page=FeaturedPage&searchSource=normal&arid=388b481c-0b33-466d-b598-d4c813da7f85&apos=';

    const openDialog = (src, title) => {
        setiframeTitle(title);
        setiframeSrc(src);
        setVisible(true); 
    };

    const closeDialog = () => {
        setVisible(false); // Close the dialog
    };

    function footer_btn(src, title) {
        return (
            <div className="flex-row">
                <div className="flex-column">
                    <Button 
                        icon="pi pi-window-maximize" 
                        label="Open in Page" 
                        onClick={() => {
                            openDialog(src, title);
                        }} 
                    />
                </div>
                <div className="flex-column">
                    <Button 
                        icon="pi pi-external-link" 
                        label="Open in new tab" 
                        onClick={() => {
                            window.open(src, '_blank'); 
                        }} 
                    />
                </div>
            </div>
        );
    }
    


    return (
        <div className="index-wrapper">
            <div className="content-wrapper">
                <h1 ref={toolRef} className="space-b">Tools</h1>
                <div className="flex-row">
                    <div className="flex-row">
                        <div className="flex-column">
                            <Card className="cards" title="Desmos Graphing Calculator" footer={desmos_footer_button}>
                                <p className="">
                                    Use Desmos Graphing Calculator to graph and solve equations!
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="Excalidraw Whiteboard Tool" footer={<Button icon='pi pi-window-maximize' label="Open" onClick={() => {window.location.href = '/math-resources/tools/ToolPages/Excalidraw-Whiteboard-Tool'}} />} >
                                <p className="">
                                    Use Excalidraw Whiteboard to draw visuals for your students!
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="GeoGebra Graphing Calculator" footer={<Button icon='pi pi-window-maximize' label="Open" onClick={() => {window.location.href = '/math-resources/tools/ToolPages/Geogebra-grapher'}} />} >
                                <p>
                                    This is an excellent tool for graphing functions and solving equations. It can be used in place of desmos.
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>

                <h1 ref={worksheetsRef} className="space-t">Math Worksheets</h1>
                <p className="p-text-secondary">Organized by grade</p>
                <div>
                    <MathWorksheetsTabs />
                </div>

                <h1 ref={topicRef} className="space-t">More Worksheets</h1>
                <p className="p-text-secondary">Organized by topic</p>
                <TopicWorkSheetsTab />
                
                <div ref={quizRef}>
                    <h1>Additional Resources</h1>
                    <div className="flex-row">
                        <div className="flex-column">
                            <Card className="cards" title="Quizizz" footer={footer_btn(quizizzlink, "Quizizz Math")}>
                                <p className="">
                                    Choose from thousands of math quizzes on Quizizz.
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="NCTM Library of Math Problems" footer={footer_btn('https://www.nctm.org/pows/', "NCTM")}>
                                <p className="">
                                    Find hundreds of problems from all topics K-12 math
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="Mathopolis Math Quizzes" footer={footer_btn('https://www.mathopolis.com/questions/quizzes.php', "Mathopolis Math Quizzes")}>
                                <p className="">
                                    Choose more quizzes based of certain topics on Mathopolis
                                </p>
                            </Card>
                        </div>
                    </div>
                    <div className="flex-row space-t">
                        <div className="flex-column">
                            <Card className="cards" title="Math Worksheets Land" footer={footer_btn('https://www.mathworksheetsland.com/topics.html', "Math Worksheets Land")}>
                                <p className="">
                                    Choose from worksheets on MathWorkSheetLand.
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="Mashup Math Sheets" footer={footer_btn('https://www.mashupmath.com/free-math-worksheets', "Mashup")}>
                                <p className="">
                                    Find hundreds of free worksheets on Mashup Math sheets.
                                </p>
                            </Card>
                        </div>
                        <div className="flex-column">
                            <Card className="cards" title="Mathopolis Math Quizzes" footer={footer_btn('https://www.worksheetfun.com/math/', "Mathopolis Math Quizzes")}>
                                <p className="">
                                    Choose more quizzes based of certain topics on Mathopolis
                                </p>
                            </Card>
                        </div>
                    </div>
                </div>
                
            </div>

            <Dialog
                header={iframeTitle}
                visible={visible}
                style={{ width: '90vw', height: '100vh' }}
                onHide={closeDialog}
                maximizable
            >
                <iframe 
                    src={iframeSrc}
                    style={{ width: '100%', height: '100%', border: 'none' }} 
                />
            </Dialog>
        </div>
    );
}
