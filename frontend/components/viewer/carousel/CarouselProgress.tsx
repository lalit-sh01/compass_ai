'use client';

import { motion } from 'framer-motion';

interface CarouselProgressProps {
  currentPhaseIndex: number;
  totalPhases: number;
  currentWeekIndex: number;
  totalWeeksInPhase: number;
  globalWeekIndex: number;
  totalWeeks: number;
  focusMode: boolean;
}

export default function CarouselProgress({
  currentPhaseIndex,
  totalPhases,
  currentWeekIndex,
  totalWeeksInPhase,
  globalWeekIndex,
  totalWeeks,
  focusMode,
}: CarouselProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 sm:mt-16 space-y-6"
    >
      {/* Focus Mode Indicator */}
      {focusMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="text-sm text-text-secondary font-secondary mb-2">
            Week {globalWeekIndex + 1} of {totalWeeks}
          </div>
          <div className="flex justify-center gap-1">
            {Array.from({ length: totalWeeks }).map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  scale: idx === globalWeekIndex ? 1.3 : 1,
                  backgroundColor: idx <= globalWeekIndex ? '#D4654F' : '#E5E7EB',
                }}
                transition={{ duration: 0.3 }}
                className="w-1.5 h-1.5 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Phase Indicator (Always Visible) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: focusMode ? 0.7 : 0.6 }}
        className="text-center"
      >
        <div className="text-sm text-text-secondary font-secondary mb-2">
          Phase {currentPhaseIndex + 1} of {totalPhases}
        </div>
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: totalPhases }).map((_, idx) => (
            <motion.div
              key={idx}
              animate={{
                scale: idx === currentPhaseIndex ? 1.3 : 1,
                backgroundColor: idx <= currentPhaseIndex ? '#D4654F' : '#E5E7EB',
              }}
              transition={{ duration: 0.3 }}
              className="w-2.5 h-2.5 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Overview Mode: Week Indicator within Phase */}
      {!focusMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
          className="text-center"
        >
          <div className="text-xs text-text-tertiary font-secondary mb-2">
            Weeks in phase
          </div>
          <div className="flex justify-center gap-0.5">
            {Array.from({ length: totalWeeksInPhase }).map((_, idx) => (
              <motion.div
                key={idx}
                animate={{
                  opacity: idx === currentWeekIndex ? 1 : 0.4,
                }}
                transition={{ duration: 0.3 }}
                className="w-1 h-1 rounded-full bg-text-secondary"
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
