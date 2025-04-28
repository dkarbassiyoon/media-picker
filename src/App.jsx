import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import FileTabs from './components/FileTabs';
import FilePreview from './components/FilePreview';
import FileList from './components/FileList';
import Header from './components/Header';
import FloatingUploadButton from './components/FloatingUploadButton';
import EmptyState from './components/EmptyState';

function getFileType(file) {
  if (file.type.startsWith('image/')) return 'images';
  if (file.type.startsWith('video/')) return 'videos';
  if (file.type === 'application/pdf') return 'pdfs';
  return null;
}

export default function App() {
  const [files, setFiles] = React.useState({ images: [], videos: [], pdfs: [] });
  const [selectedTab, setSelectedTab] = React.useState('images');
  const [selectedFileIndex, setSelectedFileIndex] = React.useState(0);

  // When tab changes, reset selected file index
  React.useEffect(() => {
    setSelectedFileIndex(0);
  }, [selectedTab, files]);

  // Handle file uploads
  const handleFiles = React.useCallback((acceptedFiles) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      acceptedFiles.forEach(file => {
        const type = getFileType(file);
        if (!type) return;
        const url = URL.createObjectURL(file);
        newFiles[type] = [...(newFiles[type] || []), { name: file.name, url }];
      });
      return newFiles;
    });
  }, []);

  const tabCounts = {
    images: files.images.length,
    videos: files.videos.length,
    pdfs: files.pdfs.length,
  };

  const hasFiles = Object.values(tabCounts).some(count => count > 0);
  const selectedFiles = files[selectedTab] || [];
  const selectedFile = selectedFiles[selectedFileIndex] || null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="max-w-6xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md">
        <Header onFiles={handleFiles} />
        
        {!hasFiles ? (
          <EmptyState onFiles={handleFiles} />
        ) : (
          <>
            <FileTabs selectedTab={selectedTab} counts={tabCounts} onSelect={setSelectedTab} />
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
          </>
        )}
        
        <FloatingUploadButton onFiles={handleFiles} />
      </div>
    </ThemeProvider>
  );
} 