import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import WeekView from './components/WeekView';
import DayDetail from './components/DayDetail';
import Header from './components/Header';
import FloatingUploadButton from './components/FloatingUploadButton';

function getFileType(file) {
  if (file.type.startsWith('image/')) return 'images';
  if (file.type.startsWith('video/')) return 'videos';
  if (file.type === 'application/pdf') return 'pdfs';
  return null;
}

export default function App() {
  // State for files by date
  const [filesByDate, setFilesByDate] = useState({});
  
  // State for the day detail view
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Handle file uploads for a specific day
  const handleFileUpload = (date, acceptedFiles) => {
    if (!acceptedFiles.length) return;
    
    const dateKey = date.toISOString().split('T')[0];
    
    setFilesByDate(prev => {
      const newFiles = { 
        ...(prev[dateKey] || { images: [], videos: [], pdfs: [] })
      };
      
      acceptedFiles.forEach(file => {
        const type = getFileType(file);
        if (!type) return;
        
        const url = URL.createObjectURL(file);
        newFiles[type] = [...(newFiles[type] || []), { name: file.name, url }];
      });
      
      return { 
        ...prev, 
        [dateKey]: newFiles 
      };
    });
  };
  
  // Handle viewing files for a specific day
  const handleViewFiles = (date) => {
    setSelectedDay(date);
  };
  
  // Close the day detail view
  const closeDayDetail = () => {
    setSelectedDay(null);
  };
  
  // Get files for selected day (if any)
  const selectedDayFiles = selectedDay ? 
    filesByDate[selectedDay.toISOString().split('T')[0]] || { images: [], videos: [], pdfs: [] } 
    : null;
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="max-w-7xl mx-auto my-6 p-6 bg-white rounded-xl shadow-md">
        <Header onFiles={(files) => handleFileUpload(new Date(), files)} />
        
        <main className="mt-8">
          <WeekView 
            filesData={filesByDate} 
            onFileUpload={handleFileUpload}
            onViewFiles={handleViewFiles}
          />
          
          {selectedDay && (
            <div className="mt-8">
              <DayDetail 
                date={selectedDay} 
                files={selectedDayFiles}
                onClose={closeDayDetail}
              />
            </div>
          )}
        </main>
        
        <FloatingUploadButton onFiles={(files) => handleFileUpload(new Date(), files)} />
      </div>
    </ThemeProvider>
  );
} 