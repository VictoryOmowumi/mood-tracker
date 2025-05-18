import { createContext, useContext, useState, useEffect } from 'react';
import { moods } from '@/types/mood';
import type { Mood } from '@/types/mood';
import { getLatestMoodEntry } from '@/services/moodService';
import { useAuth } from '@/context/AuthContext';

type ThemeContextType = {
  currentMood: Mood | null;
  moodTheme: typeof moods[Mood]['colors']['light'] | null;
  setMoodTheme: (mood: Mood) => void;
  resetTheme: () => void;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [moodTheme, setMoodThemeConfig] = useState<ThemeContextType['moodTheme']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load saved mood from localStorage and database
  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true);
      
      try {
        // 1. Check localStorage first (quickest)
        const savedMood = localStorage.getItem('currentMood') as Mood | null;
        if (savedMood && moods[savedMood]) {
          setCurrentMood(savedMood);
          setMoodThemeConfig(moods[savedMood].colors.light);
          setIsLoading(false);
          return;
        }

        // 2. If no localStorage, check database for latest mood
        if (currentUser) {
          const latestEntry = await getLatestMoodEntry(currentUser.uid);
          if (latestEntry?.mood) {
            setCurrentMood(latestEntry.mood);
            setMoodThemeConfig(moods[latestEntry.mood].colors.light);
            localStorage.setItem('currentMood', latestEntry.mood);
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [currentUser]);

  const setMoodTheme = (mood: Mood) => {
    setCurrentMood(mood);
    setMoodThemeConfig(moods[mood].colors.light);
    localStorage.setItem('currentMood', mood);
  };

  const resetTheme = () => {
    setCurrentMood(null);
    setMoodThemeConfig(null);
    localStorage.removeItem('currentMood');
  };

  return (
    <ThemeContext.Provider value={{ 
      currentMood, 
      moodTheme,
      setMoodTheme, 
      resetTheme,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};