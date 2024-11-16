import React, { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { validateFlashcardData } from '../utils';

const FlashcardImporter = ({ onImport }) => {
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileRead = async (file) => {
    try {
      if (file.type !== 'application/json') {
        throw new Error('Please upload a JSON file');
      }

      const text = await file.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Invalid JSON format');
      }

      try {
        const validatedCards = validateFlashcardData(data);
        onImport(validatedCards);
        setError('');
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (e) {
        throw new Error(e.message);
      }
    } catch (err) {
      setError(err.message || 'Error importing flashcards');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  return (
    <div className="mb-8">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-500'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <Upload className="w-12 h-12 text-gray-400" />
          <div>
            <p className="text-lg font-medium text-gray-900">
              Drag and drop your JSON file here
            </p>
            <p className="text-sm text-gray-500">or</p>
          </div>
          <label className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Upload className="mr-2" size={16} />
            Choose File
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Expected JSON Format:
        </h4>
        <pre className="bg-gray-50 rounded-md p-4 text-sm text-gray-700 overflow-x-auto">
{`[
  {
    "question": "What is React?",
    "answer": "A JavaScript library for building user interfaces"
  },
  {
    "question": "What is JSX?",
    "answer": "A syntax extension for JavaScript"
  }
]`}
        </pre>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <h4 className="font-medium text-gray-900 mb-1">Notes:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>File must be in JSON format</li>
          <li>Data must be an array of flashcard objects</li>
          <li>Each flashcard must have a question and answer</li>
          <li>Maximum file size: 5MB</li>
        </ul>
      </div>
    </div>
  );
};

export default FlashcardImporter;