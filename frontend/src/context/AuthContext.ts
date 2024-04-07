import { createContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  updateAuth: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  updateAuth: () => {},
});
