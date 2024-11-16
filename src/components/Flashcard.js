import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

const Flashcard = ({ card, onDelete, currentIndex, totalCards }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(card.id);
  };

  const handleClick = (e) => {
    if (!e.target.closest('button')) {
      setIsFlipped(!isFlipped);
    }
  };

  const progress = ((currentIndex + 1) / totalCards) * 100;

  return (
    <div className="relative w-full">
      {/* Card Counter - Moved higher up */}
      <div className="absolute -top-16 right-0 text-sm text-blue-200/70">
        Card {currentIndex + 1} of {totalCards}
      </div>

      {/* Progress Bar */}
      <div className="absolute -top-6 left-0 w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="w-full h-64">
        <div 
          onClick={handleClick}
          className="w-full h-full cursor-pointer perspective-1000"
        >
          <div 
            className={`relative w-full h-full duration-200 preserve-3d transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front of card */}
            <div 
              className="absolute w-full h-full card-gradient rounded-xl shadow-lg p-6 border border-white/10"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-blue-100">Question</h3>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                  title="Delete card"
                >
                  <Trash2 size={20} className="text-red-400 group-hover:text-red-300" />
                </button>
              </div>
              <p className="mt-4 text-blue-200/90">{card.question}</p>
            </div>

            {/* Back of card */}
            <div 
              className="absolute w-full h-full card-gradient rounded-xl shadow-lg p-6 border border-white/10"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-blue-100">Answer</h3>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                  title="Delete card"
                >
                  <Trash2 size={20} className="text-red-400 group-hover:text-red-300" />
                </button>
              </div>
              <p className="mt-4 text-blue-200/90">{card.answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;