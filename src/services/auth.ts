import { 
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  
} from "firebase/auth";
import type { User } from "firebase/auth";
import app from "../firebase/config";

export const auth = getAuth(app);

// Email/Password Auth
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const verifyEmail = async (user: User) => {
  await sendEmailVerification(user);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const updateUserProfile = async (user: User, displayName: string) => {
  await updateProfile(user, { displayName });
};

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error("Login failed");
    console.error("Login error:", error);
  }
};
// Google Auth
const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Session Management
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export type { User };