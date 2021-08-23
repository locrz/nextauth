import { createContext, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn(credentials: SignInCredentials) {
    try {
      const response = await api.post("/sessions", credentials);
    } catch (e) {}
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
