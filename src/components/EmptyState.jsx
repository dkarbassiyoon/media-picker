import React from 'react';
import { Card } from "@/components/ui/card";
import { FileUpIcon } from "lucide-react";
import { useDropzone } from 'react-dropzone';

export default function EmptyState({ onFiles }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
      'application/pdf': []
    },
    onDrop: onFiles,
    multiple: true,
  });

  return (
    <Card 
      {...getRootProps()} 
      className={`text-center py-12 px-4 border-2 border-dashed mb-6 cursor-pointer transition-colors ${
        isDragActive ? 'bg-primary/5 border-primary/30' : 'hover:bg-muted/50'
      }`}
    >
      <input {...getInputProps()} />
      <FileUpIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Drop files to upload</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        Upload images, videos, or PDF files using the buttons above, or
        drag and drop files directly onto this area.
      </p>
    </Card>
  );
} 