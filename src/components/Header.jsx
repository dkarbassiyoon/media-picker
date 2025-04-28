import React from 'react';
import UploadButton from './UploadButton';

export default function Header({ onFiles }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-primary">Media Viewer</h1>
      <UploadButton onFiles={onFiles} />
    </div>
  );
} 