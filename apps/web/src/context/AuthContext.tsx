
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const checkToken = () => {
      setIsAuthenticated(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", checkToken);

    // Also check when the user returns to the tab.
    window.addEventListener("focus", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("focus", checkToken);
    };
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
