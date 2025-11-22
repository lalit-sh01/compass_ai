'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Target, Clock, BookOpen, Code, Share2, ChevronRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Types ---
// (Simplified for the experiment)
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

interface Phase {
    phaseNumber: number;
    title: string;
    summary: string;
    weekRange: string;
    weeks: Week[];
}

// --- Components ---

function PhaseHeader({ phase }: { phase: Phase }) {
    return (
        <div className="relative mb-12 p-8 rounded-2xl overflow-hidden">
            {/* Glass Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/10" />

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
                        Phase {phase.phaseNumber}
                    </span>
                    <span className="text-sm text-gray-400 font-mono">{phase.weekRange}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {phase.title}
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                    {phase.summary}
                </p>
            </div>

            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </div>
    );
}

function WeekNode({ week, isActive, onClick, isLast }: { week: Week; isActive: boolean; onClick: () => void; isLast: boolean }) {
    return (
        <div className="relative pl-12 md:pl-24 pb-12">
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-[19px] md:left-[43px] top-12 bottom-0 w-0.5 bg-gray-800">
                    <motion.div
                        className="w-full bg-blue-500 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isActive ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            )}

            {/* Timeline Dot */}
            <button
                onClick={onClick}
                className={`absolute left-0 md:left-6 top-1 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 z-10 ${isActive
                        ? 'bg-gray-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110'
                        : 'bg-gray-900 border-gray-700 hover:border-gray-500'
                    }`}
            >
                <span className={`text-sm font-bold ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                    {week.weekNumber}
                </span>
            </button>

            {/* Content Card */}
            <motion.div
                layout
                onClick={onClick}
                className={`group relative rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                        ? 'bg-gray-900/80 border-blue-500/50 shadow-2xl ring-1 ring-blue-500/20'
                        : 'bg-gray-900/40 border-gray-800 hover:bg-gray-900/60 hover:border-gray-700'
                    }`}
            >
                {/* Card Header */}
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                {week.title}
                            </h3>
                            <p className="text-gray-400 text-sm italic">{week.theme}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total</div>
                                <div className="font-mono text-sm text-gray-300">{week.totalHours}h</div>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Mini Stats (Always Visible) */}
                    {!isActive && (
                        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-800/50">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Code className="w-3 h-3" /> {week.timeBreakdown.build}h Build
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <BookOpen className="w-3 h-3" /> {week.timeBreakdown.research}h Research
                            </div>
                        </div>
                    )}
                </div>

                {/* Expanded Content (Bento Grid) */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-800"
                        >
                            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4">

                                {/* Build Card (Large) */}
                                <div className="md:col-span-8 bg-blue-500/5 rounded-lg p-5 border border-blue-500/10">
                                    <div className="flex items-center gap-2 mb-3 text-blue-400">
                                        <Code className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Build Focus</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">{week.buildSection?.projectTitle}</h4>
                                    <p className="text-sm text-gray-400 mb-4">{week.buildSection?.description}</p>

                                    <div className="space-y-2">
                                        {week.buildSection?.deliverables?.slice(0, 2).map((d: any, i: number) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                                {d.description}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats Column */}
                                <div className="md:col-span-4 space-y-4">
                                    {/* Research Card */}
                                    <div className="bg-purple-500/5 rounded-lg p-4 border border-purple-500/10">
                                        <div className="flex items-center gap-2 mb-2 text-purple-400">
                                            <BookOpen className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Deep Dives</span>
                                        </div>
                                        <div className="text-sm text-gray-300">
                                            {week.researchSection?.deepDiveTopics?.length || 0} Topics
                                        </div>
                                    </div>

                                    {/* Share Card */}
                                    <div className="bg-green-500/5 rounded-lg p-4 border border-green-500/10">
                                        <div className="flex items-center gap-2 mb-2 text-green-400">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Artifact</span>
                                        </div>
                                        <div className="text-sm text-gray-300 truncate">
                                            {week.shareSection?.artifactTitle}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="md:col-span-12 flex justify-end pt-2">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors">
                                        View Week Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default function PhaseRedesignPage() {
    const [activeWeek, setActiveWeek] = useState<number | null>(1);

    // Use the first phase from the JSON
    const phase = roadmapData.phases[0];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans selection:bg-blue-500/30">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-[#0A0A0A]/80">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/viewer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Overview
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-gray-500">PROTOTYPE MODE</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <PhaseHeader phase={phase as unknown as Phase} />

                <div className="mt-16">
                    <div className="flex items-center gap-2 mb-8 text-gray-500 text-sm font-mono uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        Timeline
                    </div>

                    <div className="relative">
                        {phase.weeks.map((week, index) => (
                            <WeekNode
                                key={week.weekNumber}
                                week={week as unknown as Week}
                                isActive={activeWeek === week.weekNumber}
                                onClick={() => setActiveWeek(activeWeek === week.weekNumber ? null : week.weekNumber)}
                                isLast={index === phase.weeks.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
