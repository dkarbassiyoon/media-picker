import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PreviewContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PdfIframe = styled.iframe`
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 8px;
`;

export default function FilePreview({ file, type }) {
  if (!file) {
    return (
      <Card className="w-full min-h-[400px] flex items-center justify-center">
        <CardContent className="pt-6 text-center text-muted-foreground">
          Select a file to preview
        </CardContent>
      </Card>
    );
  }

  if (type === 'images') {
    return (
      <Card className="w-full overflow-hidden">
        <CardContent className="p-1 sm:p-6">
          <PreviewContent>
            <img 
              src={file.url} 
              alt={file.name} 
              className="w-full h-auto max-h-[500px] rounded-md object-contain" 
            />
          </PreviewContent>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm font-medium">{file.name}</p>
        </CardFooter>
      </Card>
    );
  }

  if (type === 'videos') {
    return (
      <Card className="w-full overflow-hidden">
        <CardContent className="p-1 sm:p-6">
          <PreviewContent>
            <div className="w-full aspect-video max-h-[500px]">
              <ReactPlayer 
                url={file.url} 
                controls 
                width="100%" 
                height="100%"
                style={{ maxHeight: '500px' }}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      disablePictureInPicture: true,
                    }
                  }
                }}
              />
            </div>
          </PreviewContent>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm font-medium">{file.name}</p>
        </CardFooter>
      </Card>
    );
  }

  if (type === 'pdfs') {
    return (
      <Card className="w-full overflow-hidden">
        <CardContent className="p-1 sm:p-6">
          <PreviewContent>
            <PdfIframe src={file.url} title={file.name} />
          </PreviewContent>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm font-medium">{file.name}</p>
        </CardFooter>
      </Card>
    );
  }

  return null;
} 