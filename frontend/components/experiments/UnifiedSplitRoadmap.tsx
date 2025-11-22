'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Sparkles, BookOpen, Hammer, Share2, ArrowRight, Database, Globe, Zap, Clock, ChevronRight, Layout, Layers } from 'lucide-react';
import Link from 'next/link';
import { Roadmap, Phase, Week } from '@/lib/types';
import { cn } from '@/lib/utils';

// --- Sub-Components (Adapted from phase-split-command) ---

function PhaseTab({
    phase,
    isActive,
    onClick
}: {
    phase: Phase;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative px-6 py-3 text-sm font-bold transition-all rounded-t-xl border-b-2",
                isActive
                    ? "text-primary border-primary bg-surface"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/50"
            )}
        >
            <div className="flex items-center gap-2">
                <span className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full text-[10px]",
                    isActive ? "bg-primary/10 text-primary" : "bg-bg-secondary text-text-tertiary"
                )}>
                    {phase.phaseNumber}
                </span>
                <span>{phase.title}</span>
            </div>
            {isActive && (
                <motion.div
                    layoutId="active-phase-tab"
                    className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary"
                />
            )}
        </button>
    );
}

function TimelineNode({
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
        <button
            onClick={onClick}
            className={cn(
                "group relative flex-none w-32 md:w-48 h-full flex flex-col items-center justify-center gap-2 transition-all border-b-2",
                isActive
                    ? "bg-surface border-primary"
                    : "hover:bg-bg-secondary/50 border-transparent"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                isActive
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                    : isCompleted
                        ? "bg-green-500/10 text-green-600"
                        : "bg-bg-secondary text-text-tertiary group-hover:text-text-secondary"
            )}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{week.weekNumber}</span>}
            </div>

            <div className="text-center">
                <div className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    isActive ? "text-primary" : "text-text-tertiary"
                )}>
                    Week {week.weekNumber}
                </div>
                {isActive && (
                    <motion.div
                        layoutId="active-week-label"
                        className="text-[10px] text-text-secondary truncate max-w-[100px] mx-auto"
                    >
                        {week.title}
                    </motion.div>
                )}
            </div>
        </button>
    );
}

