import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { IClub } from "../interfaces/index.interface";

// Define the authentication state shape
interface AuthState {
  club: IClub | null;
  loading: boolean;
}

type AuthContextType = {
  state: AuthState;
  login: (club: IClub) => void;
  logout: () => void;
  register: (club: IClub) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Create a function that provides the AuthContext to components
export function AuthProvider({ children }: { children: ReactNode }) {
  const [club, setClub] = useState<IClub | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Add functions for login and logout
  const login = (club: IClub) => {
    setClub(club);
  };

  const logout = () => {
    setClub(null);
  };
  const register = (club: IClub) => {
    setClub(club);
  };
  

  const memoizedValue = React.useMemo(
    () => ({
      state: { 
        club,
        loading 
      },
      login,
      logout,
      register,
    }),
    [club, loading]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
