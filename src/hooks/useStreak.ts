// hooks/useStreak.ts
import type { MoodEntry } from "@/types/mood";

export const useStreak = (entries: MoodEntry[]) => {
  const calculateStreak = () => {
    if (entries.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let prevDate = new Date(today);

    // Check if today's entry exists
    const hasTodayEntry = entries.some(entry => {
      const entryDate = new Date(entry.createdAt);
      return entryDate.toDateString() === today.toDateString();
    });
    if (hasTodayEntry) streak++;

    // Check consecutive days
    for (const entry of entries) {
      const entryDate = new Date(entry.createdAt);
      entryDate.setHours(0, 0, 0, 0);

      if (entryDate.toDateString() === prevDate.toDateString()) continue;

      const diffDays = Math.floor((prevDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
        prevDate = entryDate;
      } else if (diffDays > 1) {
        break;
      }
    }

    return streak;
  };

  return calculateStreak();
};