import React, { useState } from 'react';
import { Plus, Save, X, Trash2 } from 'lucide-react';

const FlashcardForm = ({ onSubmit, existingSets = [] }) => {
  const [setName, setSetName] = useState('');
  const [cards, setCards] = useState([
    { id: Date.now(), question: '', answer: '' }
  ]);

  const [errors, setErrors] = useState({
    setName: '',
    cards: []
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      setName: '',
      cards: []
    };

    if (!setName.trim()) {
      newErrors.setName = 'Set name is required';
      isValid = false;
    } else if (existingSets.includes(setName.trim())) {
      newErrors.setName = 'A set with this name already exists';
      isValid = false;
    }

    cards.forEach((card, index) => {
      const cardErrors = {};
      if (!card.question.trim()) {
        cardErrors.question = 'Question is required';
        isValid = false;
      }
      if (!card.answer.trim()) {
        cardErrors.answer = 'Answer is required';
        isValid = false;
      }
      newErrors.cards[index] = cardErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const formattedCards = cards.map(card => ({
        ...card,
        question: card.question.trim(),
        answer: card.answer.trim()
      }));

      onSubmit({
        name: setName.trim(),
        cards: formattedCards
      });

      setSetName('');
      setCards([{ id: Date.now(), question: '', answer: '' }]);
      setErrors({ setName: '', cards: [] });
    }
  };

  const addCard = () => {
    setCards([...cards, { id: Date.now(), question: '', answer: '' }]);
  };

  const removeCard = (indexToRemove) => {
    if (cards.length > 1) {
      setCards(cards.filter((_, index) => index !== indexToRemove));
    }
  };

  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setCards(newCards);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Set Name Input */}
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Flashcard Set Name
        </label>
        <input
          type="text"
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.setName ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Biology Chapter 1, Spanish Vocabulary"
        />
        {errors.setName && (
          <p className="mt-1 text-sm text-red-600">{errors.setName}</p>
        )}
      </div>

      {/* Cards Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-lg font-medium text-gray-700">
            Flashcards
          </label>
          <button
            type="button"
            onClick={addCard}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Add Card
          </button>
        </div>

        {cards.map((card, index) => (
          <div
            key={card.id}
            className="bg-white p-4 rounded-lg shadow space-y-3 relative"
          >
            <div className="absolute top-2 right-2">
              {cards.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCard(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Question {index + 1}
              </label>
              <input
                type="text"
                value={card.question}
                onChange={(e) => updateCard(index, 'question', e.target.value)}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.cards[index]?.question ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your question"
              />
              {errors.cards[index]?.question && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cards[index].question}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Answer {index + 1}
              </label>
              <textarea
                value={card.answer}
                onChange={(e) => updateCard(index, 'answer', e.target.value)}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.cards[index]?.answer ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={2}
                placeholder="Enter your answer"
              />
              {errors.cards[index]?.answer && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cards[index].answer}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Save size={16} className="mr-2" />
          Create Flashcard Set
        </button>
      </div>
    </form>
  );
};

export default FlashcardForm;