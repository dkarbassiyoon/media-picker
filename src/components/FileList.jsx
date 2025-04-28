import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FileList({ files, selectedIndex, onSelect }) {
  if (!files.length) {
    return (
      <Card className="p-4 text-center text-muted-foreground h-full flex items-center justify-center">
        <div>No files uploaded yet</div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <ScrollArea className="h-[500px] w-full p-1">
        <div className="flex flex-col gap-2 p-3">
          {files.map((file, idx) => (
            <Button
              key={file.name + idx}
              variant={selectedIndex === idx ? "default" : "outline"}
              className="justify-start h-auto py-3 px-4 font-normal text-left flex gap-2 items-center"
              onClick={() => onSelect(idx)}
            >
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {file.name}
              </span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
} 