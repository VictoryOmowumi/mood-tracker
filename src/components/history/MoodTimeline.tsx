// app/history/components/MoodTimeline.tsx
import type { MoodEntry } from "@/types/mood";
import { format } from "date-fns";
import { moods } from "@/types/mood";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

interface MoodTimelineProps {
  entries: MoodEntry[];
  className?: string;
}

export function MoodTimeline({ entries, className }: MoodTimelineProps) {
  const { moodTheme } = useTheme();

  return (
    <div className={className}>
      {entries.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No entries found for this period
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex gap-4 group"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${moods[entry.mood].colors.light.primary}`}
                >
                  <span className="text-xl">{moods[entry.mood].emoji}</span>
                </div>
                <div
                  className="w-px h-full"
                  style={{ backgroundColor: moodTheme?.light.text }}
                />
              </div>
              <div className="pb-6 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium capitalize text-lg">
                      {entry.mood}
                    </h4>
                    {entry.intensity && (
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < entry.intensity
                                ? moods[entry.mood].colors.light.primary
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <time
                    className="text-sm text-muted-foreground whitespace-nowrap"
                    style={{ color: moodTheme?.light.text }}
                  >
                    {format(new Date(entry.createdAt), "MMM d, h:mm a")}
                  </time>
                </div>
                {entry.journal && (
                  <p
                    className="mt-3 text-muted-foreground whitespace-pre-line"
                    style={{ color: moodTheme?.light.text }}
                  >
                    {entry.journal}
                  </p>
                )}
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full ${moods[entry.mood].colors.light.primary} text-primary-foreground`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}