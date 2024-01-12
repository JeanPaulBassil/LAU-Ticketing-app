import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { IClub } from "../interfaces/index.interface";
import api from "../services/api";

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
  const login = useCallback((club: IClub) => {
    setClub(club);
  }, []);

  const logout = useCallback(() => {
    setClub(null);
  }, []);

  const register = useCallback((club: IClub) => {
    setClub(club);
  }, []);

  const getCurrentClub = useCallback(async () => {
    setLoading(true);
    try {
      const club: IClub = await api.getMe();
      console.log("received me: ", club);
      setClub(club);
    } catch (err) {
      console.log(err);
      setClub(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentClub();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      state: {
        club,
        loading,
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
