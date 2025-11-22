'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, CheckCircle2, Circle, Sparkles, BookOpen, Hammer, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Types ---
interface Week {
    weekNumber: number;
    title: string;
    theme: string;
    totalHours: number;
    status: string;
    timeBreakdown: {
        build: number;
        research: number;
        share: number;
    };
    buildSection?: any;
    researchSection?: any;
    shareSection?: any;
}

// --- Components ---

function SmartWeekItem({
    week,
    isActive,
    isCompleted,
    onClick
}: {
    week: Week;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`group relative overflow-hidden rounded-xl border transition-colors cursor-pointer ${isActive
                    ? 'bg-surface border-primary/20 shadow-lg ring-1 ring-primary/10'
                    : isCompleted
                        ? 'bg-bg-secondary/50 border-border opacity-70 hover:opacity-100'
                        : 'bg-surface border-border hover:border-primary/20'
                }`}
        >
            {/* Collapsed State Header */}
            <div className="p-4 flex items-center gap-4">
                {/* Status Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive
                        ? 'bg-primary/10 text-primary'
                        : isCompleted
                            ? 'bg-green-500/10 text-green-600'
                            : 'bg-bg-secondary text-text-tertiary group-hover:text-text-secondary'
                    }`}>
                    {isActive ? (
                        <Sparkles className="w-4 h-4" />
                    ) : isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                    ) : (
                        <span className="text-xs font-bold">{week.weekNumber}</span>
                    )}
                </div>

                {/* Title & Theme */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className={`text-sm font-bold truncate ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                            Week {week.weekNumber}: {week.title}
                        </h3>
                        {isActive && (
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                                Active Focus
                            </span>
                        )}
                    </div>
                    {!isActive && (
                        <p className="text-xs text-text-tertiary truncate">{week.theme}</p>
                    )}
                </div>

                {/* Chevron */}
                <ChevronDown className={`w-4 h-4 text-text-tertiary transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </div>

            {/* Expanded Content (Hero) */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border"
                    >
                        <div className="p-6 pt-2">
                            {/* Theme & Description */}
                            <div className="mb-8">
                                <p className="text-lg text-text-secondary italic mb-4">"{week.theme}"</p>
                                <div className="flex gap-6 text-sm text-text-secondary">
                                    <div className="flex items-center gap-2">
                                        <Hammer className="w-4 h-4 text-orange-500" />
                                        <span className="font-mono">{week.timeBreakdown.build}h Build</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                        <span className="font-mono">{week.timeBreakdown.research}h Research</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Share2 className="w-4 h-4 text-green-500" />
                                        <span className="font-mono">{week.timeBreakdown.share}h Share</span>
                                    </div>
                                </div>
                            </div>

                            {/* Copilot Insight */}
                            <div className="mb-8 p-4 bg-gradient-to-r from-primary/5 to-transparent border-l-2 border-primary rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-text-primary mb-1">Copilot Insight</h4>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            This week is heavy on coding (18h). I recommend starting with the
                                            <span className="font-medium text-text-primary"> System Design diagram</span> to save time later.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Deliverables List */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2">Key Deliverables</h4>
                                {week.buildSection?.deliverables?.map((d: any, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-bg-secondary/50 rounded-lg hover:bg-bg-secondary transition-colors group/item">
                                        <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-border group-hover/item:border-primary/50 transition-colors" />
                                        <span className="text-sm text-text-secondary group-hover/item:text-text-primary transition-colors">
                                            {d.description}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Action Button */}
                            <div className="mt-8 flex justify-end">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm hover:shadow-md">
                                    Start Week {week.weekNumber} <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function PhaseSmartStack() {
    const [activeWeek, setActiveWeek] = useState<number>(1);
    const phase = roadmapData.phases[0];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary font-sans">
            {/* Nav */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-bg-primary/80">
                <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <span className="text-xs font-mono text-primary font-medium">CONCEPT A: SMART STACK</span>
                </div>
            </nav>

            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Phase Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                            Phase {phase.phaseNumber}
                        </span>
                        <span className="text-sm text-text-tertiary">{phase.weekRange}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">{phase.title}</h1>
                    <p className="text-lg text-text-secondary leading-relaxed">{phase.summary}</p>
                </div>

                {/* The Stack */}
                <div className="space-y-3">
                    {phase.weeks.map((week) => (
                        <SmartWeekItem
                            key={week.weekNumber}
                            week={week as unknown as Week}
                            isActive={activeWeek === week.weekNumber}
                            isCompleted={week.weekNumber < activeWeek}
                            onClick={() => setActiveWeek(week.weekNumber)}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
