'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Roadmap, Phase, Week } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MorphingRoadmapProps {
    roadmap: Roadmap;
}

export default function MorphingRoadmap({ roadmap }: MorphingRoadmapProps) {
    const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
    const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);

    // Reset week when phase changes
    useEffect(() => {
        setSelectedWeekId(null);
    }, [selectedPhaseId]);

    const selectedPhase = roadmap.phases.find(p => p.phaseNumber === selectedPhaseId);
    const selectedWeek = selectedPhase?.weeks.find(w => w.weekNumber === selectedWeekId);

    return (
        <div className="h-[calc(100vh-100px)] max-w-[1600px] mx-auto p-4 flex gap-4 overflow-hidden">
            {/* Column 1: Phases */}
            <motion.div
                layout
                className={cn(
                    "flex flex-col gap-4 overflow-y-auto transition-all duration-500 ease-in-out",
                    selectedPhaseId ? "w-1/4 min-w-[250px]" : "w-full max-w-4xl mx-auto"
                )}
            >
                <header className={cn("mb-4", selectedPhaseId && "px-2")}>
                    <h2 className="text-xl font-bold text-text-primary">Phases</h2>
                    {!selectedPhaseId && <p className="text-text-secondary">Select a phase to begin</p>}
                </header>

                <div className="space-y-3">
                    {roadmap.phases.map((phase) => (
                        <PhaseCard
                            key={phase.phaseNumber}
                            phase={phase}
                            isSelected={selectedPhaseId === phase.phaseNumber}
                            isCompact={!!selectedPhaseId}
                            onClick={() => setSelectedPhaseId(phase.phaseNumber)}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Column 2: Weeks */}
            <AnimatePresence mode="popLayout">
                {selectedPhaseId && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        layout
                        className={cn(
                            "flex flex-col gap-4 overflow-y-auto border-l border-border/50 pl-4 transition-all duration-500",
                            selectedWeekId ? "w-1/4 min-w-[250px]" : "w-3/4"
                        )}
                    >
                        <header className="mb-4 flex items-center justify-between px-2">
                            <div>
                                <h2 className="text-xl font-bold text-text-primary">Weeks</h2>
                                <p className="text-sm text-text-secondary">Phase {selectedPhaseId}</p>
                            </div>
                            <button
                                onClick={() => setSelectedPhaseId(null)}
                                className="p-1 hover:bg-bg-secondary rounded-full md:hidden"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </header>

                        <div className="space-y-3">
                            {selectedPhase?.weeks.map((week) => (
                                <WeekCard
                                    key={week.weekNumber}
                                    week={week}
                                    isSelected={selectedWeekId === week.weekNumber}
                                    isCompact={!!selectedWeekId}
                                    onClick={() => setSelectedWeekId(week.weekNumber)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Column 3: Tasks/Details */}
            <AnimatePresence mode="popLayout">
                {selectedWeekId && selectedWeek && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        layout
                        className="flex-1 overflow-y-auto border-l border-border/50 pl-4 bg-surface/30 rounded-xl p-6"
                    >
                        <header className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">{selectedWeek.title}</h2>
                                <div className="flex items-center gap-3 text-sm text-text-secondary mt-1">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-bold">Week {selectedWeek.weekNumber}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedWeek.totalHours}h</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedWeekId(null)}
                                className="p-1 hover:bg-bg-secondary rounded-full md:hidden"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </header>

                        <div className="space-y-8">
                            {/* Build Section */}
                            {selectedWeek.buildSection && (
                                <section>
                                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                                        Build Project
                                    </h3>
                                    <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
                                        <h4 className="text-lg font-bold text-text-primary mb-2">{selectedWeek.buildSection.projectTitle}</h4>
                                        <p className="text-text-secondary mb-4">{selectedWeek.buildSection.description}</p>

                                        {selectedWeek.buildSection.technicalStack && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {selectedWeek.buildSection.technicalStack.map((tech, i) => (
                                                    <span key={i} className="px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded-md border border-border">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {selectedWeek.buildSection.deliverables && (
                                            <div className="space-y-2">
                                                <h5 className="text-xs font-semibold text-text-secondary">Deliverables</h5>
                                                {selectedWeek.buildSection.deliverables.map((item, i) => (
                                                    <div key={i} className="flex items-start gap-2 text-sm">
                                                        <div className="mt-1 w-4 h-4 rounded-full border border-border flex items-center justify-center">
                                                            {item.isCompleted && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                                                        </div>
                                                        <span className="text-text-primary">{item.description}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Research Section */}
                            {selectedWeek.researchSection && (
                                <section>
                                    <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                                        Deep Dive
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedWeek.researchSection.deepDiveTopics?.map((topic, i) => (
                                            <div key={i} className="bg-surface border border-border rounded-lg p-4 hover:border-primary/30 transition-colors">
                                                <h4 className="font-medium text-text-primary mb-2">{topic.description}</h4>
                                                {topic.subtasks && (
                                                    <ul className="space-y-1 pl-4 list-disc list-outside text-sm text-text-secondary">
                                                        {topic.subtasks.map((sub, j) => (
                                                            <li key={j}>{sub.description}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function PhaseCard({ phase, isSelected, isCompact, onClick }: { phase: Phase, isSelected: boolean, isCompact: boolean, onClick: () => void }) {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-xl border transition-all duration-300",
                isSelected
                    ? "bg-primary text-on-primary border-primary shadow-lg ring-2 ring-primary/20"
                    : "bg-surface border-border hover:border-primary/50 hover:shadow-md",
                isCompact ? "p-4" : "p-6"
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                            "text-xs font-bold px-2 py-0.5 rounded-full",
                            isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                        )}>
                            Phase {phase.phaseNumber}
                        </span>
                    </div>
                    <h3 className={cn("font-bold mb-1", isCompact ? "text-base" : "text-xl")}>{phase.title}</h3>
                    {!isCompact && <p className={cn("text-sm line-clamp-2", isSelected ? "text-white/80" : "text-text-secondary")}>{phase.summary}</p>}
                </div>
                {isSelected && <ChevronRight className="w-5 h-5 text-white" />}
            </div>
        </motion.div>
    );
}

function WeekCard({ week, isSelected, isCompact, onClick }: { week: Week, isSelected: boolean, isCompact: boolean, onClick: () => void }) {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={cn(
                "cursor-pointer rounded-lg border transition-all duration-300",
                isSelected
                    ? "bg-surface border-primary shadow-md ring-1 ring-primary"
                    : "bg-surface border-border hover:border-primary/30",
                isCompact ? "p-3" : "p-4"
            )}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "flex flex-col items-center justify-center rounded-md min-w-[3rem]",
                    isSelected ? "bg-primary/10 text-primary" : "bg-bg-secondary text-text-secondary",
                    isCompact ? "p-1" : "p-2"
                )}>
                    <span className="text-[10px] uppercase font-bold">Week</span>
                    <span className="text-lg font-bold">{week.weekNumber}</span>
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className={cn("font-semibold truncate", isSelected ? "text-primary" : "text-text-primary")}>{week.title}</h4>
                    {!isCompact && <p className="text-xs text-text-secondary truncate">{week.theme}</p>}
                </div>
            </div>
        </motion.div>
    );
}
