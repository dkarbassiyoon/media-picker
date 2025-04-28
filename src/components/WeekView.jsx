import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayBlock from './DayBlock';
import { getWeekDates, isToday, formatDate, addDays } from '../utils/date';

export default function WeekView({ filesData, onFileUpload, onViewFiles }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekDates = getWeekDates(currentDate);
  
  const handlePrevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };
  
  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };
  
  // Format the week range for display
  const startDate = formatDate(weekDates[0], 'd MMM yyyy');
  const endDate = formatDate(weekDates[6], 'd MMM yyyy');
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={handlePrevWeek}>
          <ChevronLeft className="h-4 w-4" />
          Previous Week
        </Button>
        
        <div className="text-lg font-medium">
          Week: {startDate} - {endDate}
        </div>
        
        <Button variant="outline" size="sm" onClick={handleNextWeek}>
          Next Week
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="w-full pb-4">
        <div className="flex space-x-4 px-1 py-2">
          {weekDates.map((date) => {
            // Find files for this day
            const dateStr = date.toISOString().split('T')[0];
            const files = filesData[dateStr] || { images: [], videos: [], pdfs: [] };
            
            return (
              <DayBlock
                key={dateStr}
                date={date}
                files={files}
                onFileUpload={onFileUpload}
                onViewFiles={onViewFiles}
                isToday={isToday(date)}
              />
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
} 