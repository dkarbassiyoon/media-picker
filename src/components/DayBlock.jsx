import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from '../utils/date';
import { useDropzone } from 'react-dropzone';
import { FileUpIcon } from 'lucide-react';

export default function DayBlock({ date, files, onFileUpload, onViewFiles, isToday }) {
  // Format the date for display
  const dayOfWeek = formatDate(date, 'EEE');
  const dayNumber = formatDate(date, 'd');
  const formattedDate = `${dayOfWeek}, ${formatDate(date, 'dd-MM-yyyy')}`;
  
  // Set up dropzone for file uploads
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
      'application/pdf': []
    },
    onDrop: (acceptedFiles) => {
      onFileUpload(date, acceptedFiles);
    },
    multiple: true,
  });

  // Get counts of files for this day
  const filesByType = files || { images: [], videos: [], pdfs: [] };
  const totalFiles = filesByType.images.length + filesByType.videos.length + filesByType.pdfs.length;
  
  return (
    <Card className={`w-[350px] min-w-[350px] h-[500px] flex flex-col ${isToday ? 'border-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{formattedDate}</CardTitle>
          {isToday && <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Today</div>}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        <div className="flex-grow">
          {/* This is where day content would go */}
        </div>
        
        {totalFiles > 0 ? (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Media files ({totalFiles})</span>
              <Button variant="ghost" size="sm" onClick={() => onViewFiles(date)}>
                View all
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {filesByType.images.length > 0 && (
                <Card className="p-2 text-center">
                  <p className="text-xs font-semibold">Images</p>
                  <p className="text-lg">{filesByType.images.length}</p>
                </Card>
              )}
              {filesByType.videos.length > 0 && (
                <Card className="p-2 text-center">
                  <p className="text-xs font-semibold">Videos</p>
                  <p className="text-lg">{filesByType.videos.length}</p>
                </Card>
              )}
              {filesByType.pdfs.length > 0 && (
                <Card className="p-2 text-center">
                  <p className="text-xs font-semibold">PDFs</p>
                  <p className="text-lg">{filesByType.pdfs.length}</p>
                </Card>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
      
      <CardFooter className="pt-0">
        <div 
          {...getRootProps()} 
          className={`w-full border-2 border-dashed rounded-md p-3 text-center cursor-pointer transition-colors ${
            isDragActive ? 'bg-primary/5 border-primary/30' : 'hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-2">
            <FileUpIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isDragActive ? 'Drop files here' : 'Drop files here or click to upload'}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 