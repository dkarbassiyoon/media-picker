import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function FileTabs({ selectedTab, counts, onSelect }) {
  const tabs = [
    { key: 'videos', label: 'Videos' },
    { key: 'images', label: 'Images' },
    { key: 'pdfs', label: 'PDFs' },
  ];

  const handleValueChange = (value) => {
    onSelect(value);
  };

  return (
    <Tabs
      defaultValue={selectedTab}
      value={selectedTab}
      onValueChange={handleValueChange}
      className="w-full mb-6"
    >
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        {tabs.map(tab => (
          <TabsTrigger key={tab.key} value={tab.key} className="relative">
            {tab.label}
            <Badge variant="secondary" className="ml-2 bg-primary/10 hover:bg-primary/20 text-primary">
              {counts[tab.key]}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
} 