'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

export default function CarouselNavigation({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: CarouselNavigationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex items-center justify-center gap-6 mt-12 sm:mt-16"
    >
      {/* Previous Button */}
      <motion.button
        onClick={onPrev}
        disabled={!canGoPrev}
        whileHover={canGoPrev ? { scale: 1.1 } : {}}
        whileTap={canGoPrev ? { scale: 0.95 } : {}}
        className={`p-3 rounded-lg border transition-all flex items-center justify-center ${
          canGoPrev
            ? 'bg-surface border-border hover:border-primary text-text-primary cursor-pointer'
            : 'bg-bg-secondary border-border text-text-tertiary cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </motion.button>

      {/* Navigation Text */}
      <motion.div
        className="text-center text-sm text-text-secondary font-secondary"
        key="nav-text"
      >
        <p>Use arrow keys or click to navigate</p>
      </motion.div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canGoNext}
        whileHover={canGoNext ? { scale: 1.1 } : {}}
        whileTap={canGoNext ? { scale: 0.95 } : {}}
        className={`p-3 rounded-lg border transition-all flex items-center justify-center ${
          canGoNext
            ? 'bg-surface border-border hover:border-primary text-text-primary cursor-pointer'
            : 'bg-bg-secondary border-border text-text-tertiary cursor-not-allowed opacity-50'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
