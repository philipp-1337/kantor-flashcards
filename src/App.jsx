import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Flashcard from './components/Flashcard';
import FlashcardControls from './components/FlashcardControls';
import Header from './components/Header';
import CardManagement from './components/CardManagement';
import AddCardModal from './components/AddCardModal';
import useAuth from './hooks/useAuth';
import useCards from './hooks/useCards';
import { calculateNextInterval } from './utils/spacedRepetition';

// ============================================================================
// TYPES & INTERFACES (für späteren TypeScript Export)
// ============================================================================
/*
interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface FlashCard {
  id: string;
  userId: string;
  front: string;
  back: string;
  difficulty: number;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  createdAt: Date;
  updatedAt: Date;
}

interface StudySession {
  cardsStudied: number;
  correctCards: number;
}
*/

const KantorFlashcards = () => {
  const [authMode, setAuthMode] = useState('login');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [studyMode, setStudyMode] = useState('browse');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studySession, setStudySession] = useState({ cardsStudied: 0, correctCards: 0 });

  // Demo-Daten für PoC
  const demoCards = [
    {
      id: '1',
      userId: 'demo-user',
      front: "Was ist die Hauptstadt von Deutschland?",
      back: "Berlin",
      difficulty: 0,
      nextReview: new Date(),
      interval: 1,
      easeFactor: 2.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      userId: 'demo-user',
      front: "Wie heißt der höchste Berg der Welt?",
      back: "Mount Everest (8.848m)",
      difficulty: 0,
      nextReview: new Date(),
      interval: 1,
      easeFactor: 2.5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      userId: 'demo-user',
      front: "Was ist 2 + 2?",
      back: "4",
      difficulty: 0,
      nextReview: new Date(),
      interval: 1,
      easeFactor: 2.5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  // Hooks
  const {
    user,
    authLoading,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut,
  } = useAuth(demoCards);
  const {
    cards,
    setCards,
    cardsLoading,
    addCard,
    updateCard,
    deleteCard
  } = useCards([]);

  // Karten filtern je nach Modus
  const getAvailableCards = () => {
    if (studyMode === 'study') {
      const now = new Date();
      return cards.filter(card => card.nextReview <= now);
    }
    return cards;
  };
  const availableCards = getAvailableCards();
  const currentCard = availableCards[currentCardIndex];
  const dueCardsCount = cards.filter(card => card.nextReview <= new Date()).length;

  // Event Handlers
  const handleLogin = (email, password) => {
    signInWithEmailPassword(email, password);
    setCards(demoCards);
  };
  const handleRegister = (email, password) => {
    registerWithEmailPassword(email, password);
    setCards([]);
  };
  const handleDifficultyChoice = (difficulty) => {
    const { newInterval, newEaseFactor } = calculateNextInterval(
      difficulty,
      currentCard.interval,
      currentCard.easeFactor
    );
    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);
    const updatedCard = {
      ...currentCard,
      difficulty,
      interval: newInterval,
      easeFactor: newEaseFactor,
      nextReview: nextReviewDate,
      updatedAt: new Date()
    };
    updateCard(currentCard.id, updatedCard);
    setIsFlipped(false);
    setStudySession(prev => ({
      cardsStudied: prev.cardsStudied + 1,
      correctCards: prev.correctCards + (difficulty >= 2 ? 1 : 0)
    }));
    setCurrentCardIndex(0);
  };
  const handleAddCard = () => {
    if (newCard.front.trim() && newCard.back.trim()) {
      const card = {
        id: Date.now().toString(),
        userId: user?.uid || 'demo-user',
        front: newCard.front,
        back: newCard.back,
        difficulty: 0,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      addCard(card);
      setNewCard({ front: '', back: '' });
      setShowAddForm(false);
    }
  };
  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
    if (currentCardIndex >= cards.length - 1) {
      setCurrentCardIndex(0);
    }
  };
  const navigateCard = (direction) => {
    setIsFlipped(false);
    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % availableCards.length);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + availableCards.length) % availableCards.length);
    }
  };
  const switchMode = (mode) => {
    setStudyMode(mode);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    if (mode === 'study') {
      setStudySession({ cardsStudied: 0, correctCards: 0 });
    }
  };

  // AUTH UI
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            {/* ...Logo und Titel... */}
            <h1 className="text-2xl font-bold text-gray-800">Kantor Flashcards</h1>
            <p className="text-gray-600 mt-2">Melde dich an, um deine Lernkarten zu verwalten</p>
          </div>
          <AuthForm
            authMode={authMode}
            setAuthMode={setAuthMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            authLoading={authLoading}
          />
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => handleLogin('demo@example.com', 'demo123')}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              disabled={authLoading}
            >
              Demo-Login (PoC)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Keine Karten vorhanden
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header
          user={user}
          onSignOut={signOut}
          onAddCard={() => setShowAddForm(true)}
          studyMode={studyMode}
          switchMode={switchMode}
          dueCardsCount={dueCardsCount}
          studySession={{ currentCardIndex, availableCardsLength: availableCards.length, cardsLength: cards.length, cardsStudied: studySession.cardsStudied, correctCards: studySession.correctCards }}
        />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Keine Karten vorhanden</h2>
            <p className="text-gray-600 mb-6">Erstelle deine erste Lernkarte, um zu beginnen!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
            >
              Erste Karte erstellen
            </button>
          </div>
        </div>
        <AddCardModal
          show={showAddForm}
          newCard={newCard}
          setNewCard={setNewCard}
          onAdd={handleAddCard}
          onCancel={() => { setShowAddForm(false); setNewCard({ front: '', back: '' }); }}
        />
      </div>
    );
  }

  // Lernmodus: keine fälligen Karten
  if (studyMode === 'study' && availableCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header
          user={user}
          onSignOut={signOut}
          onAddCard={() => setShowAddForm(true)}
          studyMode={studyMode}
          switchMode={switchMode}
          dueCardsCount={dueCardsCount}
          studySession={{ currentCardIndex, availableCardsLength: availableCards.length, cardsLength: cards.length, cardsStudied: studySession.cardsStudied, correctCards: studySession.correctCards }}
        />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Lernsession abgeschlossen!</h2>
            <p className="text-gray-600 mb-6">
              Keine Karten sind aktuell zum Lernen fällig. Alle Karten wurden erfolgreich gelernt!
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="text-sm text-green-800">
                <div>Karten studiert: {studySession.cardsStudied}</div>
                <div>Korrekt beantwortet: {studySession.correctCards}</div>
                <div>Erfolgsrate: {studySession.cardsStudied > 0 ? Math.round((studySession.correctCards / studySession.cardsStudied) * 100) : 0}%</div>
              </div>
            </div>
            <button
              onClick={() => switchMode('browse')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Zu Durchsuchen wechseln
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN APP UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Header
          user={user}
          onSignOut={signOut}
          onAddCard={() => setShowAddForm(true)}
          studyMode={studyMode}
          switchMode={switchMode}
          dueCardsCount={dueCardsCount}
          studySession={{ currentCardIndex, availableCardsLength: availableCards.length, cardsLength: cards.length, cardsStudied: studySession.cardsStudied, correctCards: studySession.correctCards }}
        />
        {cardsLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Lade deine Karten...</p>
          </div>
        )}
        {!cardsLoading && currentCard && (
          <>
            <Flashcard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              studyMode={studyMode}
            />
            <div className="bg-white rounded-xl shadow-lg p-6 my-6">
              <FlashcardControls
                studyMode={studyMode}
                isFlipped={isFlipped}
                onFlip={() => setIsFlipped(!isFlipped)}
                onPrev={() => navigateCard('prev')}
                onNext={() => navigateCard('next')}
                onDifficulty={handleDifficultyChoice}
              />
              {currentCard && (
                <div className="mt-4 text-sm text-gray-600 flex justify-between">
                  <span>Intervall: {currentCard.interval} Tag(e)</span>
                  <span>Ease Factor: {currentCard.easeFactor.toFixed(1)}</span>
                  <span>Nächste Wiederholung: {currentCard.nextReview.toLocaleDateString('de-DE')}</span>
                </div>
              )}
            </div>
          </>
        )}
        {studyMode === 'browse' && (
          <CardManagement
            cards={cards}
            currentCard={currentCard}
            onSelectCard={card => setCurrentCardIndex(cards.findIndex(c => c.id === card.id))}
            onDeleteCard={handleDeleteCard}
          />
        )}
        <AddCardModal
          show={showAddForm}
          newCard={newCard}
          setNewCard={setNewCard}
          onAdd={handleAddCard}
          onCancel={() => { setShowAddForm(false); setNewCard({ front: '', back: '' }); }}
        />
      </div>
    </div>
  );
};

export default KantorFlashcards;