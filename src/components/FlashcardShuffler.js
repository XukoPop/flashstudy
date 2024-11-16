import React from 'react';
import { Shuffle } from 'lucide-react';

const FlashcardShuffler = ({ onShuffle, disabled }) => {
  return (
    <button
      onClick={onShuffle}
      disabled={disabled}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Shuffle className="mr-2" size={16} />
      Shuffle Cards
    </button>
  );
};

export default FlashcardShuffler;