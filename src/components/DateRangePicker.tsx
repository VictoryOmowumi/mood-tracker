// components/CustomDatePicker.tsx
"use client";

import { useState } from "react";
import { format,  } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export function DateRangePicker({
  onChange,
}: {
  onChange: (range: [Date | null, Date | null]) => void;
}) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            {startDate ? format(startDate, "MMM dd") : "Start date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={(date) => {
              const newRange = [date, endDate] as [Date | null, Date | null];
              setDateRange(newRange);
              onChange(newRange);
            }}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            {endDate ? format(endDate, "MMM dd") : "End date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate || undefined}
            onSelect={(date) => {
              const newRange = [startDate, date] as [Date | null, Date | null];
              setDateRange(newRange);
              onChange(newRange);
            }}
            disabled={(date) => !!startDate && date < startDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}