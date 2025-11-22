'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Lock, Star, Trophy, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Types ---
interface Week {
    weekNumber: number;
    title: string;
    theme: string;
    totalHours: number;
    status: string;
}

interface Phase {
    phaseNumber: number;
    title: string;
    summary: string;
    weekRange: string;
    weeks: Week[];
}

// --- Components ---

function JourneyNode({ week, index, isLast, isActive, isCompleted, onClick }: {
    week: Week;
    index: number;
    isLast: boolean;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}) {
    return (
        <div className="relative pl-24 pb-16 group">
            {/* Connecting Line */}
            {!isLast && (
                <div className="absolute left-[43px] top-14 bottom-0 w-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    />
                </div>
            )}

            {/* Node Icon */}
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute left-6 top-2 w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-300 ${isActive
                        ? 'bg-gray-900 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)] scale-110'
                        : isCompleted
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-500'
                    }`}
            >
                {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                ) : isActive ? (
                    <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                ) : (
                    <span className="text-sm font-bold">{week.weekNumber}</span>
                )}
            </motion.button>

            {/* Content Card */}
            <motion.div
                onClick={onClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${isActive
                        ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/50 shadow-lg ring-1 ring-blue-500/20'
                        : 'bg-gray-900/40 border-gray-800 hover:bg-gray-900/60 hover:border-gray-600'
                    }`}
            >
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                        Week {week.weekNumber}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{week.totalHours}h</span>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {week.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {week.theme}
                </p>

                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex items-center gap-4 pt-4 border-t border-white/10"
                    >
                        <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors">
                            Start Week
                        </button>
                        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors">
                            Details
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default function PhaseRedesignA() {
    const [activeWeek, setActiveWeek] = useState<number>(1);
    const phase = roadmapData.phases[0];

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans">
            {/* Nav */}
            <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-[#050505]/80">
                <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/viewer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <span className="text-xs font-mono text-blue-500">OPTION A: JOURNEY STREAM</span>
                </div>
            </nav>

            <main className="max-w-3xl mx-auto px-6 py-12">
                {/* Phase Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 mb-6 shadow-lg shadow-blue-500/20"
                    >
                        <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white mb-4">{phase.title}</h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">{phase.summary}</p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {phase.weeks.map((week, index) => (
                        <JourneyNode
                            key={week.weekNumber}
                            week={week as unknown as Week}
                            index={index}
                            isLast={index === phase.weeks.length - 1}
                            isActive={activeWeek === week.weekNumber}
                            isCompleted={week.weekNumber < activeWeek}
                            onClick={() => setActiveWeek(week.weekNumber)}
                        />
                    ))}

                    {/* Future/Locked State Example */}
                    <div className="relative pl-24 pb-12 opacity-50 grayscale">
                        <div className="absolute left-6 top-2 w-10 h-10 rounded-full border-4 border-gray-800 bg-gray-900 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-gray-600" />
                        </div>
                        <div className="p-6 rounded-2xl border border-gray-800 bg-gray-900/20">
                            <div className="h-4 w-24 bg-gray-800 rounded mb-4" />
                            <div className="h-6 w-48 bg-gray-800 rounded mb-2" />
                            <div className="h-4 w-full bg-gray-800 rounded" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
