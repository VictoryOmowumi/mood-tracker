// app/journal/components/JournalList.tsx
import type { MoodEntry } from "@/types/mood";
import { JournalCard } from "./JournalCard";

export function JournalList({ entries }: { entries: MoodEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No journal entries yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {entries.map((entry) => (
        <JournalCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}