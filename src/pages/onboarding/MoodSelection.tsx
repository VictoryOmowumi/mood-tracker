import { useState } from 'react';
import { motion } from 'framer-motion';
import { moods } from '../../types/mood';

export default function MoodSelection({ onNext }: { onNext: () => void }) {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood) 
        : [...prev, mood]
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">What moods do you experience?</h2>
        <p className="text-gray-600 mt-2">Select all that apply</p>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={{
          show: { transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
      >
        {Object.entries(moods).map(([key, config]) => (
          <motion.button
            key={key}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            onClick={() => toggleMood(key)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMoods.includes(key)
                ? `border-${config.color} bg-${config.color}/10 scale-105`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">{config.emoji}</div>
            <div className="font-medium capitalize">{key}</div>
          </motion.button>
        ))}
      </motion.div>

      <motion.button
        onClick={onNext}
        disabled={selectedMoods.length === 0}
        className={`w-full py-3 px-6 rounded-lg font-medium ${
          selectedMoods.length > 0
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-400'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </motion.button>
    </div>
  );
}