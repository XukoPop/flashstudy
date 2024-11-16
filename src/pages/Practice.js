import React, { useState } from 'react';
import { ChevronDown, Shuffle } from 'lucide-react';
import FlashcardList from '../components/FlashcardList';

const Practice = ({
  sets,
  currentSetId,
  currentIndex,
  flashcards,
  onSelectSet,
  onNavigate,
  onShuffle,
  onDeleteCard,
  onUpdateCard
}) => {
  const [isSetMenuOpen, setIsSetMenuOpen] = useState(false);
  const currentSet = sets[currentSetId];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Set Selection and Shuffle Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setIsSetMenuOpen(!isSetMenuOpen)}
            className="w-full md:w-auto flex items-center justify-between px-4 py-2 card-gradient rounded-lg text-blue-100 hover:bg-white/5"
          >
            <span className="font-medium">
              Practicing: {currentSet?.name || 'Select a Set'}
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

        <button
          onClick={onShuffle}
          disabled={!flashcards.length}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 
                     text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <Shuffle size={20} />
          Shuffle Cards
        </button>
      </div>

      {/* Flashcards Display */}
      {currentSet ? (
        <FlashcardList
          flashcards={flashcards}
          currentIndex={currentIndex}
          onNavigate={onNavigate}
          onDeleteCard={onDeleteCard}
        />
      ) : (
        <div className="text-center glass-container rounded-xl py-12">
          <p className="text-blue-200/70">Please select a flashcard set to practice.</p>
        </div>
      )}
    </div>
  );
};

export default Practice;