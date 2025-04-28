import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from "@/components/ui/card";
import { FileUpIcon } from "lucide-react";

export default function Uploader({ onFiles }) {
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
      className={`p-8 text-center cursor-pointer border-2 border-dashed mb-6 transition-colors ${
        isDragActive ? 'bg-primary/5 border-primary/30' : 'hover:bg-muted/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <FileUpIcon className="h-10 w-10 text-muted-foreground" />
        <div>
          <strong className="text-foreground">Drag & drop files here, or click to select</strong>
          <p className="text-sm text-muted-foreground mt-1">
            (Images, Videos, PDFs)
          </p>
        </div>
      </div>
    </Card>
  );
} 