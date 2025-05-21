// app/history/components/MoodStats.tsx
import type { MoodEntry } from "@/types/mood";
import { moods } from "@/types/mood";
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export function MoodStats({ entries }: { entries: MoodEntry[] }) {
  const { moodTheme } = useTheme();

  // Calculate mood distribution
  const moodCounts = Object.keys(moods).reduce((acc, mood) => {
    acc[mood] = entries.filter((e) => e.mood === mood).length;
    return acc;
  }, {} as Record<string, number>);

  // Get trend data for specified days
  const getTrendData = (days: number) => {
    const dateRange = eachDayOfInterval({
      start: subDays(new Date(), days - 1),
      end: new Date(),
    });

    return dateRange.map((date) => {
      const dailyEntries = entries.filter((entry) =>
        isSameDay(new Date(entry.createdAt), date)
      );

      return {
        date,
        count: dailyEntries.length,
        moods: Object.keys(moods).reduce((acc, mood) => {
          acc[mood] = dailyEntries.filter((e) => e.mood === mood).length;
          return acc;
        }, {} as Record<string, number>),
      };
    });
  };

  const weeklyData = getTrendData(7);
  const totalEntries = entries.length;

  return (
    <div className="space-y-6">
      {/* Weekly Trends Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-6 rounded-xl shadow-sm ${moodTheme?.light.secondary || "bg-white"}`}
      >
        <h3 className={`text-xl font-semibold mb-4 ${moodTheme?.light.text}`}>
          Weekly Trends
        </h3>
        <div className="space-y-4">
          {weeklyData.map((day) => (
            <div key={day.date.toString()}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">
                  {format(day.date, "EEE, MMM d")}
                </span>
                <span className="font-medium">
                  {day.count} {day.count === 1 ? "entry" : "entries"}
                </span>
              </div>
              {day.count > 0 ? (
                <div className="flex h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  {Object.entries(day.moods)
                    .filter(([_, count]) => count > 0)
                    .map(([mood, count]) => (
                      <motion.div
                        key={mood}
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / day.count) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${moods[mood as keyof typeof moods].colors.light.primary}`}
                      />
                    ))}
                </div>
              ) : (
                <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-800" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Mood Distribution Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={`p-6 rounded-xl shadow-sm ${moodTheme?.light.secondary || "bg-white"}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-semibold ${moodTheme?.light.text}`}>
            Mood Distribution
          </h3>
          <span className="text-sm text-muted-foreground">
            {totalEntries} total
          </span>
        </div>
        <div className="space-y-4">
          {Object.entries(moodCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([mood, count]) => (
              <div key={mood} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {moods[mood as keyof typeof moods].emoji}
                    </span>
                    <span className="capitalize font-medium">
                      {mood}
                    </span>
                  </div>
                  <span className="font-mono">
                    {Math.round((count / totalEntries) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / totalEntries) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${moods[mood as keyof typeof moods].colors.light.primary}`}
                  />
                </div>
              </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}