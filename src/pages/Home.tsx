import { MoodLogger } from "@/components/mood/MoodLogger";
import { MoodSummary } from "@/components/mood/MoodSummary";
import { RecentEntries } from "@/components/mood/RecentEntries";
import { YoutubeSuggestions } from "@/components/mood/YoutubeSuggestions";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { moods } from "@/types/mood";
import { useStreak } from "@/hooks/useStreak";
import { MusicPlayer } from "@/components/mood/MusicPlayer";

export default function Home() {
  
  const { entries } = useMoodEntries();
  const streak = useStreak(entries);
  const { currentMood, moodTheme } = useTheme();
  const latestMood = entries[0]?.mood;
  const { currentUser } = useAuth();

  const userName =
    currentUser?.displayName || currentUser?.email?.split("@")[0] || "there";

  return (
    <motion.div
      key={currentMood || "neutral"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen p-4 ${
        moodTheme?.light.secondary || "bg-gray-50"
      }`}
    >
      <header className="px-2 md:px-6 py-4 flex justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ rotate: currentMood ? [0, 10, -10, 0] : 0 }}
            className="hidden md:block text-4xl"
          >
            {currentMood ? moods[currentMood].emoji : "👋"}
          </motion.div>
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Hello, {userName}</h1>
            <p className="text-muted-foreground">
              {currentMood ? `Feeling ${currentMood}` : "Ready to check in?"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          🔥 <span className="font-bold">{streak}-day streak</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className={`rounded-lg glass p-3 md:p-6 backdrop-blur`}>
            <h2
              className={`text-xl font-semibold mb-4 ${moodTheme?.light.text}`}
            >
              Log Your Mood
            </h2>
            <MoodLogger />
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {latestMood && (
            <div className={`rounded-lg shadow-sm p-3 md:p-6 glass`}>
              <h2
                className={`text-xl font-semibold mb-4 ${moodTheme?.light.text}`}
              >
                Suggested Playlist
              </h2>
              <YoutubeSuggestions mood={latestMood} />
            </div>
          )}
          <div className={`rounded-lg p-3 md:p-6 glass`}>
            <h2
              className={`text-xl font-semibold mb-4 ${moodTheme?.light.text}`}
            >
              Your Mood Summary
            </h2>
            <MoodSummary />
          </div>

          <div className={`rounded-lg p-3 md:p-6 glass`}>
            <h2
              className={`text-xl font-semibold mb-4 ${moodTheme?.light.text}`}
            >
              Recent Entries
            </h2>
            <RecentEntries />
          </div>
        </div>
      </div>

      <MusicPlayer
       
       />
    </motion.div>
  );
}
