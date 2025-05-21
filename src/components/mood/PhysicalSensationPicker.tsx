import { motion } from 'framer-motion';
import { sensationsByMood } from '@/lib/sensations';
import { useTheme } from '@/context/ThemeContext';

type Mood = keyof typeof sensationsByMood;

export const PhysicalSensationPicker = ({
  mood,
  selected,
  onChange
}: {
  mood: Mood;
  selected: string[];
  onChange: (sensations: string[]) => void;
}) => {
  const suggestions = sensationsByMood[mood] || [];
  const { moodTheme } = useTheme();

  const toggleSensation = (sensation: string) => {
    onChange(
      selected.includes(sensation)
        ? selected.filter(s => s !== sensation)
        : [...selected, sensation]
    );
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Physical sensations</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map(sensation => (
          <motion.button
            key={sensation}
            onClick={() => toggleSensation(sensation)}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              selected.includes(sensation)
                ? `${moodTheme?.light.primary || 'bg-primary'} ${moodTheme?.light.text || 'text-white'}`
                : 'bg-background hover:bg-muted/80 text-foreground'
            }`}
          >
            {sensation}
          </motion.button>
        ))}
      </div>
    </div>
  );
};