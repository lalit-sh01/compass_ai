'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, Archive, Share2, Trash2, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';

// Mock data for the experiment
export const mockRoadmaps = [
    {
        id: '1',
        title: 'AI Product Manager Roadmap',
        description: 'Master AI product management from fundamentals to advanced topics',
        status: 'in_progress' as const,
        progress: 45,
        totalWeeks: 12,
        completedWeeks: 5,
        lastAccessed: '2 hours ago',
        createdAt: 'Jan 15, 2025',
        tags: ['AI', 'Product Management', 'Leadership']
    },
    {
        id: '2',
        title: 'Full Stack Development',
        description: 'Complete guide to modern web development with React and Node.js',
        status: 'in_progress' as const,
        progress: 78,
        totalWeeks: 16,
        completedWeeks: 12,
        lastAccessed: '1 day ago',
        createdAt: 'Dec 1, 2024',
        tags: ['Web Dev', 'React', 'Node.js']
    },
    {
        id: '3',
        title: 'Machine Learning Fundamentals',
        description: 'Learn ML from scratch with hands-on projects',
        status: 'not_started' as const,
        progress: 0,
        totalWeeks: 10,
        completedWeeks: 0,
        lastAccessed: 'Never',
        createdAt: 'Jan 20, 2025',
        tags: ['ML', 'Python', 'Data Science']
    },
    {
        id: '4',
        title: 'System Design Interview Prep',
        description: 'Ace your system design interviews at top tech companies',
        status: 'completed' as const,
        progress: 100,
        totalWeeks: 8,
        completedWeeks: 8,
        lastAccessed: '3 days ago',
        createdAt: 'Nov 10, 2024',
        tags: ['System Design', 'Interviews']
    },
    {
        id: '5',
        title: 'Data Structures & Algorithms',
        description: 'Master DSA for coding interviews',
        status: 'in_progress' as const,
        progress: 23,
        totalWeeks: 14,
        completedWeeks: 3,
        lastAccessed: '5 hours ago',
        createdAt: 'Jan 5, 2025',
        tags: ['DSA', 'Coding', 'Interviews']
    },
    {
        id: '6',
        title: 'UX Design Principles',
        description: 'Learn user-centered design and prototyping',
        status: 'paused' as const,
        progress: 60,
        totalWeeks: 6,
        completedWeeks: 3,
        lastAccessed: '2 weeks ago',
        createdAt: 'Dec 15, 2024',
        tags: ['UX', 'Design', 'Figma']
    },
];

type RoadmapStatus = 'in_progress' | 'not_started' | 'completed' | 'paused';

interface RoadmapCardProps {
    roadmap: typeof mockRoadmaps[0];
    onDelete?: (id: string) => void;
}

