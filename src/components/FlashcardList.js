import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Flashcard from './Flashcard';

const FlashcardList = ({
  flashcards,
  currentIndex,
  onNavigate,
  onDeleteCard
}) => {
  if (!flashcards.length) {
    return (
      <div className="text-center glass-container rounded-xl py-12">
        <p className="text-blue-200/70">No flashcards in this set.</p>
        <a 
          href="/create" 
          className="inline-block mt-4 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
        >
          Create Some Cards
        </a>
      </div>
    );
  }

  return (
    <div className="card-gradient rounded-xl p-8 border border-white/10">
      <div className="relative">
        <button
          onClick={() => onNavigate(-1)}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 p-2 bg-white/10 rounded-full backdrop-blur-sm disabled:opacity-50 hover:bg-white/20 disabled:hover:bg-white/10"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        
        <div className="mx-16">
          <Flashcard
            card={flashcards[currentIndex]}
            onDelete={onDeleteCard}
            currentIndex={currentIndex}
            totalCards={flashcards.length}
          />
        </div>

        <button
          onClick={() => onNavigate(1)}
          disabled={currentIndex === flashcards.length - 1}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 p-2 bg-white/10 rounded-full backdrop-blur-sm disabled:opacity-50 hover:bg-white/20 disabled:hover:bg-white/10"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardList;