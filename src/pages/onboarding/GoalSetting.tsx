import { useState } from 'react';
import { motion } from 'framer-motion';

const goals = [
  { id: 'awareness', title: 'Increase self-awareness', emoji: '🧠' },
  { id: 'stress', title: 'Reduce stress', emoji: '🌿' },
  { id: 'productivity', title: 'Improve productivity', emoji: '⚡' },
  { id: 'relationships', title: 'Better relationships', emoji: '💞' }
];

export default function GoalSetting({ onNext, onBack }: { 
  onNext: () => void, 
  onBack: () => void 
}) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">What's your main goal?</h2>
        <p className="text-gray-600 mt-2">This helps us personalize your experience</p>
      </div>

      <motion.div className="space-y-3">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedGoal(goal.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              selectedGoal === goal.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{goal.emoji}</span>
              <span className="font-medium">{goal.title}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 px-6 rounded-lg border border-gray-300 font-medium hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedGoal}
          className={`flex-1 py-3 px-6 rounded-lg font-medium ${
            selectedGoal
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}