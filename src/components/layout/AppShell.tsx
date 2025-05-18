import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col gap-4 md:flex-row">
        <Navigation />
        <div className="flex-1 md:ml-20 pb-16 md:pb-0">
          {children}
        </div>
      </main>
    </div>
  );
};