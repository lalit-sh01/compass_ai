'use client';

import { motion } from 'framer-motion';
import type { Roadmap } from '@/lib/types';

interface AccordionHeaderProps {
  roadmap: Roadmap;
}

export default function AccordionHeader({ roadmap }: AccordionHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-surface sticky top-0 z-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold font-primary text-text-primary mb-2">
          {roadmap.title}
        </h1>
        <p className="text-base sm:text-lg text-text-secondary font-secondary">
          {roadmap.goal}
        </p>
      </div>
    </motion.header>
  );
}
