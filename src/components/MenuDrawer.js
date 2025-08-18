import React from 'react';

export default function MenuDrawer({ open, onClose, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} bg-black bg-opacity-50 md:hidden`}
      style={{ pointerEvents: open ? 'auto' : 'none' }}
      onClick={onClose}
    >
      <div
        className="bg-white w-64 h-full shadow-lg p-6"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="mb-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
