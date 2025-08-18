import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Plus, Edit2, Trash2, Brain, LogIn, LogOut, User } from 'lucide-react';

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
  // ============================================================================
  // AUTH STATE (später aus useAuth Hook)
  // ============================================================================
  const [user, setUser] = useState(null); // User | null
  const [authLoading, setAuthLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // ============================================================================
  // CARDS STATE (später aus useFirestore Hook)
  // ============================================================================
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);
  
  // Demo-Daten für PoC (später von Firestore)
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

  // ============================================================================
  // APP STATE
  // ============================================================================
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [studyMode, setStudyMode] = useState('browse');
  const [studySession, setStudySession] = useState({ cardsStudied: 0, correctCards: 0 });

  // ============================================================================
  // AUTH FUNCTIONS (später in useAuth Hook auslagern)
  // ============================================================================
  const signInWithEmailPassword = async (email, password) => {
    setAuthLoading(true);
    try {
      // TODO: Firebase Auth
      // const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // setUser(userCredential.user);
      
      // PoC: Mock-Login
      setTimeout(() => {
        setUser({ 
          uid: 'demo-user-id', 
          email: email,
          displayName: email.split('@')[0]
        });
        setCards(demoCards);
        setAuthLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setAuthLoading(false);
    }
  };

  const registerWithEmailPassword = async (email, password) => {
    setAuthLoading(true);
    try {
      // TODO: Firebase Auth
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // setUser(userCredential.user);
      
      // PoC: Mock-Registrierung
      setTimeout(() => {
        setUser({ 
          uid: 'demo-user-id', 
          email: email,
          displayName: email.split('@')[0]
        });
        setCards([]);
        setAuthLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Register error:', error);
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // TODO: Firebase Auth
      // await firebaseSignOut(auth);
      
      // PoC: Mock-Logout
      setUser(null);
      setCards([]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      setStudySession({ cardsStudied: 0, correctCards: 0 });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ============================================================================
  // FIRESTORE FUNCTIONS (später in useFirestore Hook auslagern)
  // ============================================================================
  const saveCardToFirestore = async (card) => {
    try {
      // TODO: Firestore
      // await addDoc(collection(db, 'cards'), {
      //   ...card,
      //   userId: user.uid,
      //   createdAt: serverTimestamp(),
      //   updatedAt: serverTimestamp()
      // });
      
      // PoC: Local state update
      console.log('Saving card to Firestore:', card);
    } catch (error) {
      console.error('Error saving card:', error);
    }
  };

  const updateCardInFirestore = async (cardId, updates) => {
    try {
      // TODO: Firestore
      // await updateDoc(doc(db, 'cards', cardId), {
      //   ...updates,
      //   updatedAt: serverTimestamp()
      // });
      
      // PoC: Local state update
      console.log('Updating card in Firestore:', cardId, updates);
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const deleteCardFromFirestore = async (cardId) => {
    try {
      // TODO: Firestore
      // await deleteDoc(doc(db, 'cards', cardId));
      
      // PoC: Local state update
      console.log('Deleting card from Firestore:', cardId);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const loadUserCards = async (userId) => {
    setCardsLoading(true);
    try {
      // TODO: Firestore
      // const q = query(
      //   collection(db, 'cards'),
      //   where('userId', '==', userId),
      //   orderBy('createdAt', 'desc')
      // );
      // const querySnapshot = await getDocs(q);
      // const userCards = querySnapshot.docs.map(doc => ({
      //   id: doc.id,
      //   ...doc.data(),
      //   nextReview: doc.data().nextReview.toDate(),
      //   createdAt: doc.data().createdAt.toDate(),
      //   updatedAt: doc.data().updatedAt.toDate()
      // }));
      // setCards(userCards);
      
      // PoC: Demo-Daten laden
      console.log('Loading cards for user:', userId);
      setCardsLoading(false);
    } catch (error) {
      console.error('Error loading cards:', error);
      setCardsLoading(false);
    }
  };

  // ============================================================================
  // BUSINESS LOGIC (später in separate Hooks/Utils auslagern)
  // ============================================================================
  
  // Spaced Repetition Algorithm (vereinfacht)
  const calculateNextInterval = (difficulty, currentInterval, easeFactor) => {
    let newInterval = currentInterval;
    let newEaseFactor = easeFactor;

    switch(difficulty) {
      case 0: // Wieder
        newInterval = 1;
        newEaseFactor = Math.max(1.3, easeFactor - 0.2);
        break;
      case 1: // Schwer
        newInterval = Math.max(1, Math.round(currentInterval * 1.2));
        newEaseFactor = Math.max(1.3, easeFactor - 0.15);
        break;
      case 2: // Gut
        newInterval = Math.round(currentInterval * easeFactor);
        break;
      case 3: // Einfach
        newInterval = Math.round(currentInterval * easeFactor * 1.3);
        newEaseFactor = easeFactor + 0.15;
        break;
      default:
        break;
    }

    return { newInterval, newEaseFactor };
  };

  // Filtere Karten je nach Modus
  const getAvailableCards = () => {
    if (studyMode === 'study') {
      // Im Lernmodus: nur fällige Karten
      const now = new Date();
      return cards.filter(card => card.nextReview <= now);
    }
    // Im Durchsuchenmodus: alle Karten
    return cards;
  };

  const availableCards = getAvailableCards();
  const currentCard = availableCards[currentCardIndex];
  const dueCardsCount = cards.filter(card => card.nextReview <= new Date()).length;

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      await signInWithEmailPassword(loginForm.email, loginForm.password);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerForm.email && registerForm.password && registerForm.password === registerForm.confirmPassword) {
      await registerWithEmailPassword(registerForm.email, registerForm.password);
    }
  };

  const handleDifficultyChoice = async (difficulty) => {
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

    // Update local state
    const updatedCards = cards.map(card => 
      card.id === currentCard.id ? updatedCard : card
    );
    setCards(updatedCards);

    // Update in Firestore
    await updateCardInFirestore(currentCard.id, {
      difficulty,
      interval: newInterval,
      easeFactor: newEaseFactor,
      nextReview: nextReviewDate
    });

    setIsFlipped(false);
    
    // Update study session stats
    setStudySession(prev => ({
      cardsStudied: prev.cardsStudied + 1,
      correctCards: prev.correctCards + (difficulty >= 2 ? 1 : 0)
    }));
    
    // Zur nächsten fälligen Karte im Lernmodus
    const remainingCards = getAvailableCards().filter(card => card.id !== currentCard.id);
    if (remainingCards.length > 0) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const addNewCard = async () => {
    if (newCard.front.trim() && newCard.back.trim()) {
      const card = {
        id: Date.now().toString(), // später Firebase auto-ID
        userId: user.uid,
        front: newCard.front,
        back: newCard.back,
        difficulty: 0,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Update local state
      setCards([...cards, card]);
      
      // Save to Firestore
      await saveCardToFirestore(card);
      
      setNewCard({ front: '', back: '' });
      setShowAddForm(false);
    }
  };

  const deleteCard = async (cardId) => {
    // Update local state
    const updatedCards = cards.filter(card => card.id !== cardId);
    setCards(updatedCards);
    
    // Delete from Firestore
    await deleteCardFromFirestore(cardId);
    
    if (currentCardIndex >= updatedCards.length && updatedCards.length > 0) {
      setCurrentCardIndex(updatedCards.length - 1);
    }
  };

  const navigateCard = (direction) => {
    setIsFlipped(false);
    const maxIndex = availableCards.length - 1;
    
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

  // ============================================================================
  // EFFECTS (später in separate Hooks)
  // ============================================================================
  useEffect(() => {
    // TODO: Firebase Auth State Listener
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser(user);
    //     loadUserCards(user.uid);
    //   } else {
    //     setUser(null);
    //     setCards([]);
    //   }
    // });
    // return () => unsubscribe();
  }, []);

  useEffect(() => {
    // TODO: Firestore Real-time Listener für User Cards
    if (user) {
      // const q = query(
      //   collection(db, 'cards'),
      //   where('userId', '==', user.uid),
      //   orderBy('createdAt', 'desc')
      // );
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   const userCards = querySnapshot.docs.map(doc => ({
      //     id: doc.id,
      //     ...doc.data(),
      //     nextReview: doc.data().nextReview.toDate(),
      //     createdAt: doc.data().createdAt.toDate(),
      //     updatedAt: doc.data().updatedAt.toDate()
      //   }));
      //   setCards(userCards);
      // });
      // return () => unsubscribe();
    }
  }, [user]);

  // ============================================================================
  // AUTH COMPONENTS (später in separate Komponenten auslagern)
  // ============================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Kantor Flashcards</h1>
            <p className="text-gray-600 mt-2">Melde dich an, um deine Lernkarten zu verwalten</p>
          </div>

          {/* Auth Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                authMode === 'login' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                authMode === 'register' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-600'
              }`}
            >
              Registrieren
            </button>
          </div>

          {/* Login Form */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="deine@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Anmelden
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Form */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="deine@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passwort bestätigen
                </label>
                <input
                  type="password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={authLoading || registerForm.password !== registerForm.confirmPassword}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {authLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <User className="w-5 h-5 mr-2" />
                    Registrieren
                  </>
                )}
              </button>
            </form>
          )}

          {/* Demo Login für PoC */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => signInWithEmailPassword('demo@example.com', 'demo123')}
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

  // ============================================================================
  // MAIN APP CONTENT (später in separate Komponenten)
  // ============================================================================
  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header with User Info */}
        <div className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Kantor Flashcards</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hallo, {user.displayName || user.email}!</span>
              <button
                onClick={signOut}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Brain className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Keine Karten vorhanden</h2>
            <p className="text-gray-600 mb-6">Erstelle deine erste Lernkarte, um zu beginnen!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Erste Karte erstellen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Im Lernmodus: prüfen ob fällige Karten vorhanden sind
  if (studyMode === 'study' && availableCards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header with User Info */}
        <div className="bg-white shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-indigo-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-800">Kantor Flashcards</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hallo, {user.displayName || user.email}!</span>
              <button
                onClick={signOut}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
            <Brain className="w-16 h-16 text-green-600 mx-auto mb-4" />
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

  // ============================================================================
  // MAIN APP UI
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header mit User Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-indigo-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Kantor Flashcards</h1>
                <p className="text-sm text-gray-600">Hallo, {user.displayName || user.email}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => switchMode('browse')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    studyMode === 'browse' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Durchsuchen
                </button>
                <button
                  onClick={() => switchMode('study')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    studyMode === 'study' 
                      ? 'bg-white text-indigo-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Lernen
                  {dueCardsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {dueCardsCount}
                    </span>
                  )}
                </button>
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Neue Karte
              </button>

              <button
                onClick={signOut}
                className="text-gray-600 hover:text-gray-800 transition-colors p-2"
                title="Abmelden"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {studyMode === 'browse' 
                ? `Karte ${currentCardIndex + 1} von ${availableCards.length} (${cards.length} gesamt)`
                : `Fällige Karte ${currentCardIndex + 1} von ${availableCards.length}`
              }
            </div>
            {studyMode === 'study' && (
              <div className="text-sm text-green-600 font-medium">
                Session: {studySession.cardsStudied} studiert, {studySession.correctCards} korrekt
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {cardsLoading && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Lade deine Karten...</p>
          </div>
        )}

        {/* Flashcard */}
        {!cardsLoading && currentCard && (
          <>
            <div className="mb-6">
              <div 
                className="bg-white rounded-xl shadow-lg min-h-64 cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div className="p-8 h-64 flex items-center justify-center">
                  <div className="text-center w-full">
                    <div className="text-lg font-medium text-gray-800 mb-4">
                      {isFlipped ? 'Antwort:' : 'Frage:'}
                    </div>
                    <div className="text-xl text-gray-900 leading-relaxed">
                      {isFlipped ? currentCard.back : currentCard.front}
                    </div>
                    {!isFlipped && (
                      <div className="mt-6 text-sm text-gray-500">
                        {studyMode === 'study' ? 'Klicken oder "Antwort zeigen" für Lösung' : 'Klicken zum Umdrehen'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {studyMode === 'browse' && (
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigateCard('prev')}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={availableCards.length <= 1}
                  >
                    <ChevronLeft className="w-5 h-5 mr-1" />
                    Vorherige
                  </button>

                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Umdrehen
                  </button>

                  <button
                    onClick={() => navigateCard('next')}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={availableCards.length <= 1}
                  >
                    Nächste
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </button>
                </div>
              )}

              {studyMode === 'study' && !isFlipped && (
                <div className="text-center mb-6">
                  <button
                    onClick={() => setIsFlipped(true)}
                    className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium"
                  >
                    Antwort zeigen
                  </button>
                </div>
              )}

              {/* Difficulty Buttons (nur im Lernmodus und wenn Karte umgedreht) */}
              {studyMode === 'study' && isFlipped && (
                <div>
                  <div className="text-center mb-4">
                    <p className="text-gray-700 font-medium">Wie schwer war diese Karte?</p>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    <button
                      onClick={() => handleDifficultyChoice(0)}
                      className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Wieder
                      <div className="text-xs opacity-80">≤ 1 Tag</div>
                    </button>
                    <button
                      onClick={() => handleDifficultyChoice(1)}
                      className="bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                      Schwer
                      <div className="text-xs opacity-80">≤ 6 Tage</div>
                    </button>
                    <button
                      onClick={() => handleDifficultyChoice(2)}
                      className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                    >
                      Gut
                      <div className="text-xs opacity-80">≤ 10 Tage</div>
                    </button>
                    <button
                      onClick={() => handleDifficultyChoice(3)}
                      className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Einfach
                      <div className="text-xs opacity-80">≥ 4 Tage</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Card Info */}
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

        {/* Card Management (nur im Durchsuchen-Modus) */}
        {studyMode === 'browse' && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Kartenverwaltung</h3>
            <div className="space-y-3">
              {cards.map((card, index) => {
                const isCurrentCard = cards.findIndex(c => c.id === currentCard?.id) === index;
                const isDue = card.nextReview <= new Date();
                
                return (
                  <div key={card.id} className={`p-4 rounded-lg border-2 transition-colors ${
                    isCurrentCard 
                      ? 'border-indigo-300 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="font-medium text-gray-800">{card.front}</div>
                          {isDue && (
                            <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                              Fällig
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{card.back}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          Nächste Wiederholung: {card.nextReview.toLocaleDateString('de-DE')}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            const cardIndex = cards.findIndex(c => c.id === card.id);
                            setCurrentCardIndex(cardIndex);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 transition-colors"
                          title="Zu dieser Karte wechseln"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCard(card.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Karte löschen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Card Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Neue Karte erstellen</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vorderseite (Frage)
                </label>
                <textarea
                  value={newCard.front}
                  onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  rows="3"
                  placeholder="Frage eingeben..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rückseite (Antwort)
                </label>
                <textarea
                  value={newCard.back}
                  onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  rows="3"
                  placeholder="Antwort eingeben..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCard({ front: '', back: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={addNewCard}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                disabled={!newCard.front.trim() || !newCard.back.trim()}
              >
                Karte hinzufügen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KantorFlashcards;