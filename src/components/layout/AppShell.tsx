import type { ReactNode } from 'react';
import { Navigation } from './Navigation';
import Header from './Header';
import { useTheme } from '@/context/ThemeContext';
interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const {moodTheme} = useTheme();
  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${moodTheme?.light.secondary}`}>
      <main className="flex-1 flex flex-col gap-4 md:flex-row">
        <Navigation />
        <div className="flex-1 md:ml-24 pb-16 md:pb-0">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
};