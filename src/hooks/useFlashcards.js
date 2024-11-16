import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage, shuffle } from '../utils';

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCards = loadFromLocalStorage('flashcards');
    if (savedCards) {
      setFlashcards(savedCards);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage('flashcards', flashcards);
  }, [flashcards]);

  const addFlashcard = (card) => {
    setFlashcards(prev => [...prev, { ...card, id: Date.now() }]);
  };

  const deleteFlashcard = (id) => {
    setFlashcards(prev => prev.filter(card => card.id !== id));
    if (currentIndex >= flashcards.length - 1) {
      setCurrentIndex(Math.max(0, flashcards.length - 2));
    }
  };

  const updateFlashcard = (id, updatedCard) => {
    setFlashcards(prev => 
      prev.map(card => card.id === id ? { ...card, ...updatedCard } : card)
    );
  };

  const importFlashcards = (newCards) => {
    setFlashcards(prev => [...prev, ...newCards]);
  };

  const shuffleFlashcards = () => {
    setFlashcards(prev => shuffle([...prev]));
    setCurrentIndex(0);
  };

  return {
    flashcards,
    currentIndex,
    error,
    setError,
    setCurrentIndex,
    addFlashcard,
    deleteFlashcard,
    updateFlashcard,
    importFlashcards,
    shuffleFlashcards
  };
};