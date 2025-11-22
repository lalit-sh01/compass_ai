'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, BookOpen, Hammer, Share2, MoreHorizontal, Zap, Clock, Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function PhaseCommandRail({ phase, activeIndex, totalWeeks, onNavigate }: {
    phase: any,
    activeIndex: number,
    totalWeeks: number,
    onNavigate: (direction: 'prev' | 'next') => void
}) {
    return (
        <div className="w-[400px] h-full bg-surface/80 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20 shrink-0 overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-900 to-transparent opacity-50 pointer-events-none" />

            {/* Content - overflow-hidden prevents scrolling */}
            <div className="p-6 flex flex-col h-full relative z-10 overflow-hidden">
                {/* Nav Back */}
                <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group mb-6">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="font-medium">Back to Roadmap</span>
                </Link>

                {/* Phase Context */}
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-500/20">
                            Phase {phase.phaseNumber}
                        </span>
                        <span className="text-text-tertiary text-[10px] font-medium tracking-wide uppercase">
                            {phase.weekRange}
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                        {phase.title}
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                        {phase.summary}
                    </p>
                </div>

                {/* Phase CTA */}
                <div className="mb-4">
                    <button className="w-full py-2.5 bg-gradient-to-r from-primary to-orange-500 text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
                        <Play className="w-4 h-4 fill-current" />
                        Start Phase {phase.phaseNumber}
                    </button>
                </div>

                {/* Week Navigation Controls */}
                <div className="mb-4 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Week Navigation</span>
                        <span className="text-[10px] font-mono text-gray-500">{activeIndex + 1} / {totalWeeks}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onNavigate('prev')}
                            disabled={activeIndex === 0}
                            className="flex-1 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-1.5 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-xs font-medium">Prev</span>
                        </button>
                        <button
                            onClick={() => onNavigate('next')}
                            disabled={activeIndex === totalWeeks - 1}
                            className="flex-1 py-2 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center gap-1.5 group"
                        >
                            <span className="text-xs font-medium">Next</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5 mt-auto">
                    <div>
                        <div className="text-xl font-bold text-white">25%</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Complete</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-white">120h</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Total Time</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BridgeCard({ week, index, activeIndex, onClick }: { week: any, index: number, activeIndex: number, onClick: () => void }) {
    const offset = index - activeIndex;
    const isActive = offset === 0;

    // Calculate target position
    let targetLeft = 0;
    let targetScale = 1;
    let targetOpacity = 1;
    let targetBlur = 0;
    let zIndex = 0;

    if (isActive) {
        targetLeft = 350; // Bridge Position (Overlaps Rail)
        targetScale = 1;
        targetOpacity = 1;
        targetBlur = 0;
        zIndex = 10;
    } else if (offset > 0) {
        targetLeft = 1100 + (offset - 1) * 340; // Stream Position
        targetScale = 0.9;
        targetOpacity = 0.5;
        targetBlur = 2;
        zIndex = 5 - offset;
    } else {
        targetLeft = -1000; // Past (Off-screen)
        targetOpacity = 0;
        zIndex = 0;
    }

    return (
        <motion.div
            layout
            onClick={onClick}
            initial={false}
            animate={{
                left: targetLeft,
                scale: targetScale,
                opacity: targetOpacity,
                filter: `blur(${targetBlur}px)`,
                zIndex: zIndex
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
            }}
            className={`absolute top-1/2 -translate-y-1/2 cursor-pointer
                ${isActive
                    ? 'w-[700px] h-[500px]'
                    : 'w-[300px] h-[400px] hover:opacity-80 hover:blur-0'
                }
            `}
        >
            <div className={`w-full h-full rounded-3xl overflow-hidden border transition-all duration-500
                ${isActive
                    ? 'bg-surface shadow-2xl shadow-black/50 border-white/10 ring-1 ring-white/10'
                    : 'bg-surface/40 border-transparent'
                }
            `}>
                {/* Active Content */}
                {isActive && (
                    <div className="h-full flex flex-col p-10 relative">
                        {/* Glow Effect */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 relative z-10">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/20">
                                    Week {week.weekNumber}
                                </span>
                                <span className="flex items-center gap-2 text-xs font-bold text-orange-500 uppercase tracking-widest">
                                    <Play className="w-3 h-3 fill-current" /> Current Focus
                                </span>
                            </div>
                            <button className="p-2 hover:bg-bg-secondary rounded-full transition-colors">
                                <MoreHorizontal className="w-5 h-5 text-text-tertiary" />
                            </button>
                        </div>

                        {/* Title */}
                        <div className="mb-10 relative z-10">
                            <h2 className="text-5xl font-bold text-text-primary mb-3 leading-tight">
                                {week.title}
                            </h2>
                            <p className="text-xl text-text-secondary font-medium">
                                "{week.theme}"
                            </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-8 mb-auto relative z-10">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">
                                    <Hammer className="w-4 h-4" /> Build Goal
                                </div>
                                <div className="text-base font-medium text-text-primary p-4 bg-bg-secondary/50 rounded-xl border border-border/50">
                                    {week.buildSection?.projectTitle || "Core Implementation"}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">
                                    <BookOpen className="w-4 h-4" /> Top Resource
                                </div>
                                <div className="text-base font-medium text-text-primary p-4 bg-bg-secondary/50 rounded-xl border border-border/50">
                                    {week.researchSection?.deepDiveTopics?.[0]?.description || "System Design"}
                                </div>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="flex items-center justify-between pt-8 border-t border-border/50 relative z-10">
                            <div className="flex items-center gap-2 text-text-tertiary">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">{week.totalHours}h Estimated</span>
                            </div>
                            <button className="px-8 py-4 bg-primary text-on-primary font-bold text-lg rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center gap-3 group">
                                Start Week {week.weekNumber}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Inactive Preview */}
                {!isActive && (
                    <div className="h-full p-8 flex flex-col justify-end relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="relative z-10">
                            <span className="text-xs font-mono text-white/60 uppercase tracking-widest mb-2 block">
                                Week {week.weekNumber}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                                {week.title}
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function IntegratedHorizonPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const phase = roadmapData.phases[0];

    const handleNavigate = (direction: 'prev' | 'next') => {
        if (direction === 'prev' && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        } else if (direction === 'next' && activeIndex < phase.weeks.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    return (
        <div className="h-screen w-screen bg-[#0F1115] text-text-primary font-sans overflow-hidden flex">

            {/* 1. Phase Command Rail (Left) */}
            <PhaseCommandRail
                phase={phase}
                activeIndex={activeIndex}
                totalWeeks={phase.weeks.length}
                onNavigate={handleNavigate}
            />

            {/* 2. Journey Stream (Right) */}
            <div className="flex-1 relative bg-bg-primary">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #2a2d35 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Horizon Line */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-orange-500/50 via-border to-transparent" />

                {/* 3. The Bridge (Cards) */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="relative w-full h-full">
                        {phase.weeks.map((week, index) => (
                            <BridgeCard
                                key={week.weekNumber}
                                week={week}
                                index={index}
                                activeIndex={activeIndex}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
