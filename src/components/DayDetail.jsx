import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { formatDate } from '../utils/date';
import FileTabs from './FileTabs'; 
import FilePreview from './FilePreview';
import FileList from './FileList';

export default function DayDetail({ date, files, onClose }) {
  const [selectedTab, setSelectedTab] = useState('images');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  
  // Format the date for display
  const formattedDate = formatDate(date, 'EEE, dd-MM-yyyy');

  // Prepare file counts for tabs
  const tabCounts = {
    images: files?.images?.length || 0,
    videos: files?.videos?.length || 0,
    pdfs: files?.pdfs?.length || 0,
  };

  const selectedFiles = files?.[selectedTab] || [];
  const selectedFile = selectedFiles[selectedFileIndex] || null;
  
  // Handle tab changes
  React.useEffect(() => {
    setSelectedFileIndex(0);
  }, [selectedTab]);
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{formattedDate} - Media Files</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <FileTabs 
            selectedTab={selectedTab} 
            counts={tabCounts} 
            onSelect={setSelectedTab} 
          />
        </div>
        
        {/* Only show content when we have files */}
        {tabCounts[selectedTab] > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <FilePreview file={selectedFile} type={selectedTab} />
            </div>
            <div className="md:col-span-1">
              <FileList
                files={selectedFiles}
                selectedIndex={selectedFileIndex}
                onSelect={setSelectedFileIndex}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No {selectedTab} uploaded for this day
          </div>
        )}
      </CardContent>
    </Card>
  );
} 