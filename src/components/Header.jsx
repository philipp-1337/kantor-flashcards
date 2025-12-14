
import React, { useState } from 'react';
import { Brain, LogOut, Plus, Menu, X } from 'lucide-react';


export default function Header({ user, onSignOut, onAddCard, studyMode, switchMode, dueCardsCount, studySession }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Menü-Buttons als Komponente
  const MenuButtons = (
    <>
      <div className="flex bg-gray-100 rounded-lg p-1 flex-col md:flex-row">
        <button
          onClick={() => { switchMode('browse'); setDrawerOpen(false); }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mb-2 md:mb-0 ${studyMode === 'browse' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
        >Durchsuchen</button>
        <button
          onClick={() => { switchMode('study'); setDrawerOpen(false); }}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${studyMode === 'study' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
        >Lernen{dueCardsCount > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{dueCardsCount}</span>)}</button>
      </div>
      <button
        onClick={() => { onAddCard(); setDrawerOpen(false); }}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mt-2 md:mt-0"
      ><Plus className="w-4 h-4 mr-2" />Karte</button>
      <button
        onClick={() => { onSignOut(); setDrawerOpen(false); }}
        className="bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors p-2 mt-2 md:mt-0 flex items-center justify-center"
        title="Abmelden"
      ><LogOut className="w-5 h-5 mr-2" />Abmelden</button>
    </>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Kantor Flashcards</h1>
            <p className="text-sm text-gray-600">Hallo, {user.displayName || user.email}!</p>
          </div>
        </div>
        {/* Desktop-Menü */}
        <div className="hidden md:flex items-center space-x-4">
          {MenuButtons}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
          onClick={() => setDrawerOpen(true)}
          aria-label="Menü öffnen"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>
      {/* Drawer für Mobile */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 flex flex-col p-6 animate-slide-in">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-indigo-700">Menü</span>
              <button onClick={() => setDrawerOpen(false)} aria-label="Menü schließen">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            {MenuButtons}
          </div>
          {/* Animation-Klasse für Slide-In */}
          <style>{`
            @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
            .animate-slide-in { animation: slide-in 0.2s ease-out; }
          `}</style>
        </>
      )}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {studyMode === 'browse'
            ? `Karte ${studySession.currentCardIndex + 1} von ${studySession.availableCardsLength} (${studySession.cardsLength} gesamt)`
            : `Fällige Karte ${studySession.currentCardIndex + 1} von ${studySession.availableCardsLength}`}
        </div>
        {studyMode === 'study' && (
          <div className="text-sm text-green-600 font-medium">
            Session: {studySession.cardsStudied} studiert, {studySession.correctCards} korrekt
          </div>
        )}
      </div>
    </div>
  );
}