function CockpitDashboard({ week }: { week: Week }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 overflow-y-auto"
        >
            {/* 1. Header & Context (Span 12) */}
            <div className="lg:col-span-12 flex items-start justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-text-primary mb-2">{week.title}</h2>
                    <p className="text-lg text-text-secondary italic">"{week.theme}"</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-xs text-text-tertiary uppercase font-bold">Total Time</div>
                        <div className="text-xl font-mono font-bold text-text-primary">{week.totalHours}h</div>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <button className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                        Start Week <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* 2. AI Insight (Span 4) */}
            <div className="lg:col-span-4 p-6 bg-gradient-to-br from-primary/5 to-surface rounded-2xl border border-primary/10 shadow-sm">
                <div className="flex items-center gap-2 mb-4 text-primary">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Copilot Briefing</span>
                </div>
                <p className="text-text-primary leading-relaxed mb-4">
                    "This week shifts focus to <span className="font-semibold">{week.theme}</span>.
                    I've analyzed the curriculum: spend 60% of your time on the main deliverable.
                    It's the highest-value artifact for your portfolio."
                </p>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-bg-primary rounded text-xs font-mono text-text-secondary border border-border">High Complexity</span>
                    <span className="px-2 py-1 bg-bg-primary rounded text-xs font-mono text-text-secondary border border-border">Design Heavy</span>
                </div>
            </div>

            {/* 3. Stats Grid (Span 8) */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-4">
                <div className="p-5 bg-surface rounded-2xl border border-border flex flex-col justify-between hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                        <Database className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Build</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-text-primary">{week.timeBreakdown.build}h</div>
                    <div className="w-full bg-bg-secondary h-1 rounded-full mt-2">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }} />
                    </div>
                </div>
                <div className="p-5 bg-surface rounded-2xl border border-border flex flex-col justify-between hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                        <Globe className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Research</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-text-primary">{week.timeBreakdown.research}h</div>
                    <div className="w-full bg-bg-secondary h-1 rounded-full mt-2">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '30%' }} />
                    </div>
                </div>
                <div className="p-5 bg-surface rounded-2xl border border-border flex flex-col justify-between hover:border-primary/20 transition-colors">
                    <div className="flex items-center gap-2 text-text-secondary mb-2">
                        <Share2 className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Share</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-text-primary">{week.timeBreakdown.share}h</div>
                    <div className="w-full bg-bg-secondary h-1 rounded-full mt-2">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '20%' }} />
                    </div>
                </div>
            </div>

            {/* 4. Deliverables (Span 8) */}
            <div className="lg:col-span-8 p-6 bg-surface rounded-2xl border border-border">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-text-tertiary" /> Key Deliverables
                    </h3>
                    <span className="text-xs font-mono text-text-tertiary">0/{week.buildSection?.deliverables?.length || 0} COMPLETED</span>
                </div>
                <div className="space-y-3">
                    {week.buildSection?.deliverables?.map((d: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-bg-secondary/30 rounded-xl border border-border hover:border-primary/30 transition-colors group cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border-2 ${d.isCompleted ? 'bg-green-500 border-green-500' : 'border-text-tertiary group-hover:border-primary'}`} />
                            <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                                {d.description}
                            </span>
                            <ChevronRight className="w-4 h-4 text-text-tertiary ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. Resources (Span 4) */}
            <div className="lg:col-span-4 p-6 bg-surface rounded-2xl border border-border">
                <h3 className="font-bold text-text-primary mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-text-tertiary" /> Top Resources
                </h3>
                <div className="space-y-4">
                    {week.researchSection?.deepDiveTopics?.[0]?.suggestedResources?.slice(0, 3).map((r: any, i: number) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="text-xs font-bold text-primary uppercase mb-1">{r.type}</div>
                            <div className="text-sm font-medium text-text-primary group-hover:underline line-clamp-2 mb-1">
                                {r.title}
                            </div>
                            <div className="h-px w-full bg-border mt-3 group-last:hidden" />
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}

// --- Main Component ---

interface UnifiedSplitRoadmapProps {
    roadmap: Roadmap;
}

export default function UnifiedSplitRoadmap({ roadmap }: UnifiedSplitRoadmapProps) {
    const [selectedPhaseId, setSelectedPhaseId] = useState<number>(roadmap.phases[0].phaseNumber);
    const [selectedWeekId, setSelectedWeekId] = useState<number>(roadmap.phases[0].weeks[0].weekNumber);

    const selectedPhase = roadmap.phases.find(p => p.phaseNumber === selectedPhaseId) || roadmap.phases[0];
    const selectedWeek = selectedPhase.weeks.find(w => w.weekNumber === selectedWeekId) || selectedPhase.weeks[0];

    // When phase changes, default to first week of that phase
    useEffect(() => {
        const firstWeekOfPhase = selectedPhase.weeks[0];
        if (firstWeekOfPhase) {
            setSelectedWeekId(firstWeekOfPhase.weekNumber);
        }
    }, [selectedPhaseId, selectedPhase]);

    return (
        <div className="h-screen bg-bg-secondary/30 text-text-primary font-sans flex flex-col overflow-hidden">

            {/* Level 1: Phase Tabs */}
            <div className="bg-surface border-b border-border shrink-0 z-30">
                <div className="flex items-center px-4">
                    <Link href="/viewer" className="mr-6 p-2 text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {roadmap.phases.map((phase) => (
                            <PhaseTab
                                key={phase.phaseNumber}
                                phase={phase}
                                isActive={selectedPhaseId === phase.phaseNumber}
                                onClick={() => setSelectedPhaseId(phase.phaseNumber)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Level 2: Week Stream */}
            <div className="h-24 bg-surface/50 border-b border-border flex shrink-0 z-20 relative shadow-sm backdrop-blur-sm">
                <div className="w-64 border-r border-border flex items-center px-6 bg-bg-primary/50">
                    <div>
                        <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Current Phase</div>
                        <div className="font-bold text-text-primary">{selectedPhase.title}</div>
                        <div className="text-xs text-text-secondary">{selectedPhase.weekRange}</div>
                    </div>
                </div>
                <div className="flex-1 flex overflow-x-auto no-scrollbar">
                    {selectedPhase.weeks.map((week) => (
                        <TimelineNode
                            key={week.weekNumber}
                            week={week}
                            isActive={selectedWeekId === week.weekNumber}
                            isCompleted={week.weekNumber < selectedWeekId}
                            onClick={() => setSelectedWeekId(week.weekNumber)}
                        />
                    ))}
                </div>
            </div>

            {/* Level 3: Cockpit Dashboard */}
            <main className="flex-1 relative overflow-hidden bg-bg-secondary/30">
                <AnimatePresence mode="wait">
                    <CockpitDashboard key={selectedWeek.weekNumber} week={selectedWeek} />
                </AnimatePresence>
            </main>
        </div>
    );
}
