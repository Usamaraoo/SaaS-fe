import type { User } from "@/types/user.type";
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
  user: User | null;
  persistUser: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);
  // Check if user is already logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const persistUser = (user:User)=>{
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, persistUser, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};