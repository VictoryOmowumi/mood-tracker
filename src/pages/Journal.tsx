// app/journal/page.tsx
"use client";

import { useState } from "react";
import { JournalList } from "@/components/journal/JournalList";
import { SearchJournal } from "@/components/journal/SearchJournal";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { ExportButton} from "@/components/journal/ExportButton";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { moods } from "@/types/mood";

export default function JournalPage() {
  const { entries } = useMoodEntries();
  const { moodTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter entries based on search and tab
  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.journal?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesTab = activeTab === "all" || entry.mood === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-4`}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex flex-col gap-6"
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: moodTheme?.light.text }}
          >
            Journal Entries
          </h1>

          {/* Search and Filter Row */}
          <div className="flex flex-col md:flex-row gap-4 justify-between flex-wrap items-start md:items-center">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full md:w-auto"
            >
              <TabsList
                className={`${
                  moodTheme?.light.secondary || "bg-white"
                } p-1 h-auto`}
              >
                <TabsTrigger value="all" className="px-3 py-1 text-sm">
                  All
                </TabsTrigger>
                {Object.entries(moods).map(([mood, config]) => (
                  <TabsTrigger
                    key={mood}
                    value={mood}
                    className="px-3 py-1 text-sm flex items-center gap-1"
                  >
                    <span>{config.emoji}</span>
                    <span className="capitalize">{mood}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-3 w-full justify-between ">
              <SearchJournal value={searchTerm} onChange={setSearchTerm} />
              <ExportButton entries={filteredEntries} />
            </div>
          </div>
        </motion.div>

        {/* Journal Entries */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <JournalList entries={filteredEntries} />
        </motion.div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p
              className="text-muted-foreground"
              style={{ color: moodTheme?.light.text }}
            >
              {entries.length === 0
                ? "No journal entries yet. Log your first mood to get started!"
                : "No entries match your search/filters"}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
