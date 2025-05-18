import { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange } from "../services/auth";
import type { User } from "../services/auth";
import { AnimatePresence } from "framer-motion";
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
     <AuthContext.Provider value={{ currentUser, loading }}>
      <AnimatePresence exitBeforeEnter>
        {children}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);