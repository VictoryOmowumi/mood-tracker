import { db } from "../firebase/config";
import { 
  addDoc, 
  collection, 
  serverTimestamp, 
  query,      
  where,      
  orderBy,    
  onSnapshot,
  limit,
  getDocs 
} from 'firebase/firestore';
import { moods } from "../types/mood";
import type { MoodEntry } from "../types/mood";

export const logMood = async (
  userId: string,
  mood: keyof typeof moods,
  journal?: string,
  intensity: number = 3,
  tags: string[] = [],
  physicalSensations: string[] = []
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'moodEntries'), {
      userId,
      mood,
      intensity,
      journal,
      tags,
      physicalSensations,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      youtubePlaylistId: moods[mood].playlistId
    });
    return docRef.id;
  } catch (error) {
    console.error("Error logging mood:", error);
    throw new Error("Failed to log mood");
  }
};

export const getMoodEntries = (
  userId: string, 
  callback: (entries: MoodEntry[]) => void,
  errorCallback?: (error: Error) => void
) => {
  const q = query(
    collection(db, 'moodEntries'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const unsubscribe = onSnapshot(q, 
    (snapshot) => {
      const entries = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Ensure dates are properly converted
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as MoodEntry;
      });
      callback(entries);
    },
    (error) => {
      console.error("Error fetching mood entries:", error);
      errorCallback?.(error);
    }
  );

  return unsubscribe;
};

export const getLatestMoodEntry = async (userId: string): Promise<MoodEntry | null> => {
  try {
    const q = query(
      collection(db, 'moodEntries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    
    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    } as MoodEntry;
  } catch (error) {
    console.error('Error fetching latest mood entry:', error);
    return null;
  }
};

export const getTodayMoodEntries = (
  userId: string, 
  callback: (entries: MoodEntry[]) => void
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const q = query(
    collection(db, 'moodEntries'),
    where('userId', '==', userId),
    where('createdAt', '>=', today),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const entries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as MoodEntry[];
    callback(entries);
  });
};