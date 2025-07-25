
"use client";
import type {User} from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext, type AuthContextType } from '@/components/auth/FirebaseAuthProvider';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
