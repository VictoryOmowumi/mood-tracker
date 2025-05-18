import { useMoodEntries } from "@/hooks/useMoodEntries";
import { MoodChart } from "./MoodChart";
import type { MoodEntry } from "@/types/mood";
import { useTheme } from "@/context/ThemeContext";
import { Bird } from "lucide-react";
export const MoodSummary = () => {
  const { entries, loading } = useMoodEntries();
  const { moodTheme } = useTheme();

  if (loading)
    return (
      <div
        className={`text-center py-8 ${
          moodTheme?.text || "text-muted-foreground"
        }`}
      >
        Loading mood data...
      </div>
    );
  if (entries.length === 0)
    return (
      <div
        className={`text-center py-8 ${
          moodTheme?.text || "text-muted-foreground"
        }`}
      >
        <div className="text-center">
          <Bird className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium">No entries yet!</h3>
          <p className="mt-1 text-sm text-gray-500">
            Log your first mood and earn your 🥇 badge!
          </p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          title="Most Common Mood"
          value={getMostCommonMood(entries)}
          icon="😊"
          theme={moodTheme}
        />
        <StatCard
          title="Average Intensity"
          value={getAverageIntensity(entries).toFixed(1)}
          icon="📊"
          theme={moodTheme}
        />
      </div>
      <MoodChart entries={entries} />
    </div>
  );
};

// Helper functions remain the same
const getMostCommonMood = (entries: MoodEntry[]) => {
  const counts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
};

const getAverageIntensity = (entries: MoodEntry[]) => {
  return (
    entries.reduce((sum, entry) => sum + entry.intensity, 0) / entries.length
  );
};

const StatCard = ({
  title,
  value,
  icon,
  theme,
}: {
  title: string;
  value: string;
  icon: string;
  theme: any;
}) => (
  <div className={`rounded-lg p-4 ${theme?.secondary || "bg-muted"}`}>
    <div className="flex items-center">
      <span
        className={`md:text-2xl mr-3 ${
          theme?.text ? "" : "text-muted-foreground"
        }`}
      >
        {icon}
      </span>
      <div>
        <h3
          className={`text-xs ${
            theme?.text ? `${theme.text}/70` : "text-muted-foreground"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-lg font-semibold capitalize ${
            theme?.text || "text-foreground"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  </div>
);