function RoadmapCard({ roadmap, onDelete }: RoadmapCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showActions, setShowActions] = useState(false);

    const statusConfig = {
        in_progress: {
            label: 'In Progress',
            color: 'text-blue-600 dark:text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            glow: 'shadow-blue-500/20'
        },
        not_started: {
            label: 'Not Started',
            color: 'text-gray-600 dark:text-gray-400',
            bg: 'bg-gray-500/10',
            border: 'border-gray-500/30',
            glow: 'shadow-gray-500/20'
        },
        completed: {
            label: 'Completed',
            color: 'text-green-600 dark:text-green-400',
            bg: 'bg-green-500/10',
            border: 'border-green-500/30',
            glow: 'shadow-green-500/20'
        },
        paused: {
            label: 'Paused',
            color: 'text-yellow-600 dark:text-yellow-400',
            bg: 'bg-yellow-500/10',
            border: 'border-yellow-500/30',
            glow: 'shadow-yellow-500/20'
        }
    };

    const config = statusConfig[roadmap.status];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onHoverStart={() => { setIsHovered(true); setShowActions(true); }}
            onHoverEnd={() => { setIsHovered(false); setShowActions(false); }}
            className="group relative"
        >
            <Link href={`/viewer/experiments/progressive?roadmapId=${roadmap.id}`}>
                <div
                    className={`
            relative overflow-hidden rounded-xl border bg-surface p-5
            transition-all duration-300
            ${config.border}
            ${isHovered ? `${config.glow} shadow-lg -translate-y-1` : 'shadow-sm'}
          `}
                >
                    {/* Status Badge */}
                    <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                            {roadmap.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                            {roadmap.status === 'in_progress' && <Clock className="w-3 h-3" />}
                            {config.label}
                        </span>

                        {/* Progress Percentage */}
                        <span className="text-sm font-semibold text-text-primary">
                            {roadmap.progress}%
                        </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold text-text-primary font-primary mb-2 line-clamp-1">
                        {roadmap.title}
                    </h3>
                    <p className="text-sm text-text-secondary font-secondary mb-4 line-clamp-2">
                        {roadmap.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {roadmap.completedWeeks}/{roadmap.totalWeeks} weeks
                        </span>
                        <span>•</span>
                        <span>{roadmap.lastAccessed}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {roadmap.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 text-xs rounded-md bg-bg-secondary text-text-secondary border border-border"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${roadmap.progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${roadmap.status === 'completed' ? 'bg-green-500' :
                                    roadmap.status === 'in_progress' ? 'bg-blue-500' :
                                        roadmap.status === 'paused' ? 'bg-yellow-500' :
                                            'bg-gray-500'
                                }`}
                        />
                    </div>

                    {/* Hover Gradient Overlay */}
                    <div
                        className={`
              absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
            `}
                    />
                </div>
            </Link>

            {/* Hover Actions */}
            <AnimatePresence>
                {showActions && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10"
                    >
                        <Link href={`/viewer/experiments/progressive?roadmapId=${roadmap.id}`}>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium shadow-lg hover:bg-primary-hover transition-colors">
                                <Play className="w-3.5 h-3.5" />
                                Continue
                            </button>
                        </Link>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-primary hover:text-primary transition-colors">
                            <Share2 className="w-3.5 h-3.5" />
                            Share
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-yellow-500 hover:text-yellow-600 transition-colors">
                            <Archive className="w-3.5 h-3.5" />
                            Archive
                        </button>
                        {onDelete && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(roadmap.id);
                                }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-red-500 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

interface ElevatedGridProps {
    hasApiKey?: boolean;
}

export default function ElevatedGrid({ hasApiKey = true }: ElevatedGridProps) {
    const [roadmaps, setRoadmaps] = useState(mockRoadmaps);
    const [expandedSections, setExpandedSections] = useState({
        in_progress: true,
        not_started: true,
        completed: true,
        paused: true
    });

    const groupedRoadmaps = {
        in_progress: roadmaps.filter(r => r.status === 'in_progress'),
        not_started: roadmaps.filter(r => r.status === 'not_started'),
        paused: roadmaps.filter(r => r.status === 'paused'),
        completed: roadmaps.filter(r => r.status === 'completed'),
    };

    const sectionConfig = {
        in_progress: { title: 'In Progress', icon: Clock, color: 'text-blue-600 dark:text-blue-400' },
        not_started: { title: 'Not Started', icon: Calendar, color: 'text-gray-600 dark:text-gray-400' },
        paused: { title: 'Paused', icon: Archive, color: 'text-yellow-600 dark:text-yellow-400' },
        completed: { title: 'Completed', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400' },
    };

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleDelete = (id: string) => {
        setRoadmaps(roadmaps.filter(r => r.id !== id));
    };

    const stats = {
        total: roadmaps.length,
        inProgress: groupedRoadmaps.in_progress.length,
        completed: groupedRoadmaps.completed.length,
    };

    return (
        <div className="min-h-screen bg-bg-primary">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Header with Inline Stats */}
                <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary font-primary">
                            My Roadmaps
                        </h1>
                        {stats.total > 0 && (
                            <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="font-semibold text-text-primary">{stats.total}</span> total
                                </motion.span>
                                <span className="text-border">•</span>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="font-semibold text-primary">{stats.inProgress}</span> in progress
                                </motion.span>
                                <span className="text-border">•</span>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center gap-1"
                                >
                                    <span className="font-semibold text-green-600 dark:text-green-400">{stats.completed}</span> completed
                                </motion.span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/onboarding"
                            className={`inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-all font-medium shadow-sm hover:shadow-lg glow-accent ${!hasApiKey ? 'opacity-50 pointer-events-none' : ''
                                }`}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            New Roadmap
                        </Link>
                    </div>
                </div>

                {/* Grouped Roadmaps */}
                <div className="space-y-8">
                    {(Object.keys(groupedRoadmaps) as Array<keyof typeof groupedRoadmaps>).map((status) => {
                        const roadmapsInSection = groupedRoadmaps[status];
                        if (roadmapsInSection.length === 0) return null;

                        const config = sectionConfig[status];
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={status}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(status)}
                                    className="flex items-center gap-3 w-full group"
                                >
                                    <Icon className={`w-5 h-5 ${config.color}`} />
                                    <h2 className="text-lg font-semibold text-text-primary font-primary">
                                        {config.title}
                                    </h2>
                                    <span className="text-sm text-text-secondary">
                                        ({roadmapsInSection.length})
                                    </span>
                                    <div className="flex-1 h-px bg-border" />
                                    <motion.svg
                                        animate={{ rotate: expandedSections[status] ? 180 : 0 }}
                                        className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                </button>

                                {/* Section Content */}
                                <AnimatePresence>
                                    {expandedSections[status] && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        >
                                            {roadmapsInSection.map((roadmap) => (
                                                <RoadmapCard
                                                    key={roadmap.id}
                                                    roadmap={roadmap}
                                                    onDelete={handleDelete}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
