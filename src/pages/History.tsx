// app/history/page.tsx
"use client";

import { useState } from "react";
import { MoodTimeline } from "@/components/history/MoodTimeline";
import { MoodStats } from "@/components/history/MoodStats";
import { MoodFilter } from "@/components/history/MoodFilter";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { isWithinInterval } from "date-fns";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { moods } from "@/types/mood";

export default function HistoryPage() {
  const { entries } = useMoodEntries();
  const { currentMood, moodTheme } = useTheme();
  const [filters, setFilters] = useState<{
    mood: string | null;
    dateRange: [Date | null, Date | null];
  }>({ mood: null, dateRange: [null, null] });

  const filteredEntries = entries.filter((entry) => {
    const matchesMood = !filters.mood || entry.mood === filters.mood;
    const [startDate, endDate] = filters.dateRange;
    const matchesDate =
      !startDate ||
      !endDate ||
      isWithinInterval(new Date(entry.createdAt), {
        start: startDate,
        end: endDate,
      });
    return matchesMood && matchesDate;
  });

  return (
    <motion.div
      key={currentMood || "neutral"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-4 `}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="space-y-4">
          <motion.h1 
            className="text-4xl font-bold"
            style={{ color: moodTheme?.light.text }}
          >
            Mood History
          </motion.h1>
          
          <MoodFilter onFilterChange={setFilters} />
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className={`rounded-xl shadow-sm p-6 ${moodTheme?.light.secondary || "bg-white"}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 
                className={`text-2xl font-semibold mb-6 ${moodTheme?.light.text}`}
              >
                Your Mood Journey
              </h2>
              <MoodTimeline entries={filteredEntries} />
            </motion.div>
          </div>

          {/* Stats Column (1/3 width) */}
          <div className="space-y-6">
            <motion.div
              // className={` ${moodTheme?.light.secondary || "bg-white"}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 
                className={`text-2xl font-semibold mb-6 ${moodTheme?.light.text}`}
              >
                Mood Statistics
              </h2>
              <MoodStats entries={filteredEntries} />
            </motion.div>

            {/* Mood Distribution Card */}
            <motion.div
              className={`rounded-xl shadow-sm p-6 ${moodTheme?.light.secondary || "bg-white"}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 
                className={`text-2xl font-semibold mb-6 ${moodTheme?.light.text}`}
              >
                Mood Palette
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(moods).map(([mood, config]) => (
                  <div 
                    key={mood}
                    className={`p-3 rounded-lg flex flex-col items-center ${config.colors.light.secondary}`}
                  >
                    <span className="text-2xl">{config.emoji}</span>
                    <span className="capitalize text-sm mt-1">{mood}</span>
                    <span className="text-xs opacity-75">
                      {filteredEntries.filter(e => e.mood === mood).length} entries
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}