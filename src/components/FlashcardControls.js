import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function FlashcardControls({ studyMode, isFlipped, onFlip, onPrev, onNext, onDifficulty, currentCard }) {
  return (
    <div>
      {studyMode === 'browse' && (
        <div className="flex items-center justify-between mb-6">
          <button onClick={onPrev} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Vorherige</span>
          </button>
          <button onClick={onFlip} className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Umdrehen</span>
          </button>
          <button onClick={onNext} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="hidden sm:inline">Nächste</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      )}
      {studyMode === 'study' && !isFlipped && (
        <div className="text-center mb-6">
          <button onClick={onFlip} className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-medium">
            Antwort zeigen
          </button>
        </div>
      )}
      {studyMode === 'study' && isFlipped && (
        <div>
          <div className="text-center mb-4">
            <p className="text-gray-700 font-medium">Wie schwer war diese Karte?</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <button onClick={() => onDifficulty(0)} className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">Wieder<div className="text-xs opacity-80">≤ 1 Tag</div></button>
            <button onClick={() => onDifficulty(1)} className="bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">Schwer<div className="text-xs opacity-80">≤ 6 Tage</div></button>
            <button onClick={() => onDifficulty(2)} className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">Gut<div className="text-xs opacity-80">≤ 10 Tage</div></button>
            <button onClick={() => onDifficulty(3)} className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">Einfach<div className="text-xs opacity-80">≥ 4 Tage</div></button>
          </div>
        </div>
      )}
    </div>
  );
}
