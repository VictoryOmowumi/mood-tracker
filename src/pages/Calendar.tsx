// app/calendar/page.tsx
"use client";

import { MoodHeatmap } from "@/components/calendar/MoodHeatmap";
import { MoodCalendar } from "@/components/calendar/MoodCalendar";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { aggregateMoodData } from "@/lib/utils";

export default function CalendarPage() {
  const { entries } = useMoodEntries();
  const { moodTheme } = useTheme();

  // Process data for heatmap
  const heatmapData = aggregateMoodData(entries);
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 ${moodTheme?.light.secondary || "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.h1
          className="text-3xl font-bold"
          style={{ color: moodTheme?.light.text }}
        >
          Mood Patterns
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8">
          {/* Mood Frequency Heatmap */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className={` rounded-xl col-span-2 bg-background p-4 mb-5 md:mb-0`}
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: moodTheme?.light.text }}>
              Your Mood Frequency
            </h2>
            <MoodHeatmap data={heatmapData}  />
            <p className="text-sm text-muted-foreground mt-4">
              Hover over squares to see daily details. Darker colors indicate more entries.
            </p>
          </motion.div>

          {/* Mood Type Calendar */}
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className={` rounded-xl  bg-background p-4`}
            
          >
            <h2 className="text-xl font-semibold mb-6" style={{ color: moodTheme?.light.text }}>
              Mood Type Calendar
            </h2>
            <MoodCalendar entries={entries} />
            <p className="text-sm text-muted-foreground mt-4">
              Colors represent your predominant mood each day.
            </p>
          </motion.div>
        </div>

        {/* Monthly Insights Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl ${moodTheme?.light.secondary || "bg-white"}`}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: moodTheme?.light.text }}>
            Monthly Insights
          </h2>
          {/* Add your insights component here */}
        </motion.div>
      </div>
    </motion.div>
  );
}