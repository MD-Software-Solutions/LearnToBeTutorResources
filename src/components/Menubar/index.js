import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './index.scss';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function NavBar() {
    const navigate = useNavigate(); // Use navigate hook

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/LearnToBeTutorResources',
        },
        {
            label: 'Math',
            icon: 'pi pi-times',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    command: () => navigate("/LearnToBeTutorResources/math-resources/home") 
                },
                {
                    label: 'Tools',
                    icon: 'pi pi-wrench',
                    items: [
                        {
                            label: 'Desmos Graphing',
                            icon: 'pi pi-chart-bar',
                            command: () => navigate("/LearnToBeTutorResources/math-resources/tools?tool_type=desmos") // Navigate to Desmos Graphing tool
                        },
                        {
                            label: 'Excalidraw Whiteboard',
                            icon: 'pi pi-pencil',
                            command: () => navigate("/LearnToBeTutorResources/math-resources/tools/ToolPages/Excalidraw-Whiteboard-Tool") // Navigate to Excalidraw Whiteboard tool
                        },
                        {
                            label: 'GeoGebra Graphing',
                            icon: 'pi pi-chart-scatter',
                            command: () => navigate("/LearnToBeTutorResources/math-resources/tools/ToolPages/Geogebra-grapher") // Navigate to GeoGebra Graphing tool
                        },
                    ]
                },
                {
                    label: 'Worksheets',
                    icon: 'pi pi-file-edit',
                    command: () => navigate("/LearnToBeTutorResources/math-resources/worksheets") // Navigate to worksheets page
                },
                {
                    label: 'Worksheets by topic',
                    icon: 'pi pi-list',
                    command: () => navigate("/LearnToBeTutorResources/math-resources/topics") // Navigate to worksheets by topic
                },
                {
                    label: 'Quizzes/Assessments',
                    icon: 'pi pi-check-circle',
                    command: () => navigate("/LearnToBeTutorResources/math-resources/quiz") // Navigate to quizzes and assessments
                },
            ]
        },
        
        {
            label: 'Reading',
            icon: 'pi pi-book',
            command: () => navigate("/LearnToBeTutorResources/reading-resources")
        },
        
        {
            label: 'Science',
            icon: 'pi pi-globe',
            command: () => navigate("/LearnToBeTutorResources/science-resources")
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: () => navigate("/LearnToBeTutorResources/about-page") // Navigate to the about page
        }
    ];

    return (
        <div className='menubar-container-primary'>
            <div className="card">
                <Menubar 
                    model={items.map(item => ({
                        ...item,
                        command: (e) => {
                            console.log("Navigating item: ", item); // Check what’s being navigated to
                            if (item.url) {
                                navigate(item.url);
                            } else if (item.items) {
                                return; 
                            } else if (item.command) {
                                item.command();
                            }
                        }
                    }))} 
                    className="floating-menubar"
                />
            </div>
        </div>
    );
}
