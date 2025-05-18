import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { auth } from '../../services/auth'; 
import { saveUserSettings } from '../../services/database';

export default function NotificationSetup({ 
  onComplete, 
  onBack,
  selectedGoal // <-- Add this prop
}: { 
  onComplete: () => void, 
  onBack: () => void,
  selectedGoal: string // <-- Add this prop type
}) {
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('19:00');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    if (auth.currentUser) {
      await saveUserSettings(auth.currentUser.uid, {
        dailyReminderEnabled: remindersEnabled,
        reminderTime,
        goal: selectedGoal
      });
    }
    setLoading(false);
    onComplete();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Daily Reminders</h2>
        <p className="text-gray-600 mt-2">
          {remindersEnabled
            ? "We'll remind you to log your mood"
            : "You can enable reminders later in settings"}
        </p>
      </div>

      <motion.div 
        className="bg-gray-50 rounded-xl p-6 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg mr-3 ${
              remindersEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'
            }`}>
              {remindersEnabled ? <FiBell size={20} /> : <FiBellOff size={20} />}
            </div>
            <span className="font-medium">Daily Reminders</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={remindersEnabled}
              onChange={() => setRemindersEnabled(!remindersEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        {remindersEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="overflow-hidden"
          >
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reminder Time
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </motion.div>
        )}
      </motion.div>

      <div className="flex gap-3">
         <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? "Saving..." : "Complete Setup"}
        </button>
      </div>
    </div>
  );
}