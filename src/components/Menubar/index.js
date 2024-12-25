import React from 'react'; 
import { Menubar } from 'primereact/menubar';
import './index.scss';
import { Link } from 'react-router-dom';



export default function NavBar() {

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => window.location.href = "/"
        },
        {
            label: 'Math',
            icon: 'pi pi-times',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    command: () => window.location.href = "/math-resources/home"
                },
                {
                    label: 'Tools',
                    icon: 'pi pi-wrench',
                    command: () => window.location.href = "/math-resources/tools?tool_type=none",
                    items: [
                        {
                            label: 'Desmos Graphing',
                            icon: 'pi pi-chart-bar',
                            command: () => window.location.href = "/math-resources/tools?tool_type=desmos"
                        },
                        {
                            label: 'Excalidraw Whiteboard',
                            icon: 'pi pi-pencil',
                            command: () => window.location.href = "/math-resources/tools/ToolPages/Excalidraw-Whiteboard-Tool"
                        },
                        {
                            label: 'GeoGebra Graphing',
                            icon: 'pi pi-chart-scatter',
                            command: () => window.location.href = "/math-resources/tools/ToolPages/Geogebra-grapher"
                        },
                    ]
                },
                {
                    label: 'Worksheets',
                    icon: 'pi pi-file-edit',
                    command: () => window.location.href = "/math-resources/worksheets"
                },
                {
                    label: 'Worksheets by topic',
                    icon: 'pi pi-list',
                    command: () => window.location.href = "/math-resources/topics"
                },
                {
                    label: 'Quizzes/Assesments',
                    icon: 'pi pi-check-circle',
                    command: () => window.location.href = "/math-resources/quiz"
                },
            ]
        },
        
        {
            label: 'Reading',
            icon: 'pi pi-book',
            command: () => window.location.href = "/ai"
        },
        
        {
            label: 'Science',
            icon: 'pi pi-globe',
            command: () => window.location.href = "/ai"
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: () => window.location.href = "/about-page"
        }
    ];

    return (
        <div className='menubar-container-primary'>
            <div className="card">
                <Menubar model={items} className="floating-menubar"/>
            </div>
        </div>
    )
}
