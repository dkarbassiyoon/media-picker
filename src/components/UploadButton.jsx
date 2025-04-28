import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from 'react-dropzone';
import { FileUpIcon, ImageIcon, FileTextIcon, VideoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UploadButton({ onFiles }) {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("all");
  
  const getAcceptedTypes = () => {
    switch (activeTab) {
      case "images": return { 'image/*': [] };
      case "videos": return { 'video/*': [] };
      case "pdfs": return { 'application/pdf': [] };
      default: return {
        'image/*': [],
        'video/*': [],
        'application/pdf': []
      };
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: getAcceptedTypes(),
    onDrop: (acceptedFiles) => {
      onFiles(acceptedFiles);
      setOpen(false);
    },
    multiple: true,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <FileUpIcon className="h-4 w-4" />
          Upload Media
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Media Files</DialogTitle>
          <DialogDescription>
            Choose what type of media you want to upload
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="pdfs">PDFs</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <UploadArea 
              getRootProps={getRootProps} 
              getInputProps={getInputProps} 
              isDragActive={isDragActive}
              icon={<FileUpIcon className="h-12 w-12 text-muted-foreground" />}
              title="Upload Any Media"
              description="Drop any images, videos, or PDFs here"
            />
          </TabsContent>
          <TabsContent value="images" className="mt-4">
            <UploadArea 
              getRootProps={getRootProps} 
              getInputProps={getInputProps} 
              isDragActive={isDragActive}
              icon={<ImageIcon className="h-12 w-12 text-muted-foreground" />}
              title="Upload Images"
              description="Drop JPG, PNG, GIF, or other image files here"
            />
          </TabsContent>
          <TabsContent value="videos" className="mt-4">
            <UploadArea 
              getRootProps={getRootProps} 
              getInputProps={getInputProps} 
              isDragActive={isDragActive}
              icon={<VideoIcon className="h-12 w-12 text-muted-foreground" />}
              title="Upload Videos"
              description="Drop MP4, WebM, or other video files here"
            />
          </TabsContent>
          <TabsContent value="pdfs" className="mt-4">
            <UploadArea 
              getRootProps={getRootProps} 
              getInputProps={getInputProps} 
              isDragActive={isDragActive}
              icon={<FileTextIcon className="h-12 w-12 text-muted-foreground" />}
              title="Upload PDFs"
              description="Drop PDF documents here"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for the upload area in different tabs
function UploadArea({ getRootProps, getInputProps, isDragActive, icon, title, description }) {
  return (
    <Card 
      {...getRootProps()} 
      className={`p-8 text-center cursor-pointer border-2 border-dashed transition-colors ${
        isDragActive ? 'bg-primary/5 border-primary/30' : 'hover:bg-muted/50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button variant="secondary" size="sm" className="mt-2">
          Select Files
        </Button>
      </div>
    </Card>
  );
} 