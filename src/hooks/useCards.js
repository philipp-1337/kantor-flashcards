import { useState } from 'react';

export default function useCards(initialCards = []) {
  const [cards, setCards] = useState(initialCards);
  const [cardsLoading, setCardsLoading] = useState(false);

  const addCard = async (card) => {
    setCards([...cards, card]);
    // TODO: Firestore
  };

  const updateCard = async (cardId, updates) => {
    setCards(cards.map(card => card.id === cardId ? { ...card, ...updates } : card));
    // TODO: Firestore
  };

  const deleteCard = async (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
    // TODO: Firestore
  };

  return {
    cards,
    setCards,
    cardsLoading,
    setCardsLoading,
    addCard,
    updateCard,
    deleteCard
  };
}
