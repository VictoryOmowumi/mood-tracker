// app/journal/components/JournalCard.tsx
import type { MoodEntry } from "@/types/mood";
import { moods } from "@/types/mood";
import { format } from "date-fns";

export function JournalCard({ entry }: { entry: MoodEntry }) {
  const moodConfig = moods[entry.mood];

  return (
    <div
      className={`p-5 rounded-lg border border-border ${moodConfig.colors.light.secondary}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{moodConfig.emoji}</span>
          <span className="font-medium capitalize">{entry.mood}</span>
        </div>
        <time className="text-sm text-muted-foreground">
          {format(new Date(entry.createdAt), "MMM d, yyyy - h:mm a")}
        </time>
      </div>

      {entry.journal && (
        <p className="mt-3 whitespace-pre-line">{entry.journal}</p>
      )}

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${moodConfig.colors.light.primary} text-primary-foreground`}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}