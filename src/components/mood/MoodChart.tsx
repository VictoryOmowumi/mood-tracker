import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { MoodEntry } from '@/types/mood';
import { useTheme } from '@/context/ThemeContext';
import { moods } from '@/types/mood';

interface MoodChartProps {
  entries: MoodEntry[];
}

export const MoodChart = ({ entries }: MoodChartProps) => {
  const { moodTheme, currentMood } = useTheme();

  // Process data for chart
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
    color: moods[mood as keyof typeof moods]?.colors.light.primary.replace('bg-', '')
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={moodTheme?.text ? `${moodTheme.text}/20` : '#88888820'} 
          />
          <XAxis 
            dataKey="mood" 
            tick={{ 
              fill: moodTheme?.text || 'currentColor',
              fontSize: 12 
            }}
          />
          <YAxis 
            tick={{ 
              fill: moodTheme?.text || 'currentColor',
              fontSize: 12
            }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: moodTheme?.hex || 'hsl(var(--background))',
              borderColor: moodTheme?.hex || 'hsl(var(--border))',
              color: moodTheme?.text || 'hsl(var(--foreground))',
              borderRadius: 'var(--radius)'
            }}
            itemStyle={{
              color: moodTheme?.text || 'hsl(var(--foreground))'
            }}
            cursor={false}
          />
          <Bar 
            dataKey="count" 
            fill={currentMood ? moods[currentMood].colors.light.hex : 'hsl(var(--primary))'}
            radius={[4, 4, 0, 0]}
             activeBar={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};