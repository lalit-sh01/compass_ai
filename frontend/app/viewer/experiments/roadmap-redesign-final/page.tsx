'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import finalRoadmapData from '@/public/final_roadmap.json';
import PhaseCardOverview from './PhaseCardOverview';
import PhaseCanvasDetail from './PhaseCanvasDetail';
import type { Roadmap } from '@/lib/types';

export default function RoadmapRedesignFinal() {
  const roadmap = finalRoadmapData as Roadmap;
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);

  const selectedPhase = selectedPhaseId
    ? roadmap.phases.find((p) => p.phaseNumber === selectedPhaseId)
    : null;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-bg-primary/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/viewer"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <span className="text-xs font-mono text-primary font-medium">
            {selectedPhase ? 'PHASE DETAIL' : 'ROADMAP OVERVIEW'}
          </span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!selectedPhase ? (
          /* OVERVIEW VIEW */
          <motion.main
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-6 py-12"
          >
            {/* Header */}
            <header className="mb-12">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold font-primary text-text-primary mb-3"
              >
                {roadmap.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-text-secondary font-secondary mb-8 max-w-2xl"
              >
                {roadmap.goal}
              </motion.p>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-3 gap-4 max-w-xl"
              >
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <div className="text-xs text-text-tertiary font-secondary uppercase mb-1">
                    Total Weeks
                  </div>
                  <div className="text-2xl font-bold text-text-primary font-primary">
                    {roadmap.totalDurationWeeks}
                  </div>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <div className="text-xs text-text-tertiary font-secondary uppercase mb-1">
                    Hours/Week
                  </div>
                  <div className="text-2xl font-bold text-text-primary font-primary">
                    {roadmap.timeCommitmentPerWeek}
                  </div>
                </div>
                <div className="p-4 bg-surface rounded-lg border border-border">
                  <div className="text-xs text-text-tertiary font-secondary uppercase mb-1">
                    Phases
                  </div>
                  <div className="text-2xl font-bold text-text-primary font-primary">
                    {roadmap.phases.length}
                  </div>
                </div>
              </motion.div>
            </header>

            {/* Phase Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {roadmap.phases.map((phase, idx) => (
                <motion.div
                  key={phase.phaseNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  onClick={() => setSelectedPhaseId(phase.phaseNumber)}
                >
                  <PhaseCardOverview phase={phase} />
                </motion.div>
              ))}
            </motion.div>
          </motion.main>
        ) : (
          /* PHASE DETAIL VIEW */
          <motion.main
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="pb-12"
          >
            <motion.button
              onClick={() => setSelectedPhaseId(null)}
              className="fixed top-20 left-6 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:border-primary transition-all z-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Overview
            </motion.button>

            <PhaseCanvasDetail phase={selectedPhase!} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
