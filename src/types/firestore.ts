// src/types/firestore.ts
export type MoodEntry = {
  userId: string;
  mood: 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral';
  intensity: number; // 1-5
  journal?: string;
  tags: string[];
  createdAt: Date;
};

export type UserSettings = {
  dailyReminderEnabled: boolean;
  reminderTime: string;
  selectedMoods: string[];
  goal: 'awareness' | 'stress' | 'productivity' | 'relationships';
};