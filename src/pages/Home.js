import React from 'react';
import { Link } from 'react-router-dom';

import { BookOpen, Plus, Upload, Shuffle, Trash2, Edit } from 'lucide-react';

const Title = ({ text }) => {
  const words = text.split(" ");
  
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl -z-10" />
      <h1 className="text-4xl font-bold text-center text-blue-100 animate-fadeIn">
        {words.map((word, index) => (
          <span 
            key={index}
            className="inline-block mx-2 text-glow animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

const ActionCard = ({ to, icon: Icon, title, description }) => (
  <Link
    to={to}
    className="card-gradient rounded-xl p-6 block btn-hover"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Icon size={24} className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-blue-100">{title}</h3>
        <p className="text-blue-200/70">{description}</p>
      </div>
    </div>
  </Link>
);

const SetCard = ({ set, onSelect, onDelete, navigate }) => {
  const handleClick = () => {
    onSelect(set.id);
    navigate('/study');
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${set.id}`);
  };

  return (
    <div className="card-gradient rounded-xl p-6">
      <div className="flex justify-between items-start">
        <div 
          className="flex-1 cursor-pointer"
          onClick={handleClick}
        >
          <h3 className="text-lg font-semibold text-blue-100">{set.name}</h3>
          <p className="text-sm text-blue-200/70 mt-1">{set.cards.length} cards</p>
          {set.description && (
            <p className="text-blue-200/70 mt-2">{set.description}</p>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={handleEdit}
            className="p-2 btn-hover hover:bg-blue-500/20 rounded-lg transition-colors group"
            title="Edit set"
          >
            <Edit size={20} className="text-blue-400 group-hover:text-blue-300" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(set.id);
            }}
            className="p-2 btn-hover hover:bg-red-500/20 rounded-lg transition-colors group"
            title="Delete set"
          >
            <Trash2 size={20} className="text-red-400 group-hover:text-red-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = ({ sets, onSelectSet, onDeleteSet, navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      <Title text="Welcome to FlashStudy" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ActionCard
          to="/create"
          icon={Plus}
          title="Create Cards"
          description="Create a new set of flashcards"
          index={0}
        />
        <ActionCard
          to="/study"
          icon={BookOpen}
          title="Study Mode"
          description="Study your flashcards in order"
          index={1}
        />
        <ActionCard
          to="/import"
          icon={Upload}
          title="Import Cards"
          description="Import flashcards from a JSON file"
          index={2}
        />
        <ActionCard
          to="/practice"
          icon={Shuffle}
          title="Practice Mode"
          description="Test yourself with randomized cards"
          index={3}
        />
      </div>

      {/* Flashcard Sets */}
      <div className="mt-12 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-semibold mb-6 text-blue-100">
          Your Flashcard Sets
        </h2>
        
        {Object.values(sets).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-grid">
            {Object.values(sets).map((set, index) => (
              <SetCard 
                key={set.id} 
                set={set} 
                onSelect={onSelectSet}
                onDelete={onDeleteSet}
                navigate={navigate}
              />
            ))}
          </div>
        ) : (
          <div className="text-center glass-container rounded-xl py-12">
            <p className="text-blue-200/70">No flashcard sets yet.</p>
            <Link 
              to="/create" 
              className="inline-flex items-center px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg btn-hover"
            >
              <Plus size={20} className="mr-2" />
              Create your first set
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;