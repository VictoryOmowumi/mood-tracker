import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Mood, MoodEntry } from "@/types/mood";
import { moods } from "@/types/mood";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { logMood, getTodayMoodEntries } from "@/services/moodService";
import { TagsInput } from "@/components/ui/tags-input";
import { PhysicalSensationPicker } from "./PhysicalSensationPicker";
import { toast } from "sonner";
import { Clock, ChevronDown, ChevronUp,Loader2 } from "lucide-react";
import debounce from "lodash.debounce";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

const MoodPill = ({
  entry,
  onSelect,
}: {
  entry: MoodEntry;
  onSelect: () => void;
}) => (
  <motion.div
    variants={itemVariants}
    onClick={onSelect}
    className={`px-3 py-2 rounded-full flex items-center gap-2 cursor-pointer ${
      moods[entry.mood].colors.light.secondary
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="text-lg">{moods[entry.mood].emoji}</span>
    <div className="text-xs text-left">
      <div className="font-medium">{entry.mood}</div>
      <div className="flex items-center gap-1">
        <Clock size={12} />
        {new Date(entry.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  </motion.div>
);

export const MoodLogger = () => {
  const { currentUser } = useAuth();
  const { currentMood, moodTheme, setMoodTheme } = useTheme();
  const [intensity, setIntensity] = useState(3);
  const [journal, setJournal] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [sensations, setSensations] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entriesToday, setEntriesToday] = useState<MoodEntry[]>([]);
  const [isQuickLog, setIsQuickLog] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  // Load today's entries
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getTodayMoodEntries(currentUser.uid, (entries) => {
        setEntriesToday(entries);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  // Auto-carry forward common tags
  useEffect(() => {
    if (entriesToday.length > 1) {
      const commonTags = [...new Set(entriesToday.flatMap((e) => e.tags))];
      if (commonTags.length > 0) {
        setTags((prev) => [...new Set([...prev, ...commonTags])]);
      }
    }
  }, [entriesToday]);

  const handleMoodSelect = (mood: Mood) => {
    setMoodTheme(mood);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const debouncedLogMood = useMemo(() => debounce(logMood, 1000), []);

  const handleSubmit = async () => {
    if (!currentMood || !currentUser) return;

    setIsSubmitting(true);
    try {
      await debouncedLogMood(
        currentUser.uid,
        currentMood,
        journal,
        intensity,
        tags,
        sensations
      );

      toast.success(`Your ${currentMood} mood was recorded`, {
        icon: moods[currentMood].emoji,
        action: {
          label: "Add Another",
          onClick: () => setIsQuickLog(true),
        },
      });

      // Reset form but keep mood selected
      setJournal("");
      setIntensity(3);
    } catch (error) {
      toast.error("Couldn't save your mood. Try again?");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLog = async (mood: Mood) => {
    if (!currentUser) return;

    try {
      await logMood(currentUser.uid, mood, "", 3, [], []);

      toast(`Quick log: ${mood}`, {
        icon: moods[mood].emoji,
      });
    } catch (error) {
      toast.error("Quick save failed");
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mood Selection Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {Object.entries(moods).map(([key, mood]) => (
          <motion.button
            key={key}
            variants={itemVariants}
            onClick={() => handleMoodSelect(key as Mood)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              currentMood === key
                ? `${mood.colors.light.primary} text-primary-foreground shadow-lg`
                : "bg-white hover:bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="mt-2 text-sm capitalize">{key}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Timeline Preview */}
      {entriesToday.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            {showTimeline ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Today's Mood Journey ({entriesToday.length})
          </button>

          <AnimatePresence>
            {showTimeline && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <motion.div
                  variants={containerVariants}
                  className="flex flex-wrap gap-2 mt-3"
                >
                  {entriesToday.map((entry) => (
                    <MoodPill
                      key={entry.id}
                      entry={entry}
                      onSelect={() => {
                        setMoodTheme(entry.mood);
                        setIntensity(entry.intensity);
                        setJournal(entry.journal || "");
                        setTags(entry.tags);
                        setSensations(entry.sensations);
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Mood Details Form */}
      {currentMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" }}
          className="space-y-6"
        >
          {/* Intensity Slider with Animation */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Intensity</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: intensity > i ? 1.2 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className={`w-2 h-2 rounded-full ${
                      intensity > i
                        ? moods[currentMood].colors.light.primary
                        : "#e5e7eb"
                    }`}
                  />
                ))}
              </div>
            </div>
            <Slider
              value={[intensity]}
              onValueChange={([val]) => setIntensity(val)}
              min={1}
              max={5}
              step={1}
              className={`w-full `}
            />
          </div>

          {/* Physical Sensations */}
          <PhysicalSensationPicker
            mood={currentMood}
            selected={sensations}
            onChange={setSensations}
          />

          {/* Journal with Growing Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Journal{" "}
              {journal.length > 0 && (
                <span className="text-muted-foreground ml-1">
                  ({journal.length}/500)
                </span>
              )}
            </label>
            <Textarea
              value={journal}
              onChange={(e) => setJournal(e.target.value.slice(0, 500))}
              placeholder={`What's behind this ${currentMood} mood?`}
              className={`min-h-[100px] transition-all duration-300 border border-${moods[currentMood].colors.light.hex}`}
            />
          </div>

          {/* Tags with Animation */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <TagsInput
              tags={tags}
              onTagsChange={setTags}
              placeholder="Add context (work, family...)"
            />
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-6 text-lg ${moods[currentMood].colors.light.primary} `}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="animate-spin" />
                  Brewing your mood...
                </motion.span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Capture this {currentMood} moment ✨</span>
                  {/* {moods[currentMood].emoji} */}
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Quick Log Button */}
      {entriesToday.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-4 border-t"
        >
          <p className="text-sm text-muted-foreground mb-3">
            Feeling different now?
          </p>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(moods).map(([key, mood]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuickLog(key as Mood)}
                className="p-2 rounded-lg flex flex-col items-center"
                style={{
                  backgroundColor: moods[key as Mood].colors.light.secondary,
                }}
              >
                <span className="text-2xl">{mood.emoji}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
