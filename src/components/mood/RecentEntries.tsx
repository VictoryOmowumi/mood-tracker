import { useMoodEntries } from '@/hooks/useMoodEntries';
import { useTheme } from '@/context/ThemeContext';
import { format } from 'date-fns';
import { moods } from '@/types/mood';

export const RecentEntries = () => {
  const { entries } = useMoodEntries();
  const { moodTheme } = useTheme();

  return (
    <div className="space-y-3">
      {entries.slice(0, 3).map((entry) => {
        const moodConfig = moods[entry.mood];
        return (
          <div 
            key={entry.id} 
            className={`p-4 rounded-lg transition-all ${moodTheme?.light.secondary || 'bg-white'}`}
          >
            <div className="flex items-start">
              <div className={`p-2 mr-3 rounded-full ${moodConfig.colors.light.secondary}`}>
                <span className="text-xl">{moodConfig.emoji}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className={`font-medium capitalize ${moodTheme?.light.text}`}>
                    {entry.mood}
                  </h3>
                  <span className={`text-sm ${moodTheme?.light.text ? `${moodTheme?.light.text}/70` : 'text-gray-500'}`}>
                    {format(entry.createdAt, 'MMM d, yyyy')}
                  </span>
                </div>
                {entry.journal && (
                  <p className={`mt-1 text-sm ${moodTheme?.light.text ? `${moodTheme?.light.text}/90` : 'text-gray-700'}`}>
                    {entry.journal}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};