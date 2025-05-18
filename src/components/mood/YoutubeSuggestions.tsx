import { moods } from '@/types/mood';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
interface YoutubeSuggestionsProps {
  mood: keyof typeof moods;
  
}

export const YoutubeSuggestions = ({ mood}: YoutubeSuggestionsProps) => {
  const playlistId = moods[mood].playlistId;
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
   const {moodTheme} = useTheme();
  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        We've curated a playlist that might match your current mood
      </p>
      <Button asChild
        className={` transition-all ${moodTheme?.primary || 'bg-primary'}`}
         
      >
        <a 
          href={playlistUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Play className="mr-2 h-4 w-4" />
          Play {mood} playlist
        </a>
      </Button>
    </div>
  );
};