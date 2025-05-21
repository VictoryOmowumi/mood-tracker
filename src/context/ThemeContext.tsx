// context/ThemeContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { moods } from '@/types/mood';

type ThemeContextType = {
  currentMood: keyof typeof moods | null;
  moodTheme: typeof moods[keyof typeof moods]['colors'] | null;
  setMoodTheme: (mood: keyof typeof moods | null, persist?: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  currentMood: null,
  moodTheme: null,
  setMoodTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentMood, setCurrentMood] = useState<keyof typeof moods | null>(null);
  const [moodTheme, setMoodThemeState] = useState<typeof moods[keyof typeof moods]['colors'] | null>(null);

  // Initialize theme from localStorage on load
  useEffect(() => {
    const lastLoggedMood = localStorage.getItem('lastLoggedMood') as keyof typeof moods | null;
    if (lastLoggedMood && moods[lastLoggedMood]) {
      setCurrentMood(lastLoggedMood);
      setMoodThemeState(moods[lastLoggedMood].colors);
    }
  }, []);

  const setMoodTheme = (mood: keyof typeof moods | null, persist = false) => {
    setCurrentMood(mood);
    setMoodThemeState(mood ? moods[mood].colors : null);
    if (persist && mood) {
      localStorage.setItem('lastLoggedMood', mood);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentMood, moodTheme, setMoodTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);