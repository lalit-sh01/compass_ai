'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Sparkles, BookOpen, Hammer, Share2, ArrowRight, Database, Globe, Zap, Clock, ChevronRight, Layout } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function TimelineNode({
    week,
    isActive,
    isCompleted,
    onClick
}: {
    week: any;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`group relative flex-1 h-full flex flex-col items-center justify-center gap-2 transition-all ${isActive ? 'bg-surface border-b-2 border-primary' : 'hover:bg-bg-secondary/50 border-b-2 border-transparent'
                }`}
        >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20'
                    : isCompleted
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-bg-secondary text-text-tertiary group-hover:text-text-secondary'
                }`}>
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{week.weekNumber}</span>}
            </div>

            <div className="text-center hidden md:block">
                <div className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-text-tertiary'}`}>
                    Week {week.weekNumber}
                </div>
                {isActive && (
                    <motion.div layoutId="active-label" className="text-[10px] text-text-secondary truncate max-w-[100px]">
                        {week.title}
                    </motion.div>
                )}
            </div>
        </button>
    );
}

function CockpitDashboard({ week }: { week: any }) {
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
                    "This week shifts focus to <span className="font-semibold">System Design</span>.
                    I've analyzed the curriculum: spend 60% of your time on the Architecture Diagram deliverable.
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

export default function PhaseSplitCommand() {
    const [activeIndex, setActiveIndex] = useState(0);
    const phase = roadmapData.phases[0];
    const activeWeek = phase.weeks[activeIndex];

    return (
        <div className="h-screen bg-bg-secondary/30 text-text-primary font-sans flex flex-col overflow-hidden">
            {/* 1. Top Navigation Bar (The Stream) - Fixed Height */}
            <header className="h-24 bg-surface border-b border-border flex shrink-0 z-20 relative shadow-sm">
                <div className="w-64 border-r border-border flex items-center px-6 bg-bg-primary">
                    <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-bold tracking-tight">Phase {phase.phaseNumber}</span>
                    </Link>
                </div>
                <div className="flex-1 flex overflow-x-auto no-scrollbar">
                    {phase.weeks.map((week, index) => (
                        <TimelineNode
                            key={week.weekNumber}
                            week={week}
                            isActive={index === activeIndex}
                            isCompleted={index < activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </header>

            {/* 2. Main Content Area (The Cockpit) - Fills remaining space */}
            <main className="flex-1 relative overflow-hidden bg-bg-secondary/30">
                <AnimatePresence mode="wait">
                    <CockpitDashboard key={activeWeek.weekNumber} week={activeWeek} />
                </AnimatePresence>
            </main>
        </div>
    );
}
