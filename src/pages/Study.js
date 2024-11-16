import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import FlashcardList from '../components/FlashcardList';

const Study = ({
  sets,
  currentSetId,
  currentIndex,
  flashcards,
  onSelectSet,
  onNavigate,
  onDeleteCard,
  onUpdateCard
}) => {
  const [isSetMenuOpen, setIsSetMenuOpen] = useState(false);
  const currentSet = sets[currentSetId];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Set Selection Dropdown */}
      <div className="relative mb-8">
        <button
          onClick={() => setIsSetMenuOpen(!isSetMenuOpen)}
          className="w-full md:w-auto flex items-center justify-between px-4 py-2 card-gradient rounded-lg text-blue-100 hover:bg-white/5"
        >
          <span className="font-medium">
            Studying: {currentSet?.name || 'Select a Set'}
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

      <FlashcardList
        flashcards={flashcards}
        currentIndex={currentIndex}
        onNavigate={onNavigate}
        onDeleteCard={onDeleteCard}
      />
    </div>
  );
};

export default Study;