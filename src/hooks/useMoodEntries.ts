import { useEffect, useState } from 'react';
import type { MoodEntry } from '../types/mood';
import { getMoodEntries } from '@/services/moodService';
import { useAuth } from '@/context/AuthContext';

export const useMoodEntries = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = getMoodEntries(currentUser.uid, (fetchedEntries) => {
      setEntries(fetchedEntries);
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return { entries, loading, error };
};