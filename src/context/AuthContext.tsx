import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthChange, 
  logout as authLogout, 
  updateUserProfile as authUpdateProfile,
  uploadProfilePicture
} from "../services/auth";
import type { AppUser } from "../services/auth";
import { AnimatePresence } from "framer-motion";

type AuthContextType = {
  currentUser: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (updates: {
    displayName?: string;
    photoURL?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
  uploadProfilePicture: (file: File) => Promise<string>;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {},
  updateProfile: async () => {},
  uploadProfilePicture: async () => "",
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await authLogout();
    setCurrentUser(null);
  };

  const updateProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
    email?: string;
    password?: string;
  }) => {
    if (!currentUser) throw new Error("Not authenticated");
    await authUpdateProfile(currentUser, updates);
    setCurrentUser({ ...currentUser, ...updates });
  };

  const handleUploadProfilePicture = async (file: File) => {
    if (!currentUser) throw new Error("Not authenticated");
    const photoURL = await uploadProfilePicture(currentUser, file);
    await updateProfile({ photoURL });
    return photoURL;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        loading, 
        logout, 
        updateProfile,
        uploadProfilePicture: handleUploadProfilePicture
      }}
    >
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);