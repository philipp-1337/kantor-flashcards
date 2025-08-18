import React from 'react';

export default function Flashcard({ card, isFlipped, onFlip, studyMode }) {
  if (!card) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg min-h-64 cursor-pointer transform transition-transform hover:scale-105" onClick={onFlip}>
      <div className="p-8 h-64 flex items-center justify-center">
        <div className="text-center w-full">
          <div className="text-lg font-medium text-gray-800 mb-4">
            {isFlipped ? 'Antwort:' : 'Frage:'}
          </div>
          <div className="text-xl text-gray-900 leading-relaxed">
            {isFlipped ? card.back : card.front}
          </div>
          {!isFlipped && (
            <div className="mt-6 text-sm text-gray-500">
              {studyMode === 'study' ? 'Klicken oder "Antwort zeigen" für Lösung' : 'Klicken zum Umdrehen'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
