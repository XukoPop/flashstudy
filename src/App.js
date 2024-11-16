
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home, Study, Create, Import, Practice } from './pages';
import EditSet from './pages/EditSet';
import { shuffle } from './utils';
import { DEFAULT_SETS } from './types';

const HomeWithNavigation = (props) => {
  const navigate = useNavigate();
  return <Home {...props} navigate={navigate} />;
};

const ProgressBar = ({ progress }) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-center">
      <span className="text-white text-sm mb-1 block">Website Progression</span>
      <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-green-500 rounded-full transition-all duration-500"
        ></div>
      </div>
    </div>
  );
};

function App() {

  const [sets, setSets] = useState(() => {
    const savedSets = localStorage.getItem('flashcardSets');
    return savedSets ? JSON.parse(savedSets) : DEFAULT_SETS;
  });
  
  const [currentSetId, setCurrentSetId] = useState(() => {
    const lastUsedSet = localStorage.getItem('lastUsedSet');
    const availableSets = Object.keys(sets);
    return lastUsedSet && sets[lastUsedSet] ? lastUsedSet : availableSets[0] || null;
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('flashcardSets', JSON.stringify(sets));
  }, [sets]);

  useEffect(() => {
    if (currentSetId) {
      localStorage.setItem('lastUsedSet', currentSetId);
    }
  }, [currentSetId]);


  const currentSet = currentSetId ? sets[currentSetId] : null;
  const flashcards = currentSet?.cards || [];

 
  const createSet = (setData) => {
    const newSetId = Date.now().toString();
    const newSet = {
      id: newSetId,
      name: setData.name,
      description: setData.description || '',
      cards: setData.cards.map(card => ({
        ...card,
        id: Date.now() + Math.random()
      }))
    };

    setSets(prevSets => ({
      ...prevSets,
      [newSetId]: newSet
    }));
    setCurrentSetId(newSetId);
    return newSetId;
  };

  const updateSet = (setId, updatedSet) => {
    setSets(prevSets => ({
      ...prevSets,
      [setId]: {
        ...prevSets[setId],
        ...updatedSet,
        cards: updatedSet.cards.map(card => ({
          ...card,
          id: card.id || Date.now() + Math.random()
        }))
      }
    }));
  };

  const deleteSet = (setId) => {
    setSets(prevSets => {
      const { [setId]: deleted, ...remainingSets } = prevSets;
      const remainingSetIds = Object.keys(remainingSets);
      
 
      if (currentSetId === setId) {
        setCurrentSetId(remainingSetIds[0] || null);
        setCurrentIndex(0);
      }
      
      return remainingSets;
    });
  };


  const addCard = (setId, card) => {
    setSets(prevSets => ({
      ...prevSets,
      [setId]: {
        ...prevSets[setId],
        cards: [
          ...prevSets[setId].cards,
          { ...card, id: Date.now() + Math.random() }
        ]
      }
    }));
  };

  const updateCard = (setId, cardId, updatedCard) => {
    setSets(prevSets => ({
      ...prevSets,
      [setId]: {
        ...prevSets[setId],
        cards: prevSets[setId].cards.map(card =>
          card.id === cardId ? { ...card, ...updatedCard } : card
        )
      }
    }));
  };

  const deleteCard = (setId, cardId) => {
    setSets(prevSets => ({
      ...prevSets,
      [setId]: {
        ...prevSets[setId],
        cards: prevSets[setId].cards.filter(card => card.id !== cardId)
      }
    }));
    if (currentIndex >= flashcards.length - 1) {
      setCurrentIndex(Math.max(0, flashcards.length - 2));
    }
  };


  const navigateCards = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < flashcards.length) {
      setCurrentIndex(newIndex);
    }
  };

  const shuffleCards = () => {
    if (!currentSetId) return;
    
    setSets(prevSets => ({
      ...prevSets,
      [currentSetId]: {
        ...prevSets[currentSetId],
        cards: shuffle([...prevSets[currentSetId].cards])
      }
    }));
    setCurrentIndex(0);
  };


  const importCards = (newCards) => {
    if (!currentSetId) return;

    setSets(prevSets => ({
      ...prevSets,
      [currentSetId]: {
        ...prevSets[currentSetId],
        cards: [
          ...prevSets[currentSetId].cards,
          ...newCards.map(card => ({
            ...card,
            id: Date.now() + Math.random()
          }))
        ]
      }
    }));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomeWithNavigation 
                  sets={sets}
                  currentSetId={currentSetId}
                  onSelectSet={setCurrentSetId}
                  onDeleteSet={deleteSet}
                />
              }
            />
            <Route 
              path="/study" 
              element={
                <Study 
                  sets={sets}
                  currentSetId={currentSetId}
                  currentIndex={currentIndex}
                  flashcards={flashcards}
                  onSelectSet={setCurrentSetId}
                  onNavigate={navigateCards}
                  onDeleteCard={(cardId) => deleteCard(currentSetId, cardId)}
                  onUpdateCard={(cardId, card) => updateCard(currentSetId, cardId, card)}
                />
              } 
            />
            <Route 
              path="/create" 
              element={
                <Create 
                  onSubmit={(name, cards) => createSet({ name, cards })}
                  existingSets={Object.values(sets).map(set => set.name)}
                />
              } 
            />
            <Route 
              path="/edit/:setId" 
              element={
                <EditSet 
                  sets={sets}
                  onUpdateSet={updateSet}
                />
              }
            />
            <Route 
              path="/import" 
              element={
                <Import 
                  sets={sets}
                  currentSetId={currentSetId}
                  onSelectSet={setCurrentSetId}
                  onImport={importCards}
                />
              } 
            />
            <Route 
              path="/practice" 
              element={
                <Practice 
                  sets={sets}
                  currentSetId={currentSetId}
                  currentIndex={currentIndex}
                  flashcards={flashcards}
                  onSelectSet={setCurrentSetId}
                  onNavigate={navigateCards}
                  onShuffle={shuffleCards}
                  onDeleteCard={(cardId) => deleteCard(currentSetId, cardId)}
                  onUpdateCard={(cardId, card) => updateCard(currentSetId, cardId, card)}
                />
              } 
            />
          </Routes>
        </div>
        {/* Add Progress Bar */}
        <ProgressBar progress={90} />
      </div>
    </Router>
  );
}

export default App;
