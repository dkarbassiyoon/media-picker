import React from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { Card } from "@/components/ui/card";

export default function FloatingUploadButton({ onFiles }) {
  const [open, setOpen] = React.useState(false);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
      'application/pdf': []
    },
    onDrop: (acceptedFiles) => {
      onFiles(acceptedFiles);
      setOpen(false);
    },
    multiple: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Upload Media Files</DialogTitle>
          <DialogDescription>
            Drag and drop files here, or click to select
          </DialogDescription>
        </DialogHeader>
        
        <Card 
          {...getRootProps()} 
          className={`p-8 text-center cursor-pointer border-2 border-dashed transition-colors ${
            isDragActive ? 'bg-primary/5 border-primary/30' : 'hover:bg-muted/50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 p-4">
              <PlusIcon className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mt-2">Add Files</h3>
            <p className="text-sm text-muted-foreground">
              Images, Videos, PDFs
            </p>
            <Button variant="secondary" size="sm" className="mt-2">
              Browse Files
            </Button>
          </div>
        </Card>
      </DialogContent>
      
      <div className="fixed bottom-6 right-6">
        <DialogTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-md">
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
      </div>
    </Dialog>
  );
} 