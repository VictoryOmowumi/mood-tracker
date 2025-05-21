// app/settings/components/SettingsSection.tsx
import { useTheme } from "@/context/ThemeContext";

export function SettingsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { moodTheme } = useTheme();

  return (
    <div className="space-y-4">
      <h2 
        className="text-xl font-semibold"
        style={{ color: moodTheme?.light.text }}
      >
        {title}
      </h2>
      <div 
        className={`p-6 rounded-lg glass backdrop-blur-md`}
      >
        {children}
      </div>
    </div>
  );
}