import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, pageTransition } from '../../utils/animations';
import MoodSelection from './MoodSelection';
import GoalSetting from './GoalSetting';
import NotificationSetup from './NotificationSetup';
import { FiCheckCircle } from 'react-icons/fi';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: `${(step-1)*33}%` }}
            animate={{ width: `${(step-1)*33}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-8 relative">
          <AnimatePresence mode="wait">
            {completed ? (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <FiCheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">All Set!</h2>
                <p className="text-gray-600 mb-8">Your mood tracking journey begins now</p>
                <div className="animate-pulse text-blue-500">Taking you to your dashboard...</div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {step === 1 && <MoodSelection onNext={nextStep} />}
                {step === 2 && (
                  <GoalSetting onNext={nextStep} onBack={prevStep} />
                )}
                {step === 3 && (
                  <NotificationSetup onComplete={handleComplete} onBack={prevStep} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}