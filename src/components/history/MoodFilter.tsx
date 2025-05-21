// app/history/components/MoodFilter.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { moods } from "@/types/mood";
import { DateRangePicker } from "@/components/DateRangePicker";

export function MoodFilter({
  onFilterChange,
}: {
  onFilterChange: (params: {
    mood: string | null;
    dateRange: [Date | null, Date | null];
  }) => void;
}) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleApply = () => {
    onFilterChange({
      mood: selectedMood,
      dateRange,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <DateRangePicker onChange={(range) => setDateRange(range)} />
          </div>
          <Button onClick={handleApply}>Apply Filters</Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Mood</label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={!selectedMood ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMood(null)}
            >
              All
            </Button>
            {Object.entries(moods).map(([key, mood]) => (
              <Button
                key={key}
                variant={selectedMood === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood(key)}
                className="flex items-center gap-1"
              >
                <span>{mood.emoji}</span>
                <span className="capitalize">{key}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
