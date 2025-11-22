'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Zap, Clock, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function CanvasCard({
    children,
    className = "",
    priority = "normal"
}: {
    children: React.ReactNode;
    className?: string;
    priority?: "normal" | "high" | "completed"
}) {
    return (
        <motion.div
            layout
            className={`relative p-6 rounded-2xl border transition-all hover:shadow-md ${priority === "high"
                    ? 'bg-surface border-primary/30 shadow-lg ring-1 ring-primary/10'
                    : priority === "completed"
                        ? 'bg-bg-secondary/30 border-border opacity-60 hover:opacity-100'
                        : 'bg-surface border-border hover:border-primary/20'
                } ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function PhaseCanvas() {
    const phase = roadmapData.phases[0];
    const currentWeek = phase.weeks[0]; // Week 1 is current

    return (
        <div className="min-h-screen bg-bg-secondary/30 text-text-primary font-sans">
            {/* Nav */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-border bg-bg-primary/80">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <span className="text-xs font-mono text-primary font-medium">CONCEPT B: PHASE CANVAS</span>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <header className="mb-10 flex items-end justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary mb-2">{phase.title}</h1>
                        <p className="text-text-secondary max-w-2xl">{phase.summary}</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
                            <span className="text-text-secondary">Velocity:</span> <span className="text-green-600">On Track</span>
                        </div>
                        <div className="px-4 py-2 bg-surface rounded-lg border border-border text-sm font-medium">
                            <span className="text-text-secondary">Progress:</span> <span className="text-text-primary">12%</span>
                        </div>
                    </div>
                </header>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. Current Week (Hero - 2x2) */}
                    <CanvasCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between" priority="high">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-full">
                                    CURRENT FOCUS
                                </span>
                                <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                                    <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
                                </button>
                            </div>

                            <h2 className="text-3xl font-bold text-text-primary mb-3">
                                Week {currentWeek.weekNumber}: {currentWeek.title}
                            </h2>
                            <p className="text-lg text-text-secondary italic mb-6">
                                "{currentWeek.theme}"
                            </p>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-4 bg-bg-secondary/50 rounded-xl">
                                    <div className="text-xs text-text-tertiary uppercase font-bold mb-1">Build Goal</div>
                                    <div className="text-sm font-medium text-text-primary line-clamp-2">
                                        {currentWeek.buildSection?.projectTitle}
                                    </div>
                                </div>
                                <div className="p-4 bg-bg-secondary/50 rounded-xl">
                                    <div className="text-xs text-text-tertiary uppercase font-bold mb-1">Top Resource</div>
                                    <div className="text-sm font-medium text-text-primary line-clamp-2">
                                        {currentWeek.researchSection?.deepDiveTopics?.[0]?.description}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm">
                                Continue Week {currentWeek.weekNumber}
                            </button>
                        </div>
                    </CanvasCard>

                    {/* 2. AI Insight (1x1) */}
                    <CanvasCard className="bg-gradient-to-br from-primary/5 to-surface">
                        <div className="flex items-center gap-2 mb-3 text-primary">
                            <Zap className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase">AI Insight</span>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            You're moving 15% faster than average on Research tasks. Consider allocating more time to the <span className="font-medium text-text-primary">System Design</span> deliverable this week.
                        </p>
                    </CanvasCard>

                    {/* 3. Next Up (Week 2 - 1x1) */}
                    <CanvasCard className="group cursor-pointer hover:border-primary/30">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-text-tertiary">NEXT UP</span>
                            <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                            {phase.weeks[1].title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Clock className="w-3 h-3" />
                            {phase.weeks[1].totalHours}h Estimated
                        </div>
                    </CanvasCard>

                    {/* 4. Future (Week 3 - 1x1) */}
                    <CanvasCard className="group cursor-pointer hover:border-primary/30">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-text-tertiary">WEEK {phase.weeks[2].weekNumber}</span>
                            <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                            {phase.weeks[2].title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Clock className="w-3 h-3" />
                            {phase.weeks[2].totalHours}h Estimated
                        </div>
                    </CanvasCard>

                    {/* 5. Future (Week 4 - 1x1) */}
                    <CanvasCard className="group cursor-pointer hover:border-primary/30">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-text-tertiary">WEEK {phase.weeks[3].weekNumber}</span>
                            <ArrowUpRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2">
                            {phase.weeks[3].title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-text-secondary">
                            <Clock className="w-3 h-3" />
                            {phase.weeks[3].totalHours}h Estimated
                        </div>
                    </CanvasCard>

                </div>
            </main>
        </div>
    );
}
