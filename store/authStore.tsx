'use client';

import * as React from 'react';
import type { AuthState, AuthUser } from '@/types/state';

const STORAGE_KEY = 'makerhub-auth';

interface AuthContextValue extends AuthState {
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  setPendingCheckout: (pending: boolean) => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [pendingCheckout, setPendingCheckout] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
    setIsLoading(false);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [user, mounted]);

  const login = React.useCallback((email: string, name?: string) => {
    setUser({ id: crypto.randomUUID(), email, name: name || email.split('@')[0] });
  }, []);

  const register = React.useCallback((email: string, name: string) => {
    setUser({ id: crypto.randomUUID(), email, name });
  }, []);

  const logout = React.useCallback(() => setUser(null), []);

  const value: AuthContextValue = {
    user,
    isLoading,
    pendingCheckout,
    login,
    register,
    logout,
    setPendingCheckout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
