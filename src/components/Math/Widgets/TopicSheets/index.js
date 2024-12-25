import React, { useState } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Badge } from 'primereact/badge';
import TopicSheetTable, { topicNames } from "../TopicSheetsTable";


function MakeBadge(value) {
    return (
        <>
            <Badge value={value}></Badge>
        </>
    );
}

export default function TopicWorkSheetsTab() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (        
        <div>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="space-b">
                <TabPanel header={MakeBadge(topicNames[0])} headerClassName="tab-header">
                    <TopicSheetTable parameter={15} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[1])} headerClassName="tab-header">
                <TopicSheetTable parameter={16} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[2])} headerClassName="tab-header">
                <TopicSheetTable parameter={17} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[3])} headerClassName="tab-header">
                <TopicSheetTable parameter={18} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[4])} headerClassName="tab-header">
                <TopicSheetTable parameter={19} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[5])} headerClassName="tab-header">
                <TopicSheetTable parameter={20} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[6])} headerClassName="tab-header">
                <TopicSheetTable parameter={21} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[7])} headerClassName="tab-header">
                <TopicSheetTable parameter={22} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[8])} headerClassName="tab-header">
                <TopicSheetTable parameter={23} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[9])} headerClassName="tab-header">
                <TopicSheetTable parameter={24} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[10])} headerClassName="tab-header">
                <TopicSheetTable parameter={25} />
                </TabPanel>
                <TabPanel header={MakeBadge(topicNames[11])} headerClassName="tab-header">
                <TopicSheetTable parameter={26} />
                </TabPanel>
            </TabView>
        </div>
    );
}
