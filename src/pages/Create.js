import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Save, X } from 'lucide-react';

const Create = ({ onSubmit, existingSets = [] }) => {
  const navigate = useNavigate();
  const [setName, setSetName] = useState('');
  const [cards, setCards] = useState([
    { id: Date.now(), question: '', answer: '' }
  ]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!setName.trim()) {
      setError('Set name is required');
      return;
    }

    if (existingSets.includes(setName.trim())) {
      setError('A set with this name already exists');
      return;
    }

    const validCards = cards.filter(card => 
      card.question.trim() && card.answer.trim()
    );

    if (validCards.length === 0) {
      setError('At least one card with question and answer is required');
      return;
    }

    onSubmit(setName, validCards);
    

    navigate('/study');
  };

  const addCard = () => {
    setCards([...cards, { id: Date.now(), question: '', answer: '' }]);
  };

  const removeCard = (idToRemove) => {
    if (cards.length > 1) {
      setCards(cards.filter(card => card.id !== idToRemove));
    }
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-100">Create New Flashcard Set</h1>
      
      <div className="glass-container rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 text-red-300 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Set Name Input */}
          <div>
            <label className="block text-lg font-medium text-blue-100 mb-2">
              Set Name
            </label>
            <input
              type="text"
              value={setName}
              onChange={(e) => setSetName(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="e.g., Biology Chapter 1, Spanish Vocabulary"
            />
          </div>

          {/* Cards Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-blue-100">Flashcards</h2>
              <button
                type="button"
                onClick={addCard}
                className="inline-flex items-center px-3 py-2 border border-blue-500 rounded-lg text-blue-400 hover:bg-blue-500/20"
              >
                <Plus size={16} className="mr-2" />
                Add Card
              </button>
            </div>

            {cards.map((card, index) => (
              <div
                key={card.id}
                className="card-gradient rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-blue-200/70">Card {index + 1}</span>
                  {cards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCard(card.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={card.question}
                  onChange={(e) => updateCard(card.id, 'question', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Enter question"
                />

                <textarea
                  value={card.answer}
                  onChange={(e) => updateCard(card.id, 'answer', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Enter answer"
                  rows={2}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
            >
              <Save size={16} className="mr-2" />
              Create Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;