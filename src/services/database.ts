import { db } from "../firebase/config";
import { 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp,
  addDoc
} from 'firebase/firestore';
import type { MoodEntry } from "../types/mood";
import type { UserSettings } from "../types/firestore";

export const saveUserSettings = async (
  userId: string, 
  settings: Partial<UserSettings>
) => {
  await setDoc(doc(db, 'users', userId), {
    settings,
    updatedAt: serverTimestamp()
  }, { merge: true }); // Merge with existing data
};

export const saveMoodEntry = async (entry: Omit<MoodEntry, 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'moodEntries'), {
    ...entry,
    createdAt: serverTimestamp()
  });
  return docRef.id;
};