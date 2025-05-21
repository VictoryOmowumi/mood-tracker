// components/ui/Heatmap.tsx

import { Tooltip } from "@/components/ui/tooltip"; // Assuming you have a Tooltip component
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

type HeatmapProps = {
  data: { date: string; count: number }[];
  colors: string[];
  showWeekdayLabels?: boolean;
  showMonthLabels?: boolean;
  cellSize?: number;
  gutter?: number;
  borderRadius?: number;
};

export const Heatmap = ({
  data,
  colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  showWeekdayLabels = true,
  showMonthLabels = true,
  cellSize = 18,
  gutter = 4,
  borderRadius = 4,
}: HeatmapProps) => {
  const { moodTheme } = useTheme();
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  // Enhanced color scale with 5 levels
  const getColor = (count: number) => {
    if (count === 0) return colors[0];
    if (count <= 1) return colors[1];
    if (count <= 3) return colors[2];
    if (count <= 5) return colors[3];
    return colors[4];
  };

  // Group data by weeks
  const weeks: { date: string; count: number; month: string }[][] = [];
  let currentWeek: { date: string; count: number; month: string }[] = [];

  // Process data into weeks with month tracking
  data.forEach((day) => {
    const date = new Date(day.date);
    const month = date.toLocaleString('default', { month: 'short' });
    
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push({ ...day, month });
  });

  // Pad the last week if needed
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push({ date: "", count: 0, month: "" });
    }
    weeks.push(currentWeek);
  }

  // Get unique months for labels
  const months = Array.from(
    new Set(
      data.map((day) =>
        new Date(day.date).toLocaleString('default', { month: 'short' })
      )
    )
  );

  return (
    <div className="heatmap-container">
      {/* Weekday Labels */}
      {showWeekdayLabels && (
        <div 
          className="flex mb-2 gap-1 text-xs"
          style={{ 
            color: moodTheme?.light.text,
            paddingLeft: showMonthLabels ? 40 : 0 
          }}
        >
          {weekdays.map((day, i) => (
            <div 
              key={i} 
              className="text-center"
              style={{ 
                width: cellSize, 
                opacity: i % 2 === 0 ? 1 : 0.5 
              }}
            >
              {day}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1">
        {/* Month Labels */}
        {showMonthLabels && (
          <div 
            className="flex flex-col gap-1 text-xs"
            style={{ 
              color: moodTheme?.light.text,
              width: 40,
              marginTop: cellSize + gutter 
            }}
          >
            {months.map((month, i) => (
              <div key={i}>{month}</div>
            ))}
          </div>
        )}

        {/* Heatmap Grid */}
        <div className="flex gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip key={`${weekIndex}-${dayIndex}`}>
                  {day.date ? (
                    <div className="text-center">
                      <div className="font-medium">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div>
                        {day.count} {day.count === 1 ? 'entry' : 'entries'}
                      </div>
                    </div>
                  ) : null}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="transition-all duration-200"
                    style={{
                      width: cellSize,
                      height: cellSize,
                      background: day.date ? getColor(day.count) : 'transparent',
                      borderRadius,
                      border: day.date ? `1px solid ${moodTheme?.light.primary || '#e5e7eb'}` : 'none',
                      cursor: day.date ? 'pointer' : 'default',
                      opacity: day.date ? 1 : 0,
                    }}
                  />
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end mt-4 gap-2 text-xs">
        <span style={{ color: moodTheme?.light.text }}>Less</span>
        {colors.map((color, i) => (
          <div
            key={i}
            style={{
              width: cellSize,
              height: cellSize,
              background: color,
              borderRadius,
              border: `1px solid ${moodTheme?.light.primary || '#e5e7eb'}`,
            }}
          />
        ))}
        <span style={{ color: moodTheme?.light.text }}>More</span>
      </div>

      <style>{`
        .heatmap-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      `}</style>
    </div>
  );
};