import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Plus, Upload, Shuffle, HelpCircle, Info, X, ExternalLink, Mail, MessageCircle } from 'lucide-react';

const NavButton = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
      ${isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-blue-100 hover:bg-white/10'}
    `}
  >
    {children}
  </NavLink>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#1a1a2e] rounded-xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg text-blue-200/70 hover:text-blue-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="text-xl font-bold text-blue-100 hover:text-white transition-colors">
              FlashStudy
            </NavLink>
            
            <div className="flex items-center gap-4">
              <NavButton to="/study">
                <BookOpen size={20} />
                <span className="hidden sm:inline">Study</span>
              </NavButton>
              
              <NavButton to="/create">
                <Plus size={20} />
                <span className="hidden sm:inline">Create</span>
              </NavButton>
              
              <NavButton to="/import">
                <Upload size={20} />
                <span className="hidden sm:inline">Import</span>
              </NavButton>
              
              <NavButton to="/practice">
                <Shuffle size={20} />
                <span className="hidden sm:inline">Practice</span>
              </NavButton>

              <button
                onClick={() => setIsMoreInfoOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-white/10 transition-colors"
              >
                <Info size={20} />
                <span className="hidden sm:inline">More Info</span>
              </button>

              <button
                onClick={() => setIsHelpOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-100 hover:bg-white/10 transition-colors"
              >
                <HelpCircle size={20} />
                <span className="hidden sm:inline">Help</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Help Modal */}
      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Help & FAQ"
      >
        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Getting Started</h3>
          <div className="space-y-2 text-blue-200/70">
            <p>FlashStudy is a flashcard application that helps you study and memorize information effectively.</p>
            <p>Create sets of flashcards for different subjects and test your knowledge with various study modes.</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Creating Flashcards</h3>
          <div className="space-y-2 text-blue-200/70">
            <p>1. Click "Create Cards" to start a new flashcard set</p>
            <p>2. Name your set and add as many cards as you need</p>
            <p>3. Each card has a question side and an answer side</p>
            <p>4. You can edit your sets anytime by clicking the edit button</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Study Modes</h3>
          <div className="space-y-2 text-blue-200/70">
            <p><span className="text-blue-100">Study Mode:</span> Review cards in order</p>
            <p><span className="text-blue-100">Practice Mode:</span> Study cards in random order</p>
            <p>Click on a card to flip between question and answer</p>
            <p>Use the navigation arrows to move between cards</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Managing Sets</h3>
          <div className="space-y-2 text-blue-200/70">
            <p>• Edit sets to add or remove cards anytime</p>
            <p>• Delete sets you no longer need</p>
            <p>• Import flashcards from JSON files</p>
            <p>• All changes are automatically saved</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Study Tips</h3>
          <div className="space-y-2 text-blue-200/70">
            <p>• Test yourself by trying to answer before flipping the card</p>
            <p>• Use Practice Mode to avoid memorizing the order</p>
            <p>• Review difficult cards more frequently</p>
            <p>• Create focused sets for specific topics</p>
          </div>
        </section>
      </Modal>

      {/* More Info Modal */}
      <Modal
        isOpen={isMoreInfoOpen}
        onClose={() => setIsMoreInfoOpen(false)}
        title="About the Developer"
      >
        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Projects & Websites</h3>
          
          {/* Discord Bot */}
          <div className="card-gradient rounded-lg p-4 mb-4 hover:scale-[1.02] transition-transform">
            <a 
              href="https://xuko.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center">
                  <h4 className="text-blue-100 font-medium">Xuko Discord Bot</h4>
                  <ExternalLink size={16} className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-blue-200/70 mt-1">
                  A feature-rich Discord bot with 100+ commands serving 5000+ users
                </p>
              </div>
            </a>
          </div>

          {/* Business Website */}
          <div className="card-gradient rounded-lg p-4 hover:scale-[1.02] transition-transform">
            <a 
              href="https://2view.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center">
                  <h4 className="text-blue-100 font-medium">2view.xyz</h4>
                  <ExternalLink size={16} className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-blue-200/70 mt-1">
                  Portfolio and business website showcasing projects and services
                </p>
              </div>
            </a>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">Get in Touch</h3>
          <div className="space-y-4">
            <a 
              href="mailto:sxmemoe@gmail.com"
              className="flex items-center gap-3 text-blue-200/70 hover:text-blue-100 transition-colors group"
            >
              <Mail className="text-blue-400 group-hover:text-blue-300" size={20} />
              sxmemoe@gmail.com
            </a>
            <div className="flex items-center gap-3 text-blue-200/70">
              <MessageCircle className="text-blue-400" size={20} />
              Discord: 2view
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-blue-100 mb-3">About FlashStudy</h3>
          <p className="text-blue-200/70">
            FlashStudy is an intuitive flashcard application designed to help users study effectively. 
            Built with modern web technologies and a focus on user experience, it provides a seamless 
            way to create and study flashcard sets.
          </p>
        </section>
      </Modal>
    </>
  );
};

export default Navbar;