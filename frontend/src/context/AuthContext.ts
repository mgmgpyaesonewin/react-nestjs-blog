import { createContext } from 'react';
import UserType from '@/types/UserType';

interface AuthContextType {
  isAuthenticated: boolean;
  updateAuth: (value: boolean) => void;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  updateAuth: () => {},
  user: null,
  setUser: () => {},
});
