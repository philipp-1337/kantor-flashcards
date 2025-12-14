import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function CardManagement({ cards, currentCard, onSelectCard, onDeleteCard }) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Kartenverwaltung</h3>
      <div className="space-y-3">
        {cards.map((card, index) => {
          const isCurrentCard = currentCard && card.id === currentCard.id;
          const isDue = card.nextReview <= new Date();
          return (
            <div key={card.id} className={`p-4 rounded-lg border-2 transition-colors ${isCurrentCard ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="font-medium text-gray-800">{card.front}</div>
                    {isDue && (<span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Fällig</span>)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{card.back}</div>
                  <div className="text-xs text-gray-500 mt-2">Nächste Wiederholung: {card.nextReview.toLocaleDateString('de-DE')}</div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button onClick={() => onSelectCard(card)} className="text-indigo-600 hover:text-indigo-800 transition-colors" title="Zu dieser Karte wechseln"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => onDeleteCard(card.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Karte löschen"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
