// components/MusicPlayer.tsx
import { motion, AnimatePresence } from "framer-motion";
import { useMusicPlayer } from "@/context/MusicPlayerContext";
import { Button } from "@/components/ui/button";
import { FiX, FiMusic } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";
import { Dialog, DialogContent } from '@/components/ui/dialog';
export const MusicPlayer = () => {
  const { currentPlaylist, showPlayer, closePlayer } = useMusicPlayer();
  const { moodTheme } = useTheme();

  if (!currentPlaylist) return null;

  return (
    <Dialog >
      <DialogContent className="sm:max-w-5xl h-[80vh] overflow-hidden p-0">
      {/* Dialog Player */}
      <AnimatePresence>
        {showPlayer && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
         

          <div className="p-6 pt-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <FiMusic className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium">Mood Logged Successfully!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Here's some music to match your vibe
            </p>
          </div>

          <div className="border-t p-6">
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Player (always visible if playlist exists) */}
      <div 
        className="fixed bottom-4 right-4 z-40 w-64 rounded-lg shadow-lg overflow-hidden"
        style={{
          backgroundColor: moodTheme?.light.secondary,
          border: `1px solid ${moodTheme?.light.primary}`
        }}
      >
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiMusic className="text-lg" />
            <span className="text-sm font-medium">Now Playing</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closePlayer}
            className="h-6 w-6"
          >
            <FiX className="h-3 w-3" />
          </Button>
        </div>
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${currentPlaylist}`}
          className="w-full aspect-video"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </DialogContent>
    </Dialog>
  );
};