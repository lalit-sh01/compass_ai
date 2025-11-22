'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, BookOpen, Hammer, Share2, MoreHorizontal, Zap, Clock, Play } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function FocusCard({
    week,
    isActive,
    isNext,
    isPrev,
    onClick
}: {
    week: any;
    isActive: boolean;
    isNext: boolean;
    isPrev: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            onClick={onClick}
            layout
            initial={false}
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.6,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                x: isActive ? 0 : isPrev ? -20 : 20,
                zIndex: isActive ? 10 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
            className={`relative shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-500 border
        ${isActive
                    ? 'w-[800px] h-[450px] bg-surface shadow-2xl border-border ring-1 ring-black/5'
                    : 'w-[300px] h-[350px] bg-surface/50 border-transparent hover:opacity-80'
                }
      `}
        >
            {/* Content Container */}
            <div className="relative h-full flex flex-col p-8">

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    {isActive ? (
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                                Week {week.weekNumber}
                            </span>
                            <span className="px-2.5 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-500/20 flex items-center gap-1">
                                <Play className="w-3 h-3 fill-current" /> Current Focus
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs font-mono text-text-tertiary uppercase tracking-widest">
                            Week {week.weekNumber}
                        </span>
                    )}

                    <button className="p-1.5 hover:bg-bg-secondary rounded-full transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
                    </button>
                </div>

                {/* Main Title Area */}
                <div className={`${isActive ? 'mb-8' : 'mb-auto'}`}>
                    <motion.h2
                        layout="position"
                        className={`font-bold text-text-primary mb-2 leading-tight ${isActive ? 'text-3xl' : 'text-xl'}`}
                    >
                        {week.title}
                    </motion.h2>
                    <motion.p
                        layout="position"
                        className={`text-text-secondary font-medium ${isActive ? 'text-base' : 'text-sm line-clamp-2'}`}
                    >
                        {week.theme}
                    </motion.p>
                </div>

                {/* Active State Details (Concept B Elements) - Restored & Refined */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                            className="grid grid-cols-12 gap-8 mt-auto"
                        >
                            {/* Left Column: Goals & Resources */}
                            <div className="col-span-8 grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">
                                        <Hammer className="w-3 h-3" /> Build Goal
                                    </div>
                                    <div className="text-sm font-medium text-text-primary leading-snug bg-bg-secondary/30 p-3 rounded-lg border border-border/50">
                                        {week.buildSection?.projectTitle || "Complete the core module implementation."}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">
                                        <BookOpen className="w-3 h-3" /> Top Resource
                                    </div>
                                    <div className="text-sm font-medium text-text-primary leading-snug bg-bg-secondary/30 p-3 rounded-lg border border-border/50">
                                        {week.researchSection?.deepDiveTopics?.[0]?.description || "Advanced System Design Patterns"}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Actions & Insight */}
                            <div className="col-span-4 flex flex-col justify-between gap-4">
                                {/* AI Insight Badge (Compact) */}
                                <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                    <Zap className="w-3 h-3 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                                    <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-tight">
                                        <span className="font-bold">High Complexity:</span> Schedule deep work blocks early.
                                    </p>
                                </div>

                                {/* Hero Action Button */}
                                <button className="w-full py-3 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary-hover transition-all shadow-md shadow-primary/20 hover:shadow-primary/30 flex items-center justify-center gap-2 group">
                                    Start Week {week.weekNumber}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Inactive State Hint */}
                {!isActive && (
                    <div className="mt-4 flex items-center gap-2 text-text-tertiary">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{week.totalHours}h Estimated</span>
                    </div>
                )}

            </div>
        </motion.div>
    );
}

export default function PhaseFocusStream() {
    const [activeIndex, setActiveIndex] = useState(0);
    const phase = roadmapData.phases[0];

    // Constants for layout
    const ACTIVE_WIDTH = 800; // Increased width for side-by-side layout
    const INACTIVE_WIDTH = 300;
    const GAP = 32;

    return (
        <div className="h-screen bg-bg-primary text-text-primary font-sans overflow-hidden flex flex-col">
            {/* Nav */}
            <nav className="h-16 px-8 flex items-center justify-between z-50 shrink-0">
                <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Back to Roadmap</span>
                </Link>
                <span className="text-xs font-mono text-primary font-medium tracking-wider">CONCEPT F: FOCUS STREAM</span>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col justify-center pl-12 relative">

                {/* Visual Connector Line (The "Stream") */}
                <div className="absolute left-[48px] top-[180px] bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-border to-transparent z-0" />

                {/* Phase Header (Styled like Week View HeroAction) */}
                <div className="w-full max-w-4xl mb-8 z-20 shrink-0 relative">
                    {/* Connector Dot */}
                    <div className="absolute -left-[36px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-bg-primary z-10" />

                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-white shadow-xl border border-white/5">
                        {/* Ambient Blurs */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-orange-400">
                                    <Play className="h-4 w-4 fill-current" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Current Phase</span>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 rounded-full">
                                    {phase.weekRange}
                                </span>
                            </div>

                            <h1 className="mb-2 text-3xl font-bold leading-tight">
                                {phase.title}
                            </h1>
                            <p className="text-gray-300 text-base max-w-2xl line-clamp-2">
                                {phase.summary}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
                </div>

                {/* Carousel Track */}
                <div className="w-full overflow-visible flex items-center z-10 pl-1">
                    <motion.div
                        className="flex items-center gap-8"
                        animate={{
                            x: -activeIndex * (INACTIVE_WIDTH + GAP)
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 30
                        }}
                    >
                        {phase.weeks.map((week, index) => (
                            <FocusCard
                                key={week.weekNumber}
                                week={week}
                                isActive={index === activeIndex}
                                isNext={index === activeIndex + 1}
                                isPrev={index === activeIndex - 1}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </motion.div>
                </div>
            </main>

            {/* Progress Indicators */}
            <div className="h-16 flex items-center justify-center gap-3 shrink-0">
                {phase.weeks.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`transition-all duration-300 rounded-full ${i === activeIndex
                            ? 'w-8 h-2 bg-primary'
                            : 'w-2 h-2 bg-border hover:bg-text-tertiary'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
