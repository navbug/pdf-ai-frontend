import React, { useRef, useState } from 'react';
import { CheckCircle, Upload, FileText, RotateCcw, File, XCircle } from 'lucide-react';

const FileUpload = ({ file, onFileChange, error }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        if (selectedFile.size <= 10 * 1024 * 1024) {
          onFileChange(selectedFile);
        } else {
          onFileChange(null);
          alert('File size must be less than 10MB');
        }
      } else {
        onFileChange(null);
        alert('Please select a PDF file');
      }
    }
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileChange(selectedFile);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  return (
    <div>
      <div 
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 lg:p-10 text-center cursor-pointer transition-smooth ${
          isDragging 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : file 
              ? 'border-green-400 bg-green-50 hover:bg-green-100' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />
        
        {file ? (
          <div className="flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-base font-semibold text-gray-900 mb-1">{file.name}</p>
            <p className="text-sm text-gray-500 mb-3">
              {(file.size / 1024).toFixed(2)} KB • PDF Document
            </p>
            <div className="inline-flex items-center text-xs font-medium text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Click to change file
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-indigo-600" />
            </div>
            <p className="text-base font-semibold text-gray-900 mb-2">
              {isDragging ? 'Drop your PDF here' : 'Upload PDF Document'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop or click to browse
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <div className="flex items-center">
                <File className="w-4 h-4 mr-1" />
                PDF only
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Max 10MB
              </div>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-3 flex items-start bg-red-50 border border-red-200 rounded-lg p-3">
          <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;