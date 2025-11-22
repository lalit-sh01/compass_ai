'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Play, BookOpen, CheckCircle2, Zap, Clock, ArrowUpRight, MoreHorizontal, Database, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function CarouselCard({
    week,
    isActive,
    onClick
}: {
    week: any;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.div
            onClick={onClick}
            animate={{
                scale: isActive ? 1 : 0.9,
                opacity: isActive ? 1 : 0.6,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative shrink-0 w-[280px] md:w-[320px] h-[400px] rounded-2xl overflow-hidden cursor-pointer border transition-colors ${isActive ? 'border-primary/30 shadow-xl ring-1 ring-primary/10' : 'border-border hover:border-primary/20'
                }`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b ${isActive ? 'from-bg-secondary/80 to-surface' : 'from-bg-secondary/30 to-bg-primary'
                }`} />

            <div className="relative h-full p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <span className={`text-xs font-mono uppercase tracking-widest ${isActive ? 'text-primary' : 'text-text-tertiary'}`}>
                        Week {week.weekNumber}
                    </span>
                    {week.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>

                <div className="mt-auto mb-8">
                    <h3 className={`text-2xl font-bold mb-2 leading-tight ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                        {week.title}
                    </h3>
                    <p className="text-sm text-text-tertiary line-clamp-3">
                        {week.theme}
                    </p>
                </div>

                {isActive && (
                    <motion.div
                        layoutId="active-indicator"
                        className="h-1 w-12 bg-primary rounded-full"
                    />
                )}
            </div>
        </motion.div>
    );
}

function DetailGrid({ week }: { week: any }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
        >
            {/* 1. Hero Stats (Span 4) */}
            <div className="md:col-span-4 space-y-4">
                <div className="p-6 bg-surface rounded-2xl border border-border">
                    <div className="text-xs text-text-tertiary uppercase font-bold mb-4">Time Allocation</div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Database className="w-4 h-4" /> Build
                            </div>
                            <span className="font-mono font-medium text-text-primary">{week.timeBreakdown.build}h</span>
                        </div>
                        <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(week.timeBreakdown.build / week.totalHours) * 100}%` }} />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <Globe className="w-4 h-4" /> Research
                            </div>
                            <span className="font-mono font-medium text-text-primary">{week.timeBreakdown.research}h</span>
                        </div>
                        <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(week.timeBreakdown.research / week.totalHours) * 100}%` }} />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-primary/5 to-surface rounded-2xl border border-primary/10">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">AI Insight</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                        "Based on your learning style, I've prioritized the <span className="font-medium text-text-primary">System Design</span> module. It has the highest complexity score this week."
                    </p>
                </div>
            </div>

            {/* 2. Main Deliverables (Span 8) */}
            <div className="md:col-span-8 p-6 bg-surface rounded-2xl border border-border flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-text-primary">Key Deliverables</h3>
                    <button className="text-sm text-primary hover:underline">View All</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {week.buildSection?.deliverables?.slice(0, 4).map((d: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl bg-bg-secondary/30 border border-border hover:border-primary/30 transition-colors group cursor-pointer">
                            <div className="flex items-start gap-3">
                                <div className={`mt-1 w-4 h-4 rounded-full border-2 ${d.isCompleted ? 'bg-green-500 border-green-500' : 'border-text-tertiary group-hover:border-primary'}`} />
                                <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors line-clamp-2">
                                    {d.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-6 flex justify-end">
                    <button className="px-6 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-2">
                        Start Week {week.weekNumber} <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function PhaseHybrid() {
    const [activeIndex, setActiveIndex] = useState(0);
    const phase = roadmapData.phases[0];
    const activeWeek = phase.weeks[activeIndex];

    return (
        <div className="min-h-screen bg-bg-primary text-text-primary font-sans flex flex-col">
            {/* Nav */}
            <nav className="h-16 px-6 md:px-12 flex items-center justify-between border-b border-border bg-bg-primary/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
                <span className="text-xs font-mono text-primary font-medium">CONCEPT D: CINEMATIC DASHBOARD</span>
            </nav>

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Section: Carousel (The Stream) */}
                {/* Good Whitespace: Padding around the carousel to let it breathe */}
                <div className="h-[55vh] min-h-[450px] bg-bg-secondary/30 border-b border-border flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary/50 pointer-events-none" />

                    <div className="w-full overflow-x-auto no-scrollbar pl-[10vw] pr-12 py-8 flex items-center gap-6 snap-x snap-mandatory">
                        {phase.weeks.map((week, index) => (
                            <div key={week.weekNumber} className="snap-center">
                                <CarouselCard
                                    week={week}
                                    isActive={index === activeIndex}
                                    onClick={() => setActiveIndex(index)}
                                />
                            </div>
                        ))}
                        <div className="w-[10vw] shrink-0" /> {/* Spacer */}
                    </div>
                </div>

                {/* Bottom Section: Context Grid (The Details) */}
                {/* Good Whitespace: Container padding. Bad Whitespace: Avoided by using dense grid. */}
                <div className="flex-1 bg-bg-primary relative z-10">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12 -mt-12">
                        <AnimatePresence mode="wait">
                            <DetailGrid key={activeWeek.weekNumber} week={activeWeek} />
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
