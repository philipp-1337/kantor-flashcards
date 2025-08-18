import { useState } from 'react';

export default function useAuth(demoCards) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const signInWithEmailPassword = async (email, password) => {
    setAuthLoading(true);
    // TODO: Firebase Auth
    setTimeout(() => {
      setUser({ uid: 'demo-user-id', email, displayName: email.split('@')[0] });
      setAuthLoading(false);
    }, 1000);
  };

  const registerWithEmailPassword = async (email, password) => {
    setAuthLoading(true);
    setTimeout(() => {
      setUser({ uid: 'demo-user-id', email, displayName: email.split('@')[0] });
      setAuthLoading(false);
    }, 1000);
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    authLoading,
    signInWithEmailPassword,
    registerWithEmailPassword,
    signOut,
    setUser
  };
}
