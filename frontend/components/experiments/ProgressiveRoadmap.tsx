'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle, Sparkles, BookOpen, Hammer, Share2, ArrowRight, Database, Globe, Zap, Clock, ChevronRight, ChevronLeft, Layout, Layers, Calendar, ExternalLink, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import { Roadmap, Phase, Week, BuildSection, DeepDiveTopic, ShareSection } from '@/lib/types';
import { cn } from '@/lib/utils';

// --- Types ---
type ViewMode = 'phases' | 'weeks' | 'tasks';

type FocusItem =
    | { type: 'build'; data: BuildSection | undefined }
    | { type: 'research'; data: DeepDiveTopic | undefined }
    | { type: 'share'; data: ShareSection | undefined };

interface TaskTimerState {
    taskId: string | null;
    isRunning: boolean;
    isPaused: boolean;
    totalElapsedSeconds: number;
    currentSessionStart: number | null;
    isCompleted: boolean;
}

interface TaskCompletionStatus {
    isCompleted: boolean;
    totalTimeSpent: number;
    completedAt: string | null;
}

type TaskCompletionMap = Record<string, TaskCompletionStatus>;

// --- Sub-Components ---

function PhaseCinematic({ phase, onClick }: { phase: Phase; onClick: () => void }) {
    const displayedWeeks = phase.weeks.slice(0, 3);
    const remainingWeeks = phase.weeks.length - 3;

    return (
        <motion.div
            layoutId={`phase-card-${phase.phaseNumber}`}
            onClick={onClick}
            className="group relative w-[75vw] sm:w-[70vw] md:w-[650px] lg:w-[700px] h-auto min-h-[300px] sm:min-h-[350px] max-h-[400px] sm:max-h-[450px] bg-surface border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 cursor-pointer hover:border-primary/50 transition-all overflow-hidden flex flex-col shrink-0 snap-center"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 group-hover:to-primary/10 transition-colors" />

            {/* Top Content */}
            <div className="relative z-10 shrink-0">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-text-tertiary/20 group-hover:text-primary/20 transition-colors">
                        0{phase.phaseNumber}
                    </span>
                    <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-bg-secondary/80 backdrop-blur-sm text-text-secondary text-[10px] sm:text-xs font-medium rounded-full border border-border flex items-center gap-1.5 sm:gap-2">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        {phase.weekRange}
                    </span>
                </div>

                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-text-primary mb-1.5 sm:mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-1">
                    {phase.title}
                </h2>
                <p className="text-xs sm:text-sm text-text-secondary leading-snug line-clamp-2 mb-2 sm:mb-3">
                    {phase.summary}
                </p>
            </div>

            {/* Middle Content: Key Milestones (Fixed Height/Count) */}
            <div className="relative z-10 flex-1 border-t border-border/50 pt-3 sm:pt-4 overflow-y-auto">
                <div className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Layers className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Key Milestones
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                    {displayedWeeks.map((week, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3 group/item">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-text-tertiary group-hover/item:border-primary group-hover/item:text-primary transition-colors shrink-0">
                                {week.weekNumber}
                            </div>
                            <span className="text-[11px] sm:text-xs text-text-secondary group-hover/item:text-text-primary transition-colors line-clamp-1">
                                {week.theme}
                            </span>
                        </div>
                    ))}
                    {remainingWeeks > 0 && (
                        <div className="pl-6 sm:pl-7 text-[10px] sm:text-xs text-text-tertiary font-medium">
                            + {remainingWeeks} more weeks
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-border/50">
                <div className="text-xs sm:text-sm font-medium text-text-tertiary">
                    {phase.weeks.length} Weeks Total
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                    Explore Phase <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
            </div>
        </motion.div>
    );
}

// ... (Keep other components like WeekCard, PhaseTab, TimelineNode, TaskDetailView)



function WeekCard({ week, onClick }: { week: Week; onClick: () => void }) {
    return (
        <motion.div
            layoutId={`week-card-${week.weekNumber}`}
            onClick={onClick}
            className="group relative min-w-[280px] sm:min-w-[320px] md:min-w-[360px] h-[400px] sm:h-[450px] bg-surface border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 cursor-pointer hover:border-primary/50 transition-all flex flex-col shrink-0 snap-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-secondary/20 group-hover:to-primary/5 transition-colors" />

            <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center text-lg font-bold text-text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors shadow-sm">
                        {week.weekNumber}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Week</span>
                        <span className="text-xs font-medium text-text-secondary">{week.totalHours} Hours</span>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {week.title}
            </h3>
            <p className="text-sm text-text-secondary mb-6">
                {week.theme}
            </p>

            <p className="text-sm text-text-secondary mb-6">
                {week.theme}
            </p>

            {/* Key Deliverables */}
            <div className="flex-1 mb-6">
                <div className="text-[10px] font-bold uppercase text-text-tertiary tracking-wider mb-3 flex items-center gap-2">
                    <Hammer className="w-3 h-3" /> Key Deliverables
                </div>
                <div className="space-y-2.5">
                    {/* Build Deliverables */}
                    {week.buildSection?.deliverables?.slice(0, 3).map((d, i) => (
                        <div key={i} className="flex gap-2.5 items-start group/item">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/item:bg-blue-500 transition-colors shrink-0" />
                            <span className="text-sm text-text-secondary group-hover/item:text-text-primary transition-colors leading-snug">
                                {d.description}
                            </span>
                        </div>
                    ))}

                    {/* Share Artifact (treated as a deliverable) */}
                    {week.shareSection && (
                        <div className="flex gap-2.5 items-start group/item">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover/item:bg-green-500 transition-colors shrink-0" />
                            <span className="text-sm text-text-secondary group-hover/item:text-text-primary transition-colors leading-snug">
                                Share: {week.shareSection.artifactTitle}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-text-secondary border-t border-border pt-4 mt-auto">
                <div className="flex flex-col gap-1">
                    <span className="uppercase text-[10px] font-bold text-text-tertiary">Build</span>
                    <span className="font-mono">{week.timeBreakdown.build}h</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="uppercase text-[10px] font-bold text-text-tertiary">Research</span>
                    <span className="font-mono">{week.timeBreakdown.research}h</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="uppercase text-[10px] font-bold text-text-tertiary">Share</span>
                    <span className="font-mono">{week.timeBreakdown.share}h</span>
                </div>
            </div>
        </motion.div>
    );
}

function PhaseTab({
    phase,
    isActive,
    onClick
}: {
    phase: Phase;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-bold transition-all rounded-t-xl border-b-2 shrink-0",
                isActive
                    ? "text-primary border-primary bg-surface"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:bg-surface/50"
            )}
        >
            <div className="flex items-center gap-2">
                <span className={cn(
                    "flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full text-[9px] sm:text-[10px]",
                    isActive ? "bg-primary/10 text-primary" : "bg-bg-secondary text-text-tertiary"
                )}>
                    {phase.phaseNumber}
                </span>
                <span>{phase.title}</span>
            </div>
            {isActive && (
                <motion.div
                    layoutId="active-phase-tab"
                    className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary"
                />
            )}
        </button>
    );
}

function TimelineNode({
    week,
    isActive,
    isCompleted,
    onClick
}: {
    week: Week;
    isActive: boolean;
    isCompleted: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative flex-none w-20 sm:w-24 lg:w-32 xl:w-40 h-full flex flex-col items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 transition-all border-b-2",
                isActive
                    ? "bg-surface border-primary"
                    : "hover:bg-bg-secondary/50 border-transparent"
            )}
        >
            <div className={cn(
                "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-colors",
                isActive
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                    : isCompleted
                        ? "bg-green-500/10 text-green-600"
                        : "bg-bg-secondary text-text-tertiary group-hover:text-text-secondary"
            )}>
                {isCompleted ? <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" /> : <span className="text-[10px] sm:text-xs font-bold">{week.weekNumber}</span>}
            </div>

            <div className="text-center">
                <div className={cn(
                    "text-[10px] sm:text-xs font-bold uppercase tracking-wider",
                    isActive ? "text-primary" : "text-text-tertiary"
                )}>
                    Week {week.weekNumber}
                </div>
                {isActive && (
                    <motion.div
                        layoutId="active-week-label"
                        className="text-[9px] sm:text-[10px] text-text-secondary line-clamp-1 max-w-[60px] sm:max-w-[80px] lg:max-w-[100px] mx-auto"
                    >
                        {week.title}
                    </motion.div>
                )}
            </div>
        </button>
    );
}

function TaskDetailView({ week, roadmap, setSelectedWeekId, focusedItem, setFocusedItem, taskTimer, handleStartTask, handlePauseTask, handleResumeTask, handleMarkComplete, formatTime, taskCompletions, getTaskId }: {
    week: Week;
    roadmap: Roadmap;
    setSelectedWeekId: (id: number) => void;
    focusedItem: FocusItem | null;
    setFocusedItem: (item: FocusItem | null) => void;
    taskTimer: TaskTimerState;
    handleStartTask: () => void;
    handlePauseTask: () => void;
    handleResumeTask: () => void;
    handleMarkComplete: () => void;
    formatTime: (seconds: number) => string;
    taskCompletions: TaskCompletionMap;
    getTaskId: (item: FocusItem, week: Week) => string;
}) {
    // Helper to check if an item is currently focused
    const isFocused = (item: FocusItem) => {
        if (!focusedItem) return false;
        if (focusedItem.type !== item.type) return false;
        if (focusedItem.type === 'research' && item.type === 'research') {
            return focusedItem.data?.description === item.data?.description;
        }
        return true;
    };



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex overflow-hidden bg-bg-secondary"
        >
            {/* Main Content Area (Scrollable Stream) */}
            <div className="flex-1 flex flex-col overflow-hidden">


                {/* HERO BANNER (Compact & Wide) - Only shown when task is focused */}
                <AnimatePresence>
                    {focusedItem && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white shadow-xl z-10 rounded-3xl mx-4 mt-4"
                        >
                            {/* Background Effects */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                            <div className={`absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full blur-3xl pointer-events-none ${focusedItem.type === 'build' ? 'bg-blue-500/20' :
                                focusedItem.type === 'research' ? 'bg-purple-500/20' :
                                    'bg-green-500/20'
                                }`} />

                            <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 pt-8 pb-6 sm:pt-10 sm:pb-8 relative z-10">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${focusedItem.type === 'build' ? 'bg-blue-500/20 text-blue-300' :
                                            focusedItem.type === 'research' ? 'bg-purple-500/20 text-purple-300' :
                                                'bg-green-500/20 text-green-300'
                                            }`}>
                                            <Sparkles className="w-3 h-3" /> Current Focus
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">Week {week.weekNumber} • {week.theme}</span>
                                    </div>
                                </div>

                                <motion.div
                                    key={focusedItem.type === 'research' ? focusedItem.data?.description : focusedItem.type}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                >
                                    {/* BUILD HERO */}
                                    {focusedItem.type === 'build' && week.buildSection && (
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-300 shrink-0">
                                                        <Database className="w-5 h-5" />
                                                    </div>
                                                    <h1 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{week.buildSection.projectTitle}</h1>
                                                </div>
                                                <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-2">{week.buildSection.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {week.buildSection.technicalStack?.map((tech, i) => (
                                                        <span key={i} className="px-2 py-1 bg-white/10 border border-white/10 rounded text-[10px] font-medium text-gray-300">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full md:w-64 lg:w-72 shrink-0 bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10 backdrop-blur-sm">
                                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Key Deliverables</h3>
                                                <div className="space-y-2">
                                                    {week.buildSection.deliverables?.slice(0, 3).map((d, i) => (
                                                        <div key={i} className="flex gap-2 items-start">
                                                            <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${d.isCompleted ? 'bg-blue-400' : 'bg-white/20'}`} />
                                                            <span className="text-xs text-gray-300 line-clamp-1">{d.description}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* RESEARCH HERO */}
                                    {focusedItem.type === 'research' && week.researchSection && (
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <h1 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{focusedItem.data?.description}</h1>
                                                </div>

                                                {focusedItem.data?.subtasks && (
                                                    <div className="space-y-3 mb-4">
                                                        {focusedItem.data.subtasks.map((sub, i) => {
                                                            const hasResources = sub.suggestedResources && sub.suggestedResources.length > 0;
                                                            const singleResource = sub.suggestedResources && sub.suggestedResources.length === 1 ? sub.suggestedResources[0] : null;

                                                            return (

                                                                <div key={i} className="flex gap-3 items-start text-sm text-gray-300 group/sub">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50 mt-2 shrink-0 group-hover/sub:bg-purple-400 transition-colors" />

                                                                    <div className="flex-1">
                                                                        {/* Case 1: Single Resource -> Link the text itself */}
                                                                        {singleResource ? (
                                                                            <a
                                                                                href={singleResource.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-purple-300 hover:text-purple-200 hover:underline font-medium inline-flex items-center gap-1.5 transition-colors"
                                                                            >
                                                                                {sub.description}
                                                                                <ExternalLink className="w-3 h-3 opacity-50" />
                                                                            </a>
                                                                        ) : (
                                                                            /* Case 2: Multiple or No Resources -> Text + Inline Links */
                                                                            <span className={hasResources ? "font-medium text-white" : ""}>
                                                                                {sub.description}
                                                                            </span>
                                                                        )}

                                                                        {/* Render multiple resources inline if they exist */}
                                                                        {!singleResource && hasResources && (
                                                                            <div className="flex flex-col gap-1.5 mt-2">
                                                                                {sub.suggestedResources!.map((res, j) => (
                                                                                    <a
                                                                                        key={j}
                                                                                        href={res.url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-xs text-purple-300 hover:text-purple-200 hover:underline inline-flex items-center gap-1 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 transition-colors"
                                                                                    >
                                                                                        <BookOpen className="w-3 h-3" />
                                                                                        {res.title || res.type}
                                                                                    </a>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="w-full md:w-72 shrink-0">
                                                <div className="flex flex-col gap-2">
                                                    {focusedItem.data?.suggestedResources?.slice(0, 2).map((res, i) => (
                                                        <a
                                                            key={i}
                                                            href={res.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 hover:underline group w-fit transition-all"
                                                        >
                                                            <BookOpen className="w-4 h-4 shrink-0" />
                                                            <span className="font-medium truncate max-w-[200px]">{res.title || res.type}</span>
                                                            <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* SHARE HERO */}
                                    {focusedItem.type === 'share' && week.shareSection && (
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 rounded-lg bg-green-500/20 text-green-300 shrink-0">
                                                        <Share2 className="w-5 h-5" />
                                                    </div>
                                                    <h1 className="text-lg sm:text-xl font-bold text-white line-clamp-2">{week.shareSection.artifactTitle}</h1>
                                                </div>
                                                <p className="text-sm text-gray-300 leading-relaxed mb-4 max-w-2xl">{week.shareSection.artifactDescription}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {week.shareSection.tags?.map((tag, i) => (
                                                        <span key={i} className="text-[10px] font-medium text-green-300 bg-green-500/20 px-2 py-1 rounded-full">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="w-full md:w-72 shrink-0 bg-white/5 rounded-xl p-4 border border-white/10 backdrop-blur-sm">
                                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Checklist</h3>
                                                <ul className="space-y-2">
                                                    {week.shareSection.details?.map((detail, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                                            <span className="line-clamp-1">{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Action Bar - Timer and Controls */}
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                    {/* Left: Timer Display */}
                                    <div className="flex items-center gap-3">
                                        {taskTimer.isCompleted ? (
                                            <div className="flex items-center gap-2 text-green-400">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="text-sm font-medium">
                                                    Completed in {formatTime(taskTimer.totalElapsedSeconds)}
                                                </span>
                                            </div>
                                        ) : (taskTimer.isRunning || taskTimer.isPaused) && (
                                            <div className="flex items-center gap-2">
                                                <Clock className={cn(
                                                    "w-5 h-5",
                                                    taskTimer.isRunning && "text-blue-400 animate-pulse"
                                                )} />
                                                <span className="font-mono text-lg font-semibold text-white">
                                                    {formatTime(taskTimer.totalElapsedSeconds)}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Action Buttons */}
                                    <div className="flex items-center gap-2">
                                        {!taskTimer.isCompleted && !taskTimer.isRunning && !taskTimer.isPaused && (
                                            <button
                                                onClick={handleStartTask}
                                                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary rounded-lg font-medium transition-colors shadow-md"
                                            >
                                                <Play className="w-4 h-4" />
                                                Start Task
                                            </button>
                                        )}

                                        {taskTimer.isRunning && (
                                            <>
                                                <button
                                                    onClick={handlePauseTask}
                                                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors shadow-md"
                                                >
                                                    <Pause className="w-4 h-4" />
                                                    Pause
                                                </button>
                                                <button
                                                    onClick={handleMarkComplete}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Mark Complete
                                                </button>
                                            </>
                                        )}

                                        {taskTimer.isPaused && (
                                            <>
                                                <button
                                                    onClick={handleResumeTask}
                                                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary rounded-lg font-medium transition-colors shadow-md"
                                                >
                                                    <Play className="w-4 h-4" />
                                                    Resume
                                                </button>
                                                <button
                                                    onClick={handleMarkComplete}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Mark Complete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* TASK STREAM (The List Below) - Scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6 pb-12 sm:pb-20">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-wider">Week {week.weekNumber}: {week.title}</h3>
                            <span className="text-[10px] text-text-tertiary bg-bg-secondary px-2 py-1 rounded">Build • Research • Share</span>
                        </div>
                        {/* Empty State - Show when no task is focused */}
                        {!focusedItem && (
                            <div className="flex items-center gap-3 py-3 px-4 mb-4 bg-primary/5 border border-primary/20 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-xs text-text-secondary">
                                    Click a task below to see details and bring it to current focus
                                </p>
                            </div>
                        )}

                        <div className="space-y-3">

                            {/* Build Item */}
                            {week.buildSection && (() => {
                                const buildTaskId = getTaskId({ type: 'build', data: week.buildSection }, week);
                                const isCompleted = taskCompletions[buildTaskId]?.isCompleted;

                                return (
                                    <div
                                        onClick={() => setFocusedItem({ type: 'build', data: week.buildSection! })}
                                        className={`cursor-pointer group ${isFocused({ type: 'build', data: week.buildSection }) ? 'pointer-events-none' : ''}`}
                                    >

                                        <div className={cn(
                                            "bg-surface border p-2.5 rounded-xl transition-all relative overflow-hidden",
                                            isCompleted
                                                ? "border-green-500/30 bg-green-500/5"
                                                : isFocused({ type: 'build', data: week.buildSection })
                                                    ? 'border-blue-500 shadow-lg shadow-blue-500/10'
                                                    : 'border-border hover:border-blue-500 hover:shadow-md group-hover:-translate-y-0.5'
                                        )}>
                                            <div className={cn(
                                                "absolute inset-0 transition-colors",
                                                isCompleted
                                                    ? ""
                                                    : isFocused({ type: 'build', data: week.buildSection })
                                                        ? 'bg-blue-500/5'
                                                        : 'bg-blue-500/0 group-hover:bg-blue-500/5'
                                            )} />

                                            {/* Completion checkmark badge */}
                                            {isCompleted && (
                                                <div className="absolute top-2 right-2 z-20">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                        <Database className="w-3.5 h-3.5" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-0.5">Build</div>
                                                        <h4 className="text-sm font-bold text-text-primary">{week.buildSection.projectTitle}</h4>
                                                    </div>
                                                </div>
                                                {isFocused({ type: 'build', data: week.buildSection }) ? (
                                                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
                                                        <Sparkles className="w-3 h-3" />
                                                        In Focus
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                                        Focus Task <ArrowRight className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Research Section - Grouped */}
                            {week.researchSection && week.researchSection.deepDiveTopics && week.researchSection.deepDiveTopics.length > 0 && (
                                <div
                                    className="relative group"
                                >
                                    <div className={`bg-surface border p-2.5 rounded-xl transition-all relative overflow-hidden ${focusedItem?.type === 'research'
                                        ? 'border-purple-500 shadow-lg shadow-purple-500/10'
                                        : 'border-border'
                                        }`}>
                                        <div className={`absolute inset-0 transition-colors ${focusedItem?.type === 'research'
                                            ? 'bg-purple-500/5'
                                            : 'bg-purple-500/0'
                                            }`} />

                                        {/* Header */}
                                        <div className="flex items-center justify-between relative z-10 mb-2.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                                    <Globe className="w-3.5 h-3.5" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-purple-500 uppercase tracking-wider mb-0.5">Research</div>
                                                    <h4 className="text-sm font-bold text-text-primary">
                                                        {week.researchSection.deepDiveTopics.length} Deep Dive Topic{week.researchSection.deepDiveTopics.length > 1 ? 's' : ''}
                                                    </h4>
                                                </div>
                                            </div>
                                            {focusedItem?.type === 'research' && (
                                                <div className="flex items-center gap-2 text-xs font-bold text-purple-600 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800">
                                                    <Sparkles className="w-3 h-3" />
                                                    In Focus
                                                </div>
                                            )}
                                        </div>

                                        {/* Topics List */}
                                        <div className="space-y-1.5 relative z-10">
                                            {week.researchSection.deepDiveTopics.map((topic, i) => {
                                                const item: FocusItem = { type: 'research', data: topic };
                                                const isItemFocused = isFocused(item);
                                                const topicTaskId = getTaskId(item, week);
                                                const isCompleted = taskCompletions[topicTaskId]?.isCompleted;

                                                return (
                                                    <div
                                                        key={i}
                                                        onClick={() => setFocusedItem(item)}
                                                        className={cn(
                                                            "p-2 rounded-lg border transition-all cursor-pointer relative",
                                                            isCompleted
                                                                ? "bg-green-500/5 border-green-500/30"
                                                                : isItemFocused
                                                                    ? 'bg-purple-500/10 border-purple-500/30'
                                                                    : 'bg-bg-secondary border-border hover:border-purple-500/30 hover:bg-purple-500/5'
                                                        )}
                                                    >
                                                        {/* Completion checkmark */}
                                                        {isCompleted && (
                                                            <div className="absolute top-1.5 right-1.5">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                                            </div>
                                                        )}

                                                        <div className="flex items-start justify-between gap-3">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    {isItemFocused && (
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                                                    )}
                                                                    <h5 className="text-sm font-semibold text-text-primary">{topic.description}</h5>
                                                                </div>
                                                                {topic.suggestedResources && topic.suggestedResources.length > 0 && (
                                                                    <div className="flex flex-col gap-1.5 mt-2">
                                                                        {topic.suggestedResources.slice(0, 3).map((res, j) => (
                                                                            <a
                                                                                key={j}
                                                                                href={res.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 transition-colors"
                                                                            >
                                                                                <BookOpen className="w-3 h-3" />
                                                                                {res.title || res.type}
                                                                            </a>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {!isItemFocused && (
                                                                <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Share Item */}
                            {week.shareSection && (() => {
                                const shareTaskId = getTaskId({ type: 'share', data: week.shareSection }, week);
                                const isCompleted = taskCompletions[shareTaskId]?.isCompleted;

                                return (
                                    <div
                                        onClick={() => setFocusedItem({ type: 'share', data: week.shareSection })}
                                        className={`relative cursor-pointer group ${isFocused({ type: 'share', data: week.shareSection }) ? 'pointer-events-none' : ''}`}
                                    >
                                        <div className={cn(
                                            "bg-surface border p-3 rounded-xl transition-all relative overflow-hidden",
                                            isCompleted
                                                ? "border-green-500/30 bg-green-500/5"
                                                : isFocused({ type: 'share', data: week.shareSection })
                                                    ? 'border-green-500 shadow-lg shadow-green-500/10'
                                                    : 'border-border hover:border-green-500 hover:shadow-md group-hover:-translate-y-0.5'
                                        )}>
                                            <div className={cn(
                                                "absolute inset-0 transition-colors",
                                                isCompleted
                                                    ? ""
                                                    : isFocused({ type: 'share', data: week.shareSection })
                                                        ? 'bg-green-500/5'
                                                        : 'bg-green-500/0 group-hover:bg-green-500/5'
                                            )} />

                                            {/* Completion checkmark badge */}
                                            {isCompleted && (
                                                <div className="absolute top-2 right-2 z-20">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                                        <Share2 className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-0.5">Share</div>
                                                        <h4 className="text-sm font-bold text-text-primary">{week.shareSection.artifactTitle}</h4>
                                                    </div>
                                                </div>
                                                {isFocused({ type: 'share', data: week.shareSection }) ? (
                                                    <div className="flex items-center gap-2 text-xs font-bold text-green-600 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800">
                                                        <Sparkles className="w-3 h-3" />
                                                        In Focus
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-xs font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                                        Focus Task <ArrowRight className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: AI Copilot (Sticky) */}
            <div className="hidden lg:flex w-80 xl:w-96 border-l border-border bg-surface flex-col shrink-0 z-20 shadow-xl">
                {/* Copilot Header */}
                <div className="h-16 border-b border-border flex items-center px-6 gap-3 bg-surface">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-md">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-text-primary">AI Copilot</div>
                        <div className="text-[10px] text-text-tertiary flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Connected to {focusedItem?.type === 'build' ? 'Build' : focusedItem?.type === 'research' ? 'Research' : 'Share'}
                        </div>
                    </div>
                </div>

                {/* Chat Area (Placeholder) */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-bg-secondary">
                    {/* AI Welcome Message */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shrink-0 text-xs">
                            AI
                        </div>
                        <div className="space-y-2">
                            <div className="bg-surface border border-border rounded-2xl rounded-tl-none p-4 text-sm text-text-secondary shadow-sm">
                                <p>Hi! I'm ready to help you with <b>{focusedItem?.type === 'build' ? 'building the project' : focusedItem?.type === 'research' ? 'researching topics' : 'sharing your work'}</b>.</p>
                                <p className="mt-2">Here is some context I have:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-xs text-text-tertiary">
                                    {focusedItem?.type === 'build' && <li>Stack: {week.buildSection?.technicalStack?.join(', ')}</li>}
                                    {focusedItem?.type === 'research' && <li>{week.researchSection?.deepDiveTopics?.length} Topics to cover</li>}
                                    {focusedItem?.type === 'share' && <li>Artifact: {week.shareSection?.artifactTitle}</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-surface">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask about this task..."
                            className="w-full bg-bg-secondary border border-border rounded-xl py-3 pl-4 pr-12 text-sm text-text-primary focus:outline-none focus:border-primary transition-colors"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-on-primary rounded-lg hover:opacity-90 transition-opacity">
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Component ---

interface ProgressiveRoadmapProps {
    roadmap: Roadmap;
}

export default function ProgressiveRoadmap({ roadmap }: ProgressiveRoadmapProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('phases');
    const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
    const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
    const [focusedItem, setFocusedItem] = useState<FocusItem | null>(null);

    // Timer and completion tracking
    const [taskTimer, setTaskTimer] = useState<TaskTimerState>({
        taskId: null,
        isRunning: false,
        isPaused: false,
        totalElapsedSeconds: 0,
        currentSessionStart: null,
        isCompleted: false
    });
    const [taskCompletions, setTaskCompletions] = useState<TaskCompletionMap>({});
    const [copilotContext, setCopilotContext] = useState<string>('');

    // Refs for scroll containers
    const phasesScrollRef = useRef<HTMLDivElement>(null);
    const weeksScrollRef = useRef<HTMLDivElement>(null);

    // Scroll navigation handlers
    const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (!ref.current) return;
        const scrollAmount = ref.current.clientWidth * 0.8;
        ref.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    // Helper to find the next logical task (Resume from last progress)
    const handleResume = () => {
        // Find the first incomplete item across the ENTIRE roadmap
        for (const phase of roadmap.phases) {
            for (const w of phase.weeks) {
                // 1. Check Build
                if (w.buildSection) {
                    const isBuildComplete = w.buildSection.deliverables && w.buildSection.deliverables.length > 0
                        ? w.buildSection.deliverables.every(d => d.isCompleted)
                        : false;

                    if (!isBuildComplete) {
                        if (w.weekNumber !== selectedWeekId) {
                            setSelectedPhaseId(phase.phaseNumber);
                            setSelectedWeekId(w.weekNumber);
                            setViewMode('tasks');
                        }
                        setFocusedItem({ type: 'build', data: w.buildSection });
                        return;
                    }
                }

                // 2. Check Research
                if (w.researchSection?.deepDiveTopics) {
                    for (const topic of w.researchSection.deepDiveTopics) {
                        if (!topic.isCompleted) {
                            if (w.weekNumber !== selectedWeekId) {
                                setSelectedPhaseId(phase.phaseNumber);
                                setSelectedWeekId(w.weekNumber);
                                setSelectedPhaseId(phase.phaseNumber);
                                setViewMode('tasks');
                            }
                            setFocusedItem({ type: 'research', data: topic });
                            return;
                        }
                    }
                }

                // 3. Check Share
                if (w.shareSection) {
                    const isShareComplete = w.shareSection.deliverables && w.shareSection.deliverables.length > 0
                        ? w.shareSection.deliverables.every(d => d.isCompleted)
                        : false;

                    if (!isShareComplete) {
                        if (w.weekNumber !== selectedWeekId) {
                            setSelectedPhaseId(phase.phaseNumber);
                            setSelectedWeekId(w.weekNumber);
                            setViewMode('tasks');
                        }
                        setFocusedItem({ type: 'share', data: w.shareSection });
                        return;
                    }
                }
            }
        }

        // Fallback: Go to last week
        const allWeeks = roadmap.phases.flatMap(p => p.weeks);
        if (allWeeks.length > 0) {
            const lastWeek = allWeeks[allWeeks.length - 1];
            // Find phase for last week
            const lastPhase = roadmap.phases.find(p => p.weeks.some(w => w.weekNumber === lastWeek.weekNumber));

            if (lastWeek.weekNumber !== selectedWeekId) {
                if (lastPhase) setSelectedPhaseId(lastPhase.phaseNumber);
                setSelectedWeekId(lastWeek.weekNumber);
                setViewMode('tasks');
            }
        }
    };

    // Timer helper functions
    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hrs > 0) {
            return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTaskId = (item: FocusItem, week: Week): string => {
        if (item.type === 'build') {
            return `build-${week.weekNumber}`;
        } else if (item.type === 'research' && item.data) {
            const index = week.researchSection?.deepDiveTopics?.findIndex(t => t.description === item.data?.description) ?? 0;
            return `research-${week.weekNumber}-${index}`;
        } else if (item.type === 'share') {
            return `share-${week.weekNumber}`;
        }
        return '';
    };

    const generateTaskContext = (item: FocusItem, week: Week): string => {
        if (item.type === 'build' && week.buildSection) {
            return `**Project:** ${week.buildSection.projectTitle}\n**Description:** ${week.buildSection.description}\n**Tech Stack:** ${week.buildSection.technicalStack?.join(', ') || 'N/A'}\n\n**Key Deliverables:**\n${week.buildSection.deliverables?.map(d => `- ${d.description}`).join('\n') || 'None'}`;
        }

        if (item.type === 'research' && item.data) {
            return `**Topic:** ${item.data.description}\n\n**Subtasks:**\n${item.data.subtasks?.map(s => `- ${s.description}`).join('\n') || 'None'}\n\n**Resources:**\n${item.data.suggestedResources?.map(r => `- [${r.title}](${r.url})`).join('\n') || 'None'}`;
        }

        if (item.type === 'share' && week.shareSection) {
            return `**Artifact:** ${week.shareSection.artifactTitle}\n**Description:** ${week.shareSection.artifactDescription}\n\n**Checklist:**\n${week.shareSection.details?.map(d => `- ${d}`).join('\n') || 'None'}\n\n**Tags:** ${week.shareSection.tags?.join(', ') || 'None'}`;
        }

        return '';
    };

    const handleStartTask = async () => {
        if (!focusedItem || !selectedWeek) return;

        const taskId = getTaskId(focusedItem, selectedWeek);
        const context = generateTaskContext(focusedItem, selectedWeek);

        setTaskTimer({
            taskId,
            isRunning: true,
            isPaused: false,
            totalElapsedSeconds: 0,
            currentSessionStart: Date.now(),
            isCompleted: false
        });

        setCopilotContext(context);

        // Call backend API to start task
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/roadmaps/${roadmap.id}/tasks/start`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase_number: selectedPhase?.phaseNumber,
                    week_number: selectedWeek.weekNumber,
                    section_type: focusedItem.type,
                    deliverable_path: taskId // Using taskId as unique path for now
                })
            });
        } catch (error) {
            console.error('Failed to start task:', error);
        }
    };

    const handlePauseTask = async () => {
        if (!taskTimer.isRunning || !taskTimer.currentSessionStart) return;

        const now = Date.now();
        const sessionElapsed = Math.floor((now - taskTimer.currentSessionStart) / 1000);
        const newTotal = taskTimer.totalElapsedSeconds + sessionElapsed;

        setTaskTimer(prev => ({
            ...prev,
            isRunning: false,
            isPaused: true,
            totalElapsedSeconds: newTotal,
            currentSessionStart: null
        }));

        // Call backend API to pause task
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/roadmaps/${roadmap.id}/tasks/pause`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase_number: selectedPhase?.phaseNumber, // Not strictly needed for pause but good for validation
                    week_number: selectedWeek?.weekNumber,
                    section_type: focusedItem?.type,
                    deliverable_path: taskTimer.taskId
                })
            });
        } catch (error) {
            console.error('Failed to pause task:', error);
        }
    };

    const handleResumeTask = async () => {
        setTaskTimer(prev => ({
            ...prev,
            isRunning: true,
            isPaused: false,
            currentSessionStart: Date.now()
        }));

        // Call backend API to resume task
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/roadmaps/${roadmap.id}/tasks/resume`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase_number: selectedPhase?.phaseNumber,
                    week_number: selectedWeek?.weekNumber,
                    section_type: focusedItem?.type,
                    deliverable_path: taskTimer.taskId
                })
            });
        } catch (error) {
            console.error('Failed to resume task:', error);
        }
    };

    const handleMarkComplete = async () => {
        if (!taskTimer.taskId) return;

        let finalTime = taskTimer.totalElapsedSeconds;
        if (taskTimer.isRunning && taskTimer.currentSessionStart) {
            const sessionElapsed = Math.floor((Date.now() - taskTimer.currentSessionStart) / 1000);
            finalTime += sessionElapsed;
        }

        const completedAt = new Date().toISOString();

        setTaskCompletions(prev => ({
            ...prev,
            [taskTimer.taskId!]: {
                isCompleted: true,
                totalTimeSpent: finalTime,
                completedAt
            }
        }));

        setTaskTimer({
            taskId: null,
            isRunning: false,
            isPaused: false,
            totalElapsedSeconds: 0,
            currentSessionStart: null,
            isCompleted: true
        });

        // Call backend API to mark complete
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/roadmaps/${roadmap.id}/progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phase_number: selectedPhase?.phaseNumber,
                    week_number: selectedWeek?.weekNumber,
                    section_type: focusedItem?.type,
                    deliverable_path: taskTimer.taskId,
                    is_completed: true,
                    total_time_spent_seconds: finalTime
                })
            });

        } catch (error) {
            console.error('Failed to complete task:', error);
        }
    };

    // Get selected phase and week
    const selectedPhase = roadmap.phases.find(p => p.phaseNumber === selectedPhaseId);
    const selectedWeek = selectedPhase?.weeks.find(w => w.weekNumber === selectedWeekId);

    // Timer tick effect
    useEffect(() => {
        if (!taskTimer.isRunning || taskTimer.isPaused || !taskTimer.currentSessionStart) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const sessionElapsed = Math.floor((now - taskTimer.currentSessionStart!) / 1000);

            setTaskTimer(prev => ({
                ...prev,
                totalElapsedSeconds: prev.totalElapsedSeconds + 1
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [taskTimer.isRunning, taskTimer.isPaused, taskTimer.currentSessionStart]);

    // Load task status when focused item changes
    useEffect(() => {
        if (!focusedItem || !selectedWeek) return;

        const taskId = getTaskId(focusedItem, selectedWeek);
        const completion = taskCompletions[taskId];

        if (completion?.isCompleted) {
            setTaskTimer({
                taskId,
                isRunning: false,
                isPaused: false,
                totalElapsedSeconds: completion.totalTimeSpent,
                currentSessionStart: null,
                isCompleted: true
            });
        } else {
            // TODO: Load from backend or localStorage
            setTaskTimer({
                taskId,
                isRunning: false,
                isPaused: false,
                totalElapsedSeconds: 0,
                currentSessionStart: null,
                isCompleted: false
            });
        }
    }, [focusedItem, selectedWeek]);

    // Load task completions from localStorage on mount
    useEffect(() => {
        const storageKey = `roadmap-${roadmap.id}-completions`;
        const saved = localStorage.getItem(storageKey);

        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setTaskCompletions(parsed);
            } catch (error) {
                console.error('Failed to load task completions from localStorage:', error);
            }
        }
    }, [roadmap.id]);

    // Save task completions to localStorage whenever they change
    useEffect(() => {
        const storageKey = `roadmap-${roadmap.id}-completions`;
        localStorage.setItem(storageKey, JSON.stringify(taskCompletions));
    }, [taskCompletions, roadmap.id]);


    const handlePhaseClick = (phaseId: number) => {
        setSelectedPhaseId(phaseId);
        setViewMode('weeks');
    };

    const handleWeekClick = (weekId: number) => {
        setSelectedWeekId(weekId);
        setViewMode('tasks');
        setFocusedItem(null);
    };

    const handleBackToPhases = () => {
        setViewMode('phases');
        setSelectedPhaseId(null);
        setSelectedWeekId(null);
    };

    const handleBackToWeeks = () => {
        setViewMode('weeks');
        setSelectedWeekId(null);
    };

    return (
        <div className="h-screen bg-bg-secondary text-text-primary font-sans flex flex-col overflow-hidden">

            {/* Top Navigation Bar */}
            <div className="bg-surface border-b border-border shrink-0 z-30 transition-all">
                <div className="flex items-center px-4 h-16">
                    <Link href="/viewer" className="mr-6 p-2 text-text-secondary hover:text-text-primary transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    {/* Breadcrumbs / Title */}
                    <div className="flex items-center gap-2 text-sm">
                        <button
                            onClick={handleBackToPhases}
                            className={cn("font-bold hover:text-primary transition-colors", viewMode === 'phases' ? "text-text-primary" : "text-text-secondary")}
                        >
                            Roadmap
                        </button>
                        {selectedPhase && (
                            <>
                                <ChevronRight className="w-4 h-4 text-text-tertiary" />
                                <button
                                    onClick={handleBackToWeeks}
                                    className={cn("font-bold hover:text-primary transition-colors", viewMode === 'weeks' ? "text-text-primary" : "text-text-secondary")}
                                >
                                    Phase {selectedPhase.phaseNumber}
                                </button>
                            </>
                        )}
                        {selectedWeek && (
                            <>
                                <ChevronRight className="w-4 h-4 text-text-tertiary" />
                                <span className="font-bold text-text-primary">Week {selectedWeek.weekNumber}</span>
                            </>
                        )}
                    </div>

                    {/* Resume Button */}
                    <div className="ml-auto">
                        <button
                            onClick={handleResume}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="hidden sm:inline">Resume where you left off</span>
                            <span className="sm:hidden">Resume</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Phase Tabs (Visible in Weeks and Tasks mode) */}
                <AnimatePresence>
                    {viewMode !== 'phases' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex gap-2 overflow-x-auto no-scrollbar px-4">
                                {roadmap.phases.map((phase) => (
                                    <PhaseTab
                                        key={phase.phaseNumber}
                                        phase={phase}
                                        isActive={selectedPhaseId === phase.phaseNumber}
                                        onClick={() => {
                                            setSelectedPhaseId(phase.phaseNumber);
                                            // If in tasks mode, reset to weeks mode when switching phases?
                                            // Or stay in tasks mode and show first week?
                                            // Let's reset to weeks mode for clarity as per requirement "I want to see the weeks"
                                            setViewMode('weeks');
                                            setSelectedWeekId(null);
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Week Stream (Visible ONLY in Tasks mode) */}
            <AnimatePresence>
                {viewMode === 'tasks' && selectedPhase && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: '6rem', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-surface/50 border-b border-border flex shrink-0 z-20 relative shadow-sm backdrop-blur-sm overflow-hidden"
                    >
                        <div className="flex-1 flex overflow-x-auto no-scrollbar">
                            {selectedPhase.weeks.map((week) => (
                                <TimelineNode
                                    key={week.weekNumber}
                                    week={week}
                                    isActive={selectedWeekId === week.weekNumber}
                                    isCompleted={week.weekNumber < (selectedWeekId || 0)}
                                    onClick={() => handleWeekClick(week.weekNumber)}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto bg-bg-secondary/30 px-4 sm:px-6 py-4 sm:py-6">
                <AnimatePresence mode="wait">

                    {/* View 1: Phases Cinematic Timeline */}
                    {viewMode === 'phases' && (
                        <motion.div
                            key="phases-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col"
                        >
                            {/* Section Header */}
                            <div className="mb-4 sm:mb-6 px-2 sm:px-6">
                                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2">Learning Phases</h2>
                                <p className="text-sm text-text-secondary">Choose a phase to begin your journey</p>
                            </div>

                            {/* Phase Cards Carousel */}
                            <div className="relative group/carousel">
                                {/* Left Navigation Button */}
                                <button
                                    onClick={() => scrollContainer(phasesScrollRef, 'left')}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
                                </button>

                                {/* Right Navigation Button */}
                                <button
                                    onClick={() => scrollContainer(phasesScrollRef, 'right')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
                                </button>

                                <div ref={phasesScrollRef} className="flex-1 flex items-start overflow-x-auto snap-x snap-mandatory px-2 sm:px-6 gap-4 sm:gap-6 md:gap-8 no-scrollbar pb-4">
                                    {roadmap.phases.map((phase) => (
                                        <PhaseCinematic
                                            key={phase.phaseNumber}
                                            phase={phase}
                                            onClick={() => handlePhaseClick(phase.phaseNumber)}
                                        />
                                    ))}
                                    {/* Spacer for end of scroll */}
                                    <div className="w-4 sm:w-6 shrink-0" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* View 2: Weeks Horizontal Filmstrip */}
                    {viewMode === 'weeks' && selectedPhase && (
                        <motion.div
                            key="weeks-filmstrip"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="h-full flex flex-col"
                        >
                            {/* Section Header */}
                            <div className="mb-4 sm:mb-6 px-2 sm:px-6 shrink-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2">{selectedPhase.title}</h2>
                                <p className="text-sm text-text-secondary">{selectedPhase.summary}</p>
                            </div>

                            <div className="relative group/carousel">
                                {/* Left Navigation Button */}
                                <button
                                    onClick={() => scrollContainer(weeksScrollRef, 'left')}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
                                </button>

                                {/* Right Navigation Button */}
                                <button
                                    onClick={() => scrollContainer(weeksScrollRef, 'right')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-surface/90 hover:bg-surface border border-border rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-text-primary" />
                                </button>

                                <div ref={weeksScrollRef} className="flex items-center overflow-x-auto snap-x snap-mandatory px-12 gap-8 no-scrollbar pb-12">
                                    {selectedPhase.weeks.map((week) => (
                                        <WeekCard
                                            key={week.weekNumber}
                                            week={week}
                                            onClick={() => handleWeekClick(week.weekNumber)}
                                        />
                                    ))}
                                    {/* Spacer */}
                                    <div className="w-12 shrink-0" />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* View 3: Task Dashboard */}
                    {viewMode === 'tasks' && selectedWeek && (
                        <motion.div
                            key="task-dashboard"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="h-full"
                        >
                            <TaskDetailView
                                week={selectedWeek}
                                roadmap={roadmap}
                                setSelectedWeekId={setSelectedWeekId}
                                focusedItem={focusedItem}
                                setFocusedItem={setFocusedItem}
                                taskTimer={taskTimer}
                                handleStartTask={handleStartTask}
                                handlePauseTask={handlePauseTask}
                                handleResumeTask={handleResumeTask}
                                handleMarkComplete={handleMarkComplete}
                                formatTime={formatTime}
                                taskCompletions={taskCompletions}
                                getTaskId={getTaskId}
                            />
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div >
    );
}
