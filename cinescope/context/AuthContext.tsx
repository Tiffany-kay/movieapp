import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, user: { username: string }) => void;
  logout: () => void;
  user: { username: string } | null;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: { username: string }) => {
    localStorage.setItem("auth-token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};