import React, { useState } from "react";
import './index.scss';
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';
import { DeferredContent } from "primereact/deferredcontent";

import WorksheetTable from "../WorksheetTable";

// Create Badge component
function MakeBadge(value) {
    return (
        <Badge value={value}></Badge>
    );
}

export default function MathWorksheetsTabs() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="space-b" scrollable>
                {/* 1st Grade Tab */}
                <TabPanel header={MakeBadge('1st Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/first-grade-1'} grade={1} />
                    </DeferredContent>
                </TabPanel>

                {/* 2nd Grade Tab */}
                <TabPanel header={MakeBadge('2nd Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/second-grade-2'} grade={2} />
                    </DeferredContent>
                </TabPanel>

                {/* 3rd Grade Tab */}
                <TabPanel header={MakeBadge('3rd Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/third-grade-3'} grade={3} />
                    </DeferredContent>
                </TabPanel>

                {/* 4th Grade Tab */}
                <TabPanel header={MakeBadge('4th Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/fourth-grade-4'} grade={4} />
                    </DeferredContent>
                </TabPanel>

                {/* 5th Grade Tab */}
                <TabPanel header={MakeBadge('5th Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/fifth-grade-5'} grade={5} />
                    </DeferredContent>
                </TabPanel>

                {/* 6th Grade Tab */}
                <TabPanel header={MakeBadge('6th Grade')} headerClassName="tab-header">
                    <DeferredContent>
                        <WorksheetTable webUrl={'https://www.k5learning.com/free-math-worksheets/sixth-grade-6'} grade={6} />
                    </DeferredContent>
                </TabPanel>
            </TabView>
        </div>
    );
}
