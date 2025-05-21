// components/ui/Heatmap.tsx
"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { format, parseISO, eachDayOfInterval, subMonths } from "date-fns";
import { moods } from "@/types/mood";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
type HeatmapData = {
  date: string;
  count: number;
  mood?: keyof typeof moods; // Add mood type if available
};

export const MoodHeatmap = ({
  data,
  range = 6, // months
}: {
  data: HeatmapData[];
  range?: number;
}) => {
  // Generate complete date range
  const endDate = new Date();
  const startDate = subMonths(endDate, range);
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  // Enhanced color scale based on mood or count
  const getColor = (entry: HeatmapData) => {
    if (!entry.date) return "#f5f5f5"; // Empty cells

    // If mood data exists, use mood colors
    if (entry.mood && moods[entry.mood]) {
      return moods[entry.mood].colors.light.hex;
    }

    // Default count-based colors
    if (entry.count === 0) return "#f3f4f6";
    if (entry.count <= 2) return "#86efac";
    if (entry.count <= 4) return "#4ade80";
    if (entry.count <= 6) return "#22c55e";
    return "#16a34a";
  };

  // Process data into a map for quick lookup
  const dataMap = data.reduce((acc, item) => {
    acc[item.date] = item;
    return acc;
  }, {} as Record<string, HeatmapData>);

  // Group by weeks
  const weeks: HeatmapData[][] = [];
  let currentWeek: HeatmapData[] = [];

  allDates.forEach((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const entry = dataMap[dateStr] || { date: dateStr, count: 0 };

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(entry);
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Add month labels
  const monthLabels = Array.from(
    new Set(allDates.map((date) => format(date, "MMM")))
  ).filter((_, i) => i % 2 === 0); // Show every other month

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-1">
        {/* Month labels */}
        <div className="w-12 flex flex-col gap-1 text-xs text-muted-foreground">
          {monthLabels.map((month, i) => (
            <div key={i} style={{ height: "28px", lineHeight: "28px" }}>
              {month}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex w-full gap-1">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-2">
                {week.map((day, dayIdx) => (
                  <Tooltip key={`${weekIdx}-${dayIdx}`}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="transition-all duration-200"
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: getColor(day),
                          borderRadius: 3,
                          cursor: day.date ? "pointer" : "default",
                          opacity: day.date ? 1 : 0.3,
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-center p-2">
                        <div className="font-medium">
                          {day.date
                            ? format(parseISO(day.date), "MMM d, yyyy")
                            : "No data"}
                        </div>
                        <div>
                          {day.count} {day.count === 1 ? "entry" : "entries"}
                        </div>
                        {day.mood && (
                          <div className="flex items-center justify-center gap-1 mt-1">
                            <span className="text-lg">
                              {moods[day.mood].emoji}
                            </span>
                            <span className="capitalize">{day.mood}</span>
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center gap-3 text-xs">
        <span className="text-muted-foreground">Less</span>
        {[0, 2, 4, 6].map((count, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: getColor({ date: "", count, mood: undefined }),
                borderRadius: 3,
              }}
            />
            <span className="text-muted-foreground">{count}</span>
          </div>
        ))}
        <span className="text-muted-foreground">More</span>
      </div>
    </div>
  );
};
