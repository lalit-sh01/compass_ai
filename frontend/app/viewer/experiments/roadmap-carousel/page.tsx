'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import finalRoadmapData from '@/public/final_roadmap.json';
import CarouselHeader from '@/components/viewer/carousel/CarouselHeader';
import CarouselContent from '@/components/viewer/carousel/CarouselContent';
import CarouselNavigation from '@/components/viewer/carousel/CarouselNavigation';
import CarouselProgress from '@/components/viewer/carousel/CarouselProgress';
import type { Roadmap } from '@/lib/types';

export default function RoadmapCarousel() {
  const roadmap = finalRoadmapData as Roadmap;
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [focusModeEnabled, setFocusModeEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load focus mode preference from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('focusMode');
    if (saved) {
      setFocusModeEnabled(JSON.parse(saved));
    }
  }, []);

  // Get current phase and week
  const currentPhase = roadmap.phases[currentPhaseIndex];
  const currentWeek = currentPhase.weeks[currentWeekIndex];

  // Handle phase navigation (overview mode)
  const goToNextPhase = () => {
    if (currentPhaseIndex < roadmap.phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentWeekIndex(0);
    }
  };

  const goToPrevPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      setCurrentWeekIndex(0);
    }
  };

  // Handle week navigation (focus mode)
  const goToNextWeek = () => {
    if (currentWeekIndex < currentPhase.weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    } else if (currentPhaseIndex < roadmap.phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentWeekIndex(0);
    }
  };

  const goToPrevWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    } else if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      setCurrentWeekIndex(roadmap.phases[currentPhaseIndex - 1].weeks.length - 1);
    }
  };

  // Handle focus mode toggle
  const toggleFocusMode = () => {
    const newValue = !focusModeEnabled;
    setFocusModeEnabled(newValue);
    localStorage.setItem('focusMode', JSON.stringify(newValue));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        focusModeEnabled ? goToPrevWeek() : goToPrevPhase();
      } else if (e.key === 'ArrowRight') {
        focusModeEnabled ? goToNextWeek() : goToNextPhase();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusModeEnabled, currentPhaseIndex, currentWeekIndex]);

  if (!mounted) return null;

  // Calculate total weeks
  const totalWeeks = roadmap.phases.reduce((sum, phase) => sum + phase.weeks.length, 0);
  const globalWeekIndex = roadmap.phases
    .slice(0, currentPhaseIndex)
    .reduce((sum, phase) => sum + phase.weeks.length, 0) + currentWeekIndex;

  return (
    <div className="min-h-screen bg-bg-primary overflow-hidden">
      {/* Header */}
      <CarouselHeader
        roadmap={roadmap}
        focusModeEnabled={focusModeEnabled}
        onToggleFocusMode={toggleFocusMode}
      />

      {/* Main Carousel Section */}
      <section className="relative h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Side Peeks + Hero Content */}
        <div className="w-full max-w-7xl">
          {/* Carousel Container */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <div key={`carousel-${currentPhaseIndex}-${currentWeekIndex}`} className="absolute inset-0 flex items-center justify-center">
                {/* Left Peek (Previous Phase) */}
                {currentPhaseIndex > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 0.2, x: -200, scale: 0.8 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-0 w-1/3 pointer-events-none"
                  >
                    <div className="p-6 bg-surface rounded-lg border border-border/30 blur-sm">
                      <div className="text-sm font-bold text-text-primary font-primary">
                        {roadmap.phases[currentPhaseIndex - 1].title}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Center Hero Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full lg:w-2/3 max-w-2xl z-10"
                >
                  <CarouselContent
                    phase={currentPhase}
                    week={currentWeek}
                    focusMode={focusModeEnabled}
                    phaseIndex={currentPhaseIndex}
                    weekIndex={currentWeekIndex}
                    totalPhases={roadmap.phases.length}
                    totalWeeks={totalWeeks}
                    globalWeekIndex={globalWeekIndex}
                  />
                </motion.div>

                {/* Right Peek (Next Phase) */}
                {currentPhaseIndex < roadmap.phases.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 0.2, x: 200, scale: 0.8 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.4 }}
                    className="absolute right-0 w-1/3 pointer-events-none"
                  >
                    <div className="p-6 bg-surface rounded-lg border border-border/30 blur-sm">
                      <div className="text-sm font-bold text-text-primary font-primary">
                        {roadmap.phases[currentPhaseIndex + 1].title}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <CarouselNavigation
            onPrev={focusModeEnabled ? goToPrevWeek : goToPrevPhase}
            onNext={focusModeEnabled ? goToNextWeek : goToNextPhase}
            canGoPrev={
              focusModeEnabled
                ? currentWeekIndex > 0 || currentPhaseIndex > 0
                : currentPhaseIndex > 0
            }
            canGoNext={
              focusModeEnabled
                ? currentWeekIndex < currentPhase.weeks.length - 1 || currentPhaseIndex < roadmap.phases.length - 1
                : currentPhaseIndex < roadmap.phases.length - 1
            }
          />

          {/* Progress Indicators */}
          <CarouselProgress
            currentPhaseIndex={currentPhaseIndex}
            totalPhases={roadmap.phases.length}
            currentWeekIndex={currentWeekIndex}
            totalWeeksInPhase={currentPhase.weeks.length}
            globalWeekIndex={globalWeekIndex}
            totalWeeks={totalWeeks}
            focusMode={focusModeEnabled}
          />
        </div>
      </section>

      {/* Footer Info */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-border py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-text-secondary font-secondary"
      >
        <p>
          {focusModeEnabled
            ? 'Focus mode enabled. Use ← → arrows or swipe to navigate weeks.'
            : 'Click on a week to view details. Use ← → arrows or swipe to navigate phases.'}
        </p>
      </motion.footer>
    </div>
  );
}
