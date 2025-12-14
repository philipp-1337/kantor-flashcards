import React, { useState } from 'react';
import { LogIn, User } from 'lucide-react';

export default function AuthForm({ authMode, setAuthMode, onLogin, onRegister, authLoading }) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '' });

  return (
    <div>
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setAuthMode('login')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${authMode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'}`}
        >
          Anmelden
        </button>
        <button
          onClick={() => setAuthMode('register')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${authMode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600'}`}
        >
          Registrieren
        </button>
      </div>
      {authMode === 'login' && (
        <form onSubmit={e => { e.preventDefault(); onLogin(loginForm.email, loginForm.password); }} className="space-y-4">
          <input type="email" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="deine@email.com" required className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" required className="w-full p-3 border border-gray-300 rounded-lg" />
          <button type="submit" disabled={authLoading} className="w-full bg-indigo-600 text-white py-3 rounded-lg flex items-center justify-center">{authLoading ? '...' : <><LogIn className="w-5 h-5 mr-2" />Anmelden</>}</button>
        </form>
      )}
      {authMode === 'register' && (
        <form onSubmit={e => { e.preventDefault(); if (registerForm.password === registerForm.confirmPassword) onRegister(registerForm.email, registerForm.password); }} className="space-y-4">
          <input type="email" value={registerForm.email} onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })} placeholder="deine@email.com" required className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="password" value={registerForm.password} onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })} placeholder="••••••••" required className="w-full p-3 border border-gray-300 rounded-lg" />
          <input type="password" value={registerForm.confirmPassword} onChange={e => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} placeholder="••••••••" required className="w-full p-3 border border-gray-300 rounded-lg" />
          <button type="submit" disabled={authLoading || registerForm.password !== registerForm.confirmPassword} className="w-full bg-indigo-600 text-white py-3 rounded-lg">{authLoading ? '...' : <><User className="w-5 h-5 mr-2" />Registrieren</>}</button>
        </form>
      )}
    </div>
  );
}
