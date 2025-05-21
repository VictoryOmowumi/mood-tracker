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
  updateEmail,
  updatePassword
} from "firebase/auth";
import type { User } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase/config";

export const auth = getAuth(app);

const storage = getStorage(app, "gs://moodly-69805.appspot.com");

// Enhanced User Profile Type
export interface AppUser extends User {
  photoURL: string | null;
  displayName: string | null;
}

// Email/Password Auth
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName });
  return userCredential;
};

// Profile Management
export const updateUserProfile = async (
  user: User,
  updates: {
    displayName?: string;
    photoURL?: string;
    email?: string;
    password?: string;
  }
) => {
  const promises = [];
  
  if (updates.displayName || updates.photoURL) {
    promises.push(
      updateProfile(user, {
        displayName: updates.displayName,
        photoURL: updates.photoURL
      })
    );
  }

  if (updates.email) {
    promises.push(updateEmail(user, updates.email));
  }

  if (updates.password) {
    promises.push(updatePassword(user, updates.password));
  }

  await Promise.all(promises);
};

export const uploadProfilePicture = async (user: User, file: File) => {
  const storageRef = ref(storage, `profilePictures/${user.uid}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);
  await updateProfile(user, { photoURL });
  return photoURL;
};

// Google Auth
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Session Management
export const logout = () => signOut(auth);

// Auth State Listener
export const onAuthChange = (callback: (user: AppUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Verification
export const verifyEmail = async (user: User) => {
  await sendEmailVerification(user);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};