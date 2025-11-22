'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowUpRight, MoreHorizontal } from 'lucide-react';
import type { Phase } from '@/lib/types';

interface PhaseCanvasDetailProps {
  phase: Phase;
}

function CanvasCard(
  {
    children,
    className = '',
    priority = 'normal',
  }: {
    children: React.ReactNode;
    className?: string;
    priority?: 'normal' | 'high' | 'completed';
  }
) {
  return (
    <motion.div
      layout
      className={`relative p-6 rounded-2xl border transition-all hover:shadow-md ${
        priority === 'high'
          ? 'bg-surface border-primary/30 shadow-lg ring-1 ring-primary/10'
          : priority === 'completed'
            ? 'bg-bg-secondary/30 border-border opacity-60 hover:opacity-100'
            : 'bg-surface border-border hover:border-primary/20'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function PhaseCanvasDetail({ phase }: PhaseCanvasDetailProps) {
  const currentWeek = phase.weeks[0];

  return (
    <div className="min-h-screen bg-bg-secondary/30">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-text-primary mb-2 font-primary">
              {phase.title}
            </h1>
            <p className="text-text-secondary max-w-2xl font-secondary">
              {phase.summary}
            </p>
          </motion.div>

          {/* Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-4"
          >
            <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
              <span className="text-text-secondary">Velocity:</span>{' '}
              <span className="text-green-600">On Track</span>
            </div>
            <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
              <span className="text-text-secondary">Progress:</span>{' '}
              <span className="text-text-primary">0%</span>
            </div>
          </motion.div>
        </header>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
        >
          {/* 1. Current Week (Hero - 2x2) */}
          <CanvasCard
            className="md:col-span-2 md:row-span-2 flex flex-col justify-between"
            priority="high"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full font-primary">
                  CURRENT FOCUS
                </span>
                <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
                </button>
              </div>

              <h2 className="text-3xl font-bold text-text-primary mb-3 font-primary">
                Week {currentWeek.weekNumber}: {currentWeek.title}
              </h2>
              <p className="text-lg text-text-secondary italic mb-6 font-secondary">
                "{currentWeek.theme}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-bg-secondary/50 rounded-xl">
                  <div className="text-xs text-text-tertiary uppercase font-bold mb-1 font-primary">
                    Build Goal
                  </div>
                  <div className="text-sm font-medium text-text-primary line-clamp-2 font-secondary">
                    {currentWeek.buildSection?.projectTitle || 'No build section'}
                  </div>
                </div>
                <div className="p-4 bg-bg-secondary/50 rounded-xl">
                  <div className="text-xs text-text-tertiary uppercase font-bold mb-1 font-primary">
                    Focus Area
                  </div>
                  <div className="text-sm font-medium text-text-primary line-clamp-2 font-secondary">
                    {currentWeek.researchSection?.deepDiveTopics?.[0]?.description ||
                      'Research phase'}
                  </div>
                </div>
              </div>

              <Link
                href={`/viewer/week/${currentWeek.weekNumber}`}
                className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm inline-block text-center"
              >
                Continue Week {currentWeek.weekNumber}
              </Link>
            </motion.div>
          </CanvasCard>

          {/* 2. AI Insight */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CanvasCard className="bg-gradient-to-br from-primary/5 to-surface">
              <div className="flex items-center gap-2 mb-3 text-primary">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase font-primary">AI Insight</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed font-secondary">
                You're starting Phase {phase.phaseNumber}. Focus on completing all weeks in
                sequence for best results. {phase.weeks.length} weeks total.
              </p>
            </CanvasCard>
          </motion.div>

          {/* 3-N. Other Weeks */}
          {phase.weeks.slice(1).map((week, idx) => (
            <motion.div
              key={week.weekNumber}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + idx * 0.05 }}
            >
              <Link href={`/viewer/week/${week.weekNumber}`}>
                <CanvasCard className="group cursor-pointer hover:border-primary/30">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-text-tertiary font-primary">
                      WEEK {week.weekNumber}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 font-primary">
                    {week.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-text-secondary font-secondary">
                    <Clock className="w-3 h-3" />
                    {week.totalHours}h Estimated
                  </div>
                </CanvasCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
