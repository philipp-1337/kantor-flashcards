import React from 'react';

export default function AddCardModal({ show, newCard, setNewCard, onAdd, onCancel }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Neue Karte erstellen</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vorderseite (Frage)</label>
            <textarea value={newCard.front} onChange={e => setNewCard({ ...newCard, front: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" rows="3" placeholder="Frage eingeben..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rückseite (Antwort)</label>
            <textarea value={newCard.back} onChange={e => setNewCard({ ...newCard, back: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none" rows="3" placeholder="Antwort eingeben..." />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Abbrechen</button>
          <button onClick={onAdd} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors" disabled={!newCard.front.trim() || !newCard.back.trim()}>Karte hinzufügen</button>
        </div>
      </div>
    </div>
  );
}
