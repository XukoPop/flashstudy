import React, { useState } from 'react';
import { Plus, Folder, X } from 'lucide-react';

const FlashcardSets = ({ sets, currentSet, onCreateSet, onSelectSet, onDeleteSet }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newSetName, setNewSetName] = useState('');
  const [newSetDescription, setNewSetDescription] = useState('');

  const handleCreateSet = (e) => {
    e.preventDefault();
    if (newSetName.trim()) {
      onCreateSet({
        name: newSetName.trim(),
        description: newSetDescription.trim(),
        cards: []
      });
      setNewSetName('');
      setNewSetDescription('');
      setIsCreating(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Flashcard Sets</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          New Set
        </button>
      </div>

      {isCreating && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <form onSubmit={handleCreateSet}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Set Name</label>
              <input
                type="text"
                value={newSetName}
                onChange={(e) => setNewSetName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="e.g., Biology 101, Driving Test"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
              <input
                type="text"
                value={newSetDescription}
                onChange={(e) => setNewSetDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="Brief description of the flashcard set"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <X size={16} className="mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus size={16} className="mr-2" />
                Create Set
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.values(sets).map((set) => (
          <div
            key={set.id}
            className={`bg-white rounded-lg shadow-lg p-4 cursor-pointer transition-shadow hover:shadow-xl ${
              currentSet === set.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => onSelectSet(set.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <Folder size={20} className="text-blue-500 mr-2" />
                <div>
                  <h3 className="font-medium text-gray-900">{set.name}</h3>
                  <p className="text-sm text-gray-500">{set.cards.length} cards</p>
                </div>
              </div>
              {set.id !== 'general' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteSet(set.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            {set.description && (
              <p className="mt-2 text-sm text-gray-600">{set.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardSets;