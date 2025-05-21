import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { MoodEntry } from "@/types/mood";

import { moods} from "@/types/mood";
import { format, eachDayOfInterval, subMonths } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Date formatting utility
export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export type HeatmapData = {
  date: string;
  count: number;
  mood?: keyof typeof moods;
};

export const aggregateMoodData = (entries: MoodEntry[]): HeatmapData[] => {
  
  const now = new Date();
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
const startDate = subMonths(endDate, 6);
const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const dataMap = allDays.reduce((acc, day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    acc[dateStr] = { date: dateStr, count: 0, moods: {} as Record<keyof typeof moods, number> };
    return acc;
  }, {} as Record<string, { date: string; count: number; moods: Record<keyof typeof moods, number> }>);

  entries.forEach(entry => {
    const dateStr = format(new Date(entry.createdAt), "yyyy-MM-dd");
    if (dataMap[dateStr]) {
      dataMap[dateStr].count++;
      const moodKey = entry.mood as keyof typeof moods;
      dataMap[dateStr].moods[moodKey] = (dataMap[dateStr].moods[moodKey] || 0) + 1;
    }
  });

  return Object.values(dataMap).map(day => {
    // Find predominant mood
    const moodsArr = Object.entries(day.moods) as [keyof typeof moods, number][];
    const predominantMood = moodsArr.length > 0
      ? moodsArr.reduce((a, b) => (a[1] > b[1] ? a : b))[0]
      : undefined;

    return {
      date: day.date,
      count: day.count,
      mood: predominantMood
    };
  });
};