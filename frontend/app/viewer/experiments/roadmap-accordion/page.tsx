'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import finalRoadmapData from '@/public/final_roadmap.json';
import AccordionHeader from '@/components/viewer/accordion/AccordionHeader';
import AccordionPhase from '@/components/viewer/accordion/AccordionPhase';
import type { Roadmap } from '@/lib/types';

export default function RoadmapAccordion() {
  const roadmap = finalRoadmapData as Roadmap;
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]); // Phase 1 open by default

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) => {
      // Allow multiple phases open at once
      if (prev.includes(phaseNumber)) {
        return prev.filter((p) => p !== phaseNumber);
      } else {
        return [...prev, phaseNumber];
      }
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <AccordionHeader roadmap={roadmap} />

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-surface rounded-lg border border-border"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-text-secondary font-secondary uppercase">Total Weeks</div>
              <div className="text-2xl font-bold text-text-primary font-primary">{roadmap.totalDurationWeeks}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary font-secondary uppercase">Hours/Week</div>
              <div className="text-2xl font-bold text-text-primary font-primary">{roadmap.timeCommitmentPerWeek}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary font-secondary uppercase">Phases</div>
              <div className="text-2xl font-bold text-text-primary font-primary">{roadmap.phases.length}</div>
            </div>
            <div>
              <div className="text-xs text-text-secondary font-secondary uppercase">Skills</div>
              <div className="text-2xl font-bold text-text-primary font-primary">{roadmap.coreSkills.length}</div>
            </div>
          </div>
        </motion.div>

        {/* Accordion Phases */}
        <div className="space-y-3">
          {roadmap.phases.map((phase, idx) => (
            <motion.div
              key={phase.phaseNumber}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <AccordionPhase
                phase={phase}
                isExpanded={expandedPhases.includes(phase.phaseNumber)}
                onToggle={() => togglePhase(phase.phaseNumber)}
                index={idx}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-surface rounded-lg border border-border text-center"
        >
          <p className="text-sm text-text-secondary font-secondary">
            Click on any phase to expand and see weeks. Click a week to view full details.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
