// context/MusicPlayerContext.tsx
import { createContext, useContext, useState } from "react";

type MusicPlayerContextType = {
  currentPlaylist: string | null;
  showPlayer: boolean;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  openPlayer: (playlistId: string) => void;
  closePlayer: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextType>({
  currentPlaylist: null,
  showPlayer: false,
  openPlayer: () => {},
  closePlayer: () => {},
  setShowPlayer: () => {}
});

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentPlaylist, setCurrentPlaylist] = useState<string | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const openPlayer = (playlistId: string) => {
    setCurrentPlaylist(playlistId);
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  return (
    <MusicPlayerContext.Provider
      value={{ currentPlaylist, showPlayer, setShowPlayer, openPlayer, closePlayer }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
}

export const useMusicPlayer = () => useContext(MusicPlayerContext);