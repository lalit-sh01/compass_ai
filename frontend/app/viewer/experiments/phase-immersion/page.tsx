'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ChevronRight, ChevronLeft, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Components ---

function ImmersionCard({
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
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
            }}
            transition={{ duration: 0.4 }}
            className={`relative min-w-[80vw] md:min-w-[600px] h-[70vh] rounded-3xl overflow-hidden cursor-pointer border ${isActive ? 'border-primary/20 shadow-2xl' : 'border-transparent'
                }`}
        >
            {/* Background Image/Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${isActive ? 'from-surface to-bg-secondary' : 'from-bg-secondary to-bg-primary'
                }`} />

            {/* Content */}
            <div className="relative h-full p-8 md:p-12 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-mono text-text-tertiary uppercase tracking-widest">
                        Week {week.weekNumber}
                    </span>
                    {isActive && (
                        <div className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                            ACTIVE
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="mb-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 leading-tight">
                        {week.title}
                    </h2>
                    <p className="text-xl text-text-secondary font-medium">
                        {week.theme}
                    </p>
                </div>

                {/* Daily Briefing (AI Feature) */}
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 p-6 bg-surface/80 backdrop-blur-md rounded-2xl border border-border shadow-sm"
                    >
                        <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">
                            Daily Briefing
                        </h3>
                        <p className="text-text-primary text-lg leading-relaxed">
                            "Good morning. Today is about <span className="font-semibold text-primary">Architecture</span>.
                            Review the 'System Design' chapter before starting your diagram. You have 4 hours blocked."
                        </p>
                    </motion.div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center gap-4">
                    <button className="flex-1 py-4 bg-primary text-on-primary font-bold text-lg rounded-xl hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                        <Play className="w-5 h-5 fill-current" /> Start Session
                    </button>
                    <button className="p-4 bg-surface border border-border rounded-xl hover:bg-bg-secondary transition-colors">
                        <BookOpen className="w-6 h-6 text-text-secondary" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function PhaseImmersion() {
    const [activeIndex, setActiveIndex] = useState(0);
    const phase = roadmapData.phases[0];
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollTo = (index: number) => {
        setActiveIndex(index);
        // In a real implementation, we'd use scrollIntoView or similar
    };

    return (
        <div className="h-screen bg-bg-primary text-text-primary font-sans overflow-hidden flex flex-col">
            {/* Nav */}
            <nav className="h-16 px-6 flex items-center justify-between border-b border-border">
                <Link href="/viewer" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
                <span className="text-xs font-mono text-primary font-medium">CONCEPT C: IMMERSION DECK</span>
            </nav>

            {/* Carousel Area */}
            <main className="flex-1 flex items-center overflow-x-hidden">
                <div
                    className="flex items-center gap-8 px-[10vw] transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${activeIndex * 600}px)` }} // Simplified logic for prototype
                >
                    {phase.weeks.map((week, index) => (
                        <ImmersionCard
                            key={week.weekNumber}
                            week={week}
                            isActive={index === activeIndex}
                            onClick={() => scrollTo(index)}
                        />
                    ))}
                </div>
            </main>

            {/* Controls */}
            <div className="h-24 border-t border-border flex items-center justify-center gap-8">
                <button
                    onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="p-3 rounded-full hover:bg-bg-secondary disabled:opacity-30 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-2">
                    {phase.weeks.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${i === activeIndex ? 'bg-primary' : 'bg-border'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setActiveIndex(Math.min(phase.weeks.length - 1, activeIndex + 1))}
                    disabled={activeIndex === phase.weeks.length - 1}
                    className="p-3 rounded-full hover:bg-bg-secondary disabled:opacity-30 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
