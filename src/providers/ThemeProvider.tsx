"use client";
import { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 1. Check for saved preference
    const savedTheme = localStorage.getItem('mood-tracker-theme');
    
    // 2. Fallback to system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 3. Apply the theme
    const initialMode = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
    setIsDarkMode(initialMode);
    applyThemeClass(initialMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('mood-tracker-theme', newMode ? 'dark' : 'light');
    applyThemeClass(newMode);
  };

  const applyThemeClass = (darkMode: boolean) => {
    document.documentElement.classList.toggle('dark', darkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
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