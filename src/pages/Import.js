import React, { useState } from 'react';
import { ChevronDown, Upload, AlertCircle } from 'lucide-react';

const Import = ({
  sets,
  currentSetId,
  onSelectSet,
  onImport
}) => {
  const [isSetMenuOpen, setIsSetMenuOpen] = useState(false);
  const [error, setError] = useState('');
  const currentSet = sets[currentSetId];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!currentSetId) {
      setError('Please select a set first');
      return;
    }

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!Array.isArray(data)) {
        throw new Error('Imported data must be an array of flashcards');
      }

      const validatedCards = data.map(card => {
        if (!card.question || !card.answer) {
          throw new Error('Each flashcard must have a question and answer');
        }
        return {
          question: card.question,
          answer: card.answer
        };
      });

      onImport(validatedCards);
      setError('');
    } catch (err) {
      setError('Error importing flashcards. Please check the file format.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-100">Import Flashcards</h1>
      
      <div className="card-gradient rounded-xl p-8 border border-white/10">
        {/* Set Selection */}
        <div className="relative mb-8">
          <label className="block text-lg font-medium text-blue-100 mb-2">
            Select Destination Set
          </label>
          <button
            onClick={() => setIsSetMenuOpen(!isSetMenuOpen)}
            className="w-full md:w-auto flex items-center justify-between px-4 py-2 bg-white/5 rounded-lg text-blue-100 hover:bg-white/10 border border-white/10"
          >
            <span className="font-medium">
              {currentSet?.name || 'Select a Set'}
            </span>
            <ChevronDown size={20} className="ml-2 text-blue-200/70" />
          </button>

          {isSetMenuOpen && (
            <div className="absolute mt-2 w-full md:w-64 card-gradient rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto border border-white/10">
              {Object.values(sets).map((set) => (
                <button
                  key={set.id}
                  onClick={() => {
                    onSelectSet(set.id);
                    setIsSetMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 ${
                    currentSetId === set.id ? 'bg-white/10 text-blue-100' : 'text-blue-200/70'
                  }`}
                >
                  <div className="font-medium">{set.name}</div>
                  <div className="text-sm text-blue-200/50">
                    {set.cards.length} cards
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-4 rounded-lg">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors">
            <div className="flex flex-col items-center space-y-4">
              <Upload className="w-12 h-12 text-blue-400" />
              <div>
                <p className="text-lg font-medium text-blue-100">
                  Drag and drop your JSON file here
                </p>
                <p className="text-sm text-blue-200/70">or</p>
              </div>
              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <Upload size={16} className="mr-2" />
                Choose File
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Example Format */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-blue-100 mb-2">
              Expected JSON Format:
            </h3>
            <pre className="bg-white/5 rounded-lg p-4 text-sm text-blue-200/90 overflow-x-auto border border-white/10">
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
        </div>
      </div>
    </div>
  );
};

export default Import;