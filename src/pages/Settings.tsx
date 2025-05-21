// app/settings/page.tsx
"use client";

import { ProfileUpload } from "@/components/ProfileUpload";
import { SettingsSection } from "@/components/SettingsSection";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { currentUser, logout } = useAuth();
  const { moodTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen p-6 b`}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <motion.h1
          className="text-3xl font-bold"
          style={{ color: moodTheme?.light.text }}
        >
          Account Settings
        </motion.h1>

        <SettingsSection title="Profile Picture">
          <ProfileUpload />
        </SettingsSection>

        <SettingsSection title="Account Information">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-muted-foreground">{currentUser?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Display Name</p>
              <p className="text-muted-foreground">
                {currentUser?.displayName || "Not set"}
              </p>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection title="Account">
          <div className="space-x-4 space-y-5">
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </SettingsSection>
      </div>
    </motion.div>
  );
}
