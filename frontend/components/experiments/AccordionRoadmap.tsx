'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Roadmap, Phase, Week } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AccordionRoadmapProps {
    roadmap: Roadmap;
}

export default function AccordionRoadmap({ roadmap }: AccordionRoadmapProps) {
    const [expandedPhase, setExpandedPhase] = useState<number | null>(1);
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-text-primary mb-2">{roadmap.title}</h1>
                <p className="text-text-secondary">{roadmap.goal}</p>
            </header>

            <div className="space-y-4">
                {roadmap.phases.map((phase) => (
                    <PhaseItem
                        key={phase.phaseNumber}
                        phase={phase}
                        isExpanded={expandedPhase === phase.phaseNumber}
                        onToggle={() => setExpandedPhase(expandedPhase === phase.phaseNumber ? null : phase.phaseNumber)}
                        expandedWeek={expandedWeek}
                        setExpandedWeek={setExpandedWeek}
                    />
                ))}
            </div>
        </div>
    );
}

function PhaseItem({
    phase,
    isExpanded,
    onToggle,
    expandedWeek,
    setExpandedWeek,
}: {
    phase: Phase;
    isExpanded: boolean;
    onToggle: () => void;
    expandedWeek: number | null;
    setExpandedWeek: (week: number | null) => void;
}) {
    return (
        <motion.div
            layout
            className={cn(
                "rounded-xl border overflow-hidden transition-colors",
                isExpanded ? "bg-surface border-primary/20 shadow-lg" : "bg-surface/50 border-border hover:bg-surface"
            )}
        >
            <motion.button
                layout="position"
                onClick={onToggle}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors",
                        isExpanded ? "bg-primary text-on-primary" : "bg-bg-secondary text-text-secondary"
                    )}>
                        {phase.phaseNumber}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-text-primary">{phase.title}</h3>
                        <p className="text-sm text-text-secondary line-clamp-1">{phase.summary}</p>
                    </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-text-secondary transition-transform", isExpanded && "rotate-180")} />
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border/50"
                    >
                        <div className="p-4 space-y-3 bg-bg-secondary/30">
                            {phase.weeks.map((week) => (
                                <WeekItem
                                    key={week.weekNumber}
                                    week={week}
                                    isExpanded={expandedWeek === week.weekNumber}
                                    onToggle={() => setExpandedWeek(expandedWeek === week.weekNumber ? null : week.weekNumber)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function WeekItem({ week, isExpanded, onToggle }: { week: Week; isExpanded: boolean; onToggle: () => void }) {
    return (
        <motion.div
            layout
            className={cn(
                "rounded-lg border overflow-hidden bg-surface transition-all",
                isExpanded ? "border-primary/30 shadow-md ring-1 ring-primary/10" : "border-border hover:border-primary/20"
            )}
        >
            <motion.button
                layout="position"
                onClick={onToggle}
                className="w-full flex items-center gap-4 p-4 text-left"
            >
                <div className="flex flex-col items-center min-w-[3rem]">
                    <span className="text-xs font-medium text-text-secondary uppercase">Week</span>
                    <span className="text-xl font-bold text-primary">{week.weekNumber}</span>
                </div>

                <div className="flex-1">
                    <h4 className="font-semibold text-text-primary">{week.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-text-secondary mt-1">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {week.totalHours}h
                        </span>
                        <span className="px-1.5 py-0.5 rounded-sm bg-bg-secondary border border-border">
                            {week.status}
                        </span>
                    </div>
                </div>

                <ChevronRight className={cn("w-4 h-4 text-text-secondary transition-transform", isExpanded && "rotate-90")} />
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-border"
                    >
                        <div className="p-4 space-y-6">
                            {/* Build Section */}
                            {week.buildSection && (
                                <div className="space-y-3">
                                    <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                                        Build
                                    </h5>
                                    <div className="pl-4 border-l-2 border-border ml-1 space-y-3">
                                        <div>
                                            <h6 className="font-medium text-text-primary">{week.buildSection.projectTitle}</h6>
                                            <p className="text-sm text-text-secondary mt-1">{week.buildSection.description}</p>
                                        </div>
                                        {week.buildSection.deliverables && (
                                            <ul className="space-y-2">
                                                {week.buildSection.deliverables.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                                                        <div className="mt-0.5">
                                                            {item.isCompleted ? (
                                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                            ) : (
                                                                <Circle className="w-4 h-4 text-text-tertiary" />
                                                            )}
                                                        </div>
                                                        <span>{item.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Research Section */}
                            {week.researchSection && (
                                <div className="space-y-3">
                                    <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                                        Research
                                    </h5>
                                    <div className="pl-4 border-l-2 border-border ml-1">
                                        <ul className="space-y-2">
                                            {week.researchSection.deepDiveTopics?.map((topic, i) => (
                                                <li key={i} className="text-sm text-text-secondary">
                                                    <span className="font-medium text-text-primary">{topic.description}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
