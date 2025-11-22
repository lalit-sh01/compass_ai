'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Plus, Upload, Settings, TrendingUp, Clock, Calendar, Target, Zap, Search, Filter, ChevronRight, BarChart3, Activity } from 'lucide-react';
import { useState } from 'react';
import { mockRoadmaps } from './ElevatedGrid';

// Mock analytics data
const mockAnalytics = {
    weeklyActivity: [
        { day: 'Mon', hours: 2.5 },
        { day: 'Tue', hours: 3.2 },
        { day: 'Wed', hours: 1.8 },
        { day: 'Thu', hours: 4.1 },
        { day: 'Fri', hours: 2.9 },
        { day: 'Sat', hours: 5.3 },
        { day: 'Sun', hours: 3.7 },
    ],
    totalHoursThisWeek: 23.5,
    totalHoursLastWeek: 18.2,
    streakDays: 12,
    completionRate: 78,
};

interface CommandCenterProps {
    hasApiKey?: boolean;
}

export default function CommandCenter({ hasApiKey = true }: CommandCenterProps) {
    const [roadmaps] = useState(mockRoadmaps);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    const filteredRoadmaps = roadmaps.filter(roadmap => {
        const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || roadmap.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: roadmaps.length,
        inProgress: roadmaps.filter(r => r.status === 'in_progress').length,
        completed: roadmaps.filter(r => r.status === 'completed').length,
        notStarted: roadmaps.filter(r => r.status === 'not_started').length,
    };

    const maxHours = Math.max(...mockAnalytics.weeklyActivity.map(d => d.hours));

    return (
        <div className="min-h-screen bg-bg-primary flex">
            {/* Left Sidebar - Analytics & Filters */}
            <div className="w-80 border-r border-border bg-surface p-6 space-y-6 overflow-y-auto">
                {/* Quick Stats */}
                <div>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                        Overview
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                        >
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {stats.inProgress}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">Active</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 }}
                            className="p-3 rounded-lg bg-green-500/10 border border-green-500/20"
                        >
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {stats.completed}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">Done</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="p-3 rounded-lg bg-gray-500/10 border border-gray-500/20"
                        >
                            <div className="text-2xl font-bold text-text-primary">
                                {stats.notStarted}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">Queued</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 }}
                            className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                        >
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {stats.total}
                            </div>
                            <div className="text-xs text-text-secondary mt-1">Total</div>
                        </motion.div>
                    </div>
                </div>

                {/* Weekly Activity */}
                <div>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                        This Week
                    </h2>
                    <div className="space-y-4">
                        {/* Hours Comparison */}
                        <div className="p-4 rounded-lg bg-bg-secondary border border-border">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-text-secondary">Learning Time</span>
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                    +{((mockAnalytics.totalHoursThisWeek - mockAnalytics.totalHoursLastWeek) / mockAnalytics.totalHoursLastWeek * 100).toFixed(0)}%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-text-primary">
                                {mockAnalytics.totalHoursThisWeek}h
                            </div>
                            <div className="text-xs text-text-secondary mt-1">
                                vs {mockAnalytics.totalHoursLastWeek}h last week
                            </div>
                        </div>

                        {/* Activity Heatmap */}
                        <div className="p-4 rounded-lg bg-bg-secondary border border-border">
                            <div className="text-xs text-text-secondary mb-3">Daily Activity</div>
                            <div className="flex items-end justify-between gap-1.5 h-24">
                                {mockAnalytics.weeklyActivity.map((day, i) => (
                                    <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="w-full bg-primary rounded-sm min-h-[4px]"
                                            title={`${day.hours}h`}
                                        />
                                        <span className="text-[10px] text-text-secondary">{day.day[0]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Streak */}
                        <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-1">
                                <Zap className="w-4 h-4 text-orange-500" />
                                <span className="text-xs text-text-secondary">Current Streak</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                {mockAnalytics.streakDays} days
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div>
                    <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                        Filters
                    </h2>
                    <div className="space-y-2">
                        {[
                            { value: 'all', label: 'All Roadmaps', count: stats.total },
                            { value: 'in_progress', label: 'In Progress', count: stats.inProgress },
                            { value: 'not_started', label: 'Not Started', count: stats.notStarted },
                            { value: 'completed', label: 'Completed', count: stats.completed },
                        ].map((filter) => (
                            <button
                                key={filter.value}
                                onClick={() => setFilterStatus(filter.value)}
                                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors
                  ${filterStatus === filter.value
                                        ? 'bg-primary text-on-primary'
                                        : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                                    }
                `}
                            >
                                <span>{filter.label}</span>
                                <span className={`text-xs ${filterStatus === filter.value ? 'text-on-primary/70' : 'text-text-tertiary'}`}>
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="pt-4 border-t border-border">
                    <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-3">
                        Shortcuts
                    </h2>
                    <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary">New Roadmap</span>
                            <kbd className="px-2 py-0.5 rounded bg-bg-secondary border border-border text-text-primary font-mono">N</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary">Search</span>
                            <kbd className="px-2 py-0.5 rounded bg-bg-secondary border border-border text-text-primary font-mono">/</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-text-secondary">Settings</span>
                            <kbd className="px-2 py-0.5 rounded bg-bg-secondary border border-border text-text-primary font-mono">S</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                {/* Sticky Top Bar */}
                <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
                    <div className="px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                            {/* Search */}
                            <div className="flex-1 max-w-md relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                <input
                                    type="text"
                                    placeholder="Search roadmaps... (Press / to focus)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/onboarding"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover transition-colors font-medium text-sm shadow-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    New
                                    <kbd className="ml-1 px-1.5 py-0.5 rounded bg-on-primary/20 text-xs font-mono">N</kbd>
                                </Link>
                                <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors border border-border">
                                    <Upload className="w-4 h-4" />
                                </button>
                                <Link href="/settings">
                                    <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors border border-border">
                                        <Settings className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Roadmaps List */}
                <div className="px-8 py-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-text-primary font-primary">
                            Learning Roadmaps
                            <span className="ml-3 text-sm font-normal text-text-secondary">
                                ({filteredRoadmaps.length} {filteredRoadmaps.length === 1 ? 'roadmap' : 'roadmaps'})
                            </span>
                        </h1>
                    </div>

                    {/* Compact List View */}
                    <div className="space-y-2">
                        {filteredRoadmaps.map((roadmap, index) => (
                            <motion.div
                                key={roadmap.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <Link href={`/viewer/experiments/progressive?roadmapId=${roadmap.id}`}>
                                    <div className="group flex items-center gap-4 p-4 rounded-lg border border-border bg-surface hover:border-primary hover:shadow-md transition-all">
                                        {/* Status Indicator */}
                                        <div className={`w-1 h-12 rounded-full ${roadmap.status === 'completed' ? 'bg-green-500' :
                                                roadmap.status === 'in_progress' ? 'bg-blue-500' :
                                                    roadmap.status === 'paused' ? 'bg-yellow-500' :
                                                        'bg-gray-500'
                                            }`} />

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors truncate">
                                                    {roadmap.title}
                                                </h3>
                                                <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${roadmap.status === 'completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                                                        roadmap.status === 'in_progress' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                                                            roadmap.status === 'paused' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                                                                'bg-gray-500/10 text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {roadmap.progress}%
                                                </span>
                                            </div>
                                            <p className="text-sm text-text-secondary truncate">
                                                {roadmap.description}
                                            </p>
                                        </div>

                                        {/* Metadata */}
                                        <div className="flex items-center gap-6 text-xs text-text-secondary">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{roadmap.completedWeeks}/{roadmap.totalWeeks} weeks</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{roadmap.lastAccessed}</span>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-32 flex-shrink-0">
                                            <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${roadmap.status === 'completed' ? 'bg-green-500' :
                                                            roadmap.status === 'in_progress' ? 'bg-blue-500' :
                                                                roadmap.status === 'paused' ? 'bg-yellow-500' :
                                                                    'bg-gray-500'
                                                        }`}
                                                    style={{ width: `${roadmap.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Action */}
                                        <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors flex-shrink-0" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {filteredRoadmaps.length === 0 && (
                        <div className="text-center py-12">
                            <Search className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-text-primary mb-2">No roadmaps found</h3>
                            <p className="text-sm text-text-secondary">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
