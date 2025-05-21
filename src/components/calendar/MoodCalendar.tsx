// app/components/calendar/MoodCalendar.tsx
import { Calendar } from "@/components/ui/calendar";
import { moods } from "@/types/mood";
import type { MoodEntry } from "@/types/mood";

export function MoodCalendar({ entries }: { entries: MoodEntry[] }) {
  const moodByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.createdAt).toDateString();
    acc[date] = entry.mood;
    return acc;
  }, {} as Record<string, keyof typeof moods>);

  return (
    <div className="w-full bg-background">
      <Calendar
        modifiers={{
          ...Object.entries(moods).reduce((acc, [mood]) => {
            acc[mood] = Object.keys(moodByDate)
              .filter((date) => moodByDate[date] === mood)
              .map((date) => new Date(date));
            return acc;
          }, {} as Record<string, Date[]>),
        }}
        modifiersStyles={{
          ...Object.entries(moods).reduce((acc, [mood, config]) => {
            acc[mood] = {
              backgroundColor: config.colors.light.hex,
              color: "white",
            };
            return acc;
          }, {} as Record<string, React.CSSProperties>),
        }}
        className=""
      />
    </div>
  );
}
