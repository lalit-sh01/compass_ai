'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, CheckCircle2, Circle, ArrowLeft, Sparkles, Hammer, BookOpen, Share2, ArrowRight } from 'lucide-react';
import { Roadmap, Phase, Week } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VerticalStackRoadmapProps {
    roadmap: Roadmap;
}

export default function VerticalStackRoadmap({ roadmap }: VerticalStackRoadmapProps) {
    const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
    const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);

    const selectedPhase = roadmap.phases.find(p => p.phaseNumber === selectedPhaseId);
    const selectedWeek = selectedPhase?.weeks.find(w => w.weekNumber === selectedWeekId);

    const handlePhaseClick = (phaseId: number) => {
        setSelectedPhaseId(phaseId);
        setSelectedWeekId(null);
    };

    const handleWeekClick = (weekId: number) => {
        setSelectedWeekId(weekId);
    };

    const resetToPhases = () => {
        setSelectedPhaseId(null);
        setSelectedWeekId(null);
    };

    const resetToWeeks = () => {
        setSelectedWeekId(null);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col gap-6 font-sans text-text-primary">

            {/* Top Level Header */}
            <AnimatePresence>
                {!selectedPhaseId && (
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-4 text-center py-8"
                    >
                        <h1 className="text-4xl font-bold text-text-primary mb-3 tracking-tight">{roadmap.title}</h1>
                        <p className="text-lg text-text-secondary">{roadmap.goal}</p>
                    </motion.header>
                )}
            </AnimatePresence>

            {/* Sticky Phase Header (The "Shrunk" Phase) */}
            <AnimatePresence>
                {selectedPhaseId && selectedPhase && (
                    <motion.div
                        layoutId={`phase-card-${selectedPhase.phaseNumber}`}
                        className="sticky top-6 z-30"
                    >
                        <div
                            onClick={resetToPhases}
                            className="bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-xl p-4 shadow-lg cursor-pointer hover:border-primary/50 transition-colors group ring-1 ring-black/5 dark:ring-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="p-2 rounded-full bg-bg-secondary group-hover:bg-primary/10 transition-colors">
                                        <ArrowLeft className="w-5 h-5 text-text-secondary group-hover:text-primary" />
                                    </button>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                Phase {selectedPhase.phaseNumber}
                                            </span>
                                            <h2 className="font-bold text-text-primary text-lg">{selectedPhase.title}</h2>
                                        </div>
                                        {!selectedWeekId && (
                                            <p className="text-sm text-text-secondary mt-0.5 line-clamp-1">{selectedPhase.summary}</p>
                                        )}
                                    </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-text-tertiary -rotate-90" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sticky Week Header (The "Shrunk" Week) */}
            <AnimatePresence>
                {selectedWeekId && selectedWeek && (
                    <motion.div
                        layoutId={`week-card-${selectedWeek.weekNumber}`}
                        className="sticky top-28 z-20"
                    >
                        <div
                            onClick={resetToWeeks}
                            className="bg-surface/90 backdrop-blur-xl border border-primary/20 rounded-xl p-4 shadow-md cursor-pointer hover:border-primary/50 transition-colors group mt-2 ring-1 ring-black/5 dark:ring-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="p-2 rounded-full bg-bg-secondary group-hover:bg-primary/10 transition-colors">
                                        <ArrowLeft className="w-5 h-5 text-text-secondary group-hover:text-primary" />
                                    </button>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold bg-bg-secondary text-text-secondary px-2 py-0.5 rounded-full">
                                                Week {selectedWeek.weekNumber}
                                            </span>
                                            <h3 className="font-bold text-text-primary">{selectedWeek.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-text-tertiary -rotate-90" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 relative min-h-[50vh]">
                <AnimatePresence mode="wait">

                    {/* View 1: All Phases List */}
                    {!selectedPhaseId && (
                        <motion.div
                            key="phases-list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            {roadmap.phases.map((phase) => (
                                <motion.div
                                    key={phase.phaseNumber}
                                    layoutId={`phase-card-${phase.phaseNumber}`}
                                    onClick={() => handlePhaseClick(phase.phaseNumber)}
                                    className="group relative overflow-hidden bg-surface border border-border rounded-2xl p-6 cursor-pointer hover:shadow-xl hover:border-primary/30 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
                                            Phase {phase.phaseNumber}
                                        </span>
                                        <span className="text-sm text-text-secondary flex items-center gap-1.5 bg-bg-secondary px-2 py-1 rounded-md">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {phase.weekRange}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                                        {phase.title}
                                    </h2>
                                    <p className="text-text-secondary leading-relaxed mb-6 text-lg">
                                        {phase.summary}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <span className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="w-6 h-6 rounded-full bg-bg-secondary border-2 border-surface flex items-center justify-center text-[8px] font-bold text-text-tertiary">
                                                        W{i + 1}
                                                    </div>
                                                ))}
                                            </div>
                                            {phase.weeks.length} Weeks
                                        </span>
                                        <span className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                                            View Phase <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* View 2: Weeks List */}
                    {selectedPhaseId && !selectedWeekId && selectedPhase && (
                        <motion.div
                            key="weeks-list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-3 pt-2"
                        >
                            {selectedPhase.weeks.map((week) => (
                                <motion.div
                                    key={week.weekNumber}
                                    layoutId={`week-card-${week.weekNumber}`}
                                    onClick={() => handleWeekClick(week.weekNumber)}
                                    className="group bg-surface border border-border rounded-xl p-5 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all flex items-center gap-5"
                                >
                                    <div className="flex flex-col items-center justify-center w-14 h-14 bg-bg-secondary rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
                                        <span className="text-[10px] uppercase font-bold text-text-tertiary group-hover:text-primary/70">Week</span>
                                        <span className="text-2xl font-bold text-text-primary group-hover:text-primary">{week.weekNumber}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-text-primary mb-1 truncate group-hover:text-primary transition-colors">{week.title}</h3>
                                        <p className="text-sm text-text-secondary truncate">{week.theme}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-bg-secondary text-text-secondary mb-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {week.totalHours}h
                                        </div>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 text-text-tertiary -rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* View 3: Task Details */}
                    {selectedWeekId && selectedWeek && (
                        <motion.div
                            key="task-details"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-6 pt-2"
                        >
                            {/* Copilot Insight Card */}
                            <div className="p-5 bg-gradient-to-r from-primary/5 to-transparent border-l-4 border-primary rounded-r-xl">
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-text-primary mb-1">Copilot Insight</h4>
                                        <p className="text-sm text-text-secondary leading-relaxed">
                                            This week focuses on <span className="font-medium text-text-primary">{selectedWeek.theme}</span>.
                                            Prioritize the build deliverables as they account for the majority of your time.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Build Section */}
                            {selectedWeek.buildSection && (
                                <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-500/10 rounded-lg">
                                            <Hammer className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <h4 className="text-lg font-bold text-text-primary">Build Project</h4>
                                    </div>

                                    <div className="pl-2">
                                        <h3 className="text-xl font-bold text-text-primary mb-2">{selectedWeek.buildSection.projectTitle}</h3>
                                        <p className="text-text-secondary mb-6 leading-relaxed">{selectedWeek.buildSection.description}</p>

                                        {selectedWeek.buildSection.deliverables && (
                                            <div className="space-y-3">
                                                <h5 className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-3">Key Deliverables</h5>
                                                {selectedWeek.buildSection.deliverables.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3 p-3 bg-bg-secondary/50 rounded-xl hover:bg-bg-secondary transition-colors">
                                                        <div className="mt-0.5">
                                                            {item.isCompleted ? (
                                                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-text-tertiary" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-text-primary font-medium">{item.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Research Section */}
                            {selectedWeek.researchSection && (
                                <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h4 className="text-lg font-bold text-text-primary">Deep Dive</h4>
                                    </div>

                                    <div className="space-y-6 pl-2">
                                        {selectedWeek.researchSection.deepDiveTopics?.map((topic, i) => (
                                            <div key={i} className="relative">
                                                <h5 className="font-bold text-text-primary mb-2 text-lg">{topic.description}</h5>
                                                {topic.subtasks && (
                                                    <ul className="space-y-2">
                                                        {topic.subtasks.map((sub, j) => (
                                                            <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-text-tertiary mt-1.5 shrink-0" />
                                                                <span>{sub.description}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
