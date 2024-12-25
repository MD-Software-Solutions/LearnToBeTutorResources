import React, { useState } from "react";
import './index.scss';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';

import WorksheetTable from "../WorksheetTable";


function MakeBadge(value) {
    return (
        <>
            <Badge value={value}></Badge>
        </>
    );
}

export default function MathWorksheetsTabs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (        
        <div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="space-b" scrollable>
                <TabPanel header={MakeBadge('1st Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/first-grade-1'} grade={1}/>
                </TabPanel>
                <TabPanel header={MakeBadge('2nd Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/second-grade-2'} grade={2}/>
                </TabPanel>
                <TabPanel header={MakeBadge('3rd Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/third-grade-3'} grade={3}/>
                </TabPanel>
                <TabPanel header={MakeBadge('4th Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/fourth-grade-4'} grade={4}/>
                </TabPanel>
                <TabPanel header={MakeBadge('5th Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/fifth-grade-5'} grade={5}/>
                </TabPanel>
                <TabPanel header={MakeBadge('6th Grade')} headerClassName="tab-header">
                    <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/sixth-grade-6'} grade={6}/>
                </TabPanel>
            </TabView>
        </div>
    );
}
