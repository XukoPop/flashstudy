export const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  export const validateFlashcardData = (data) => {
    if (!Array.isArray(data)) {
      throw new Error('Imported data must be an array of flashcards');
    }
  
    return data.map(card => {
      if (!card.question || !card.answer) {
        throw new Error('Each flashcard must have a question and answer');
      }
      return {
        ...card,
        id: card.id || Date.now() + Math.random(),
      };
    });
  };
  
  export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };
  
  export const loadFromLocalStorage = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return null;
    }
  };