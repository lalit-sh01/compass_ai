'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import finalRoadmapData from '@/public/final_roadmap.json';
import TimelinePhase from '@/components/viewer/timeline-stream/TimelinePhase';
import ProgressBreadcrumb from '@/components/viewer/timeline-stream/ProgressBreadcrumb';
import type { Roadmap } from '@/lib/types';

export default function RoadmapTimelineStream() {
  const roadmap = finalRoadmapData as Roadmap;
  const [expandedPhases, setExpandedPhases] = useState<number[]>([1]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseNumber)
        ? prev.filter((p) => p !== phaseNumber)
        : [...prev, phaseNumber]
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl font-bold font-primary text-text-primary mb-6 leading-tight">
              {roadmap.title}
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary font-secondary mb-8 leading-relaxed">
              {roadmap.goal}
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 mb-12"
          >
            {[
              { label: 'Weeks', value: roadmap.totalDurationWeeks },
              { label: 'Hours/Week', value: roadmap.timeCommitmentPerWeek },
              { label: 'Phases', value: roadmap.phases.length },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-4 bg-surface rounded-lg border border-border"
              >
                <div className="text-sm text-text-secondary font-secondary">{stat.label}</div>
                <div className="text-2xl font-bold text-text-primary font-primary mt-2">
                  {stat.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll CTA */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <div className="text-text-secondary flex flex-col items-center gap-2">
              <span className="text-sm font-secondary">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Container */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Progress Breadcrumb */}
        <ProgressBreadcrumb
          phases={roadmap.phases}
          expandedPhases={expandedPhases}
        />

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-12">
          {/* Timeline Line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/20"
            style={{
              height: '100%',
              scaleY: scrollProgress > 0.2 ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Timeline Dots */}
          {roadmap.phases.map((phase, idx) => (
            <motion.div
              key={phase.phaseNumber}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="absolute left-[-9px] sm:left-[-15px] w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-primary border-4 border-bg-primary"
              style={{
                top: `${idx * 450}px`,
              }}
            />
          ))}

          {/* Phases */}
          <div className="space-y-12">
            {roadmap.phases.map((phase, idx) => (
              <TimelinePhase
                key={phase.phaseNumber}
                phase={phase}
                isExpanded={expandedPhases.includes(phase.phaseNumber)}
                onToggle={() => togglePhase(phase.phaseNumber)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Supplemental Info Section */}
      <section className="bg-surface border-t border-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl sm:text-4xl font-bold font-primary text-text-primary mb-12"
          >
            Core Skills
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmap.coreSkills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-bg-secondary rounded-lg border border-border hover:border-primary transition-colors duration-200"
              >
                <h3 className="font-bold text-text-primary font-primary mb-2">
                  {skill.skill}
                </h3>
                <p className="text-sm text-text-secondary font-secondary mb-3">
                  {skill.description}
                </p>
                <span className="text-xs text-primary font-semibold">
                  {skill.relevantWeeks}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
