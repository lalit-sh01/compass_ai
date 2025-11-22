'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Play, Plus, Upload, Settings, Clock, Calendar, ChevronRight, ChevronDown, Zap, TrendingUp, Search, PanelLeftClose, PanelLeft, Archive, Share2, Trash2 } from 'lucide-react';
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
};

interface HybridDashboardProps {
    hasApiKey?: boolean;
}

export default function HybridDashboard({ hasApiKey = true }: HybridDashboardProps) {
    const [roadmaps, setRoadmaps] = useState(mockRoadmaps);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        in_progress: true,
        not_started: true,
        completed: true,
        paused: true
    });
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [filtersExpanded, setFiltersExpanded] = useState(false);

    const filteredRoadmaps = roadmaps.filter(roadmap => {
        const matchesSearch = roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            roadmap.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || roadmap.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const groupedRoadmaps = {
        in_progress: filteredRoadmaps.filter(r => r.status === 'in_progress'),
        not_started: filteredRoadmaps.filter(r => r.status === 'not_started'),
        paused: filteredRoadmaps.filter(r => r.status === 'paused'),
        completed: filteredRoadmaps.filter(r => r.status === 'completed'),
    };

    const stats = {
        total: roadmaps.length,
        inProgress: roadmaps.filter(r => r.status === 'in_progress').length,
        completed: roadmaps.filter(r => r.status === 'completed').length,
        notStarted: roadmaps.filter(r => r.status === 'not_started').length,
    };

    const maxHours = Math.max(...mockAnalytics.weeklyActivity.map(d => d.hours));

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleDelete = (id: string) => {
        setRoadmaps(roadmaps.filter(r => r.id !== id));
    };

    const sectionConfig = {
        in_progress: { title: 'In Progress', count: groupedRoadmaps.in_progress.length },
        not_started: { title: 'Not Started', count: groupedRoadmaps.not_started.length },
        paused: { title: 'Paused', count: groupedRoadmaps.paused.length },
        completed: { title: 'Completed', count: groupedRoadmaps.completed.length },
    };

    return (
        <div className="min-h-screen bg-bg-primary flex">
            {/* Left Sidebar */}
            <AnimatePresence mode="wait">
                {!sidebarCollapsed && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-r border-border bg-surface overflow-hidden"
                    >
                        <div className="w-[280px] p-6 space-y-6 overflow-y-auto h-screen">
                            {/* Filters - Collapsible */}
                            <div>
                                <button
                                    onClick={() => setFiltersExpanded(!filtersExpanded)}
                                    className="flex items-center justify-between w-full mb-4 group"
                                >
                                    <h2 className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
                                        Filter
                                    </h2>
                                    <motion.div
                                        animate={{ rotate: filtersExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {filtersExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-1"
                                        >
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
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Weekly Activity */}
                            <div>
                                <h2 className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider mb-4">
                                    This Week
                                </h2>
                                <div className="space-y-3">
                                    {/* Hours */}
                                    <div className="p-3 rounded-lg border border-border bg-bg-secondary">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] text-text-secondary">Learning Time</span>
                                            <span className="text-[10px] text-text-primary font-medium">
                                                +{((mockAnalytics.totalHoursThisWeek - mockAnalytics.totalHoursLastWeek) / mockAnalytics.totalHoursLastWeek * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                        <div className="text-xl font-bold text-text-primary">
                                            {mockAnalytics.totalHoursThisWeek}h
                                        </div>
                                        <div className="text-[10px] text-text-secondary mt-1">
                                            vs {mockAnalytics.totalHoursLastWeek}h last week
                                        </div>
                                    </div>

                                    {/* Activity Heatmap */}
                                    <div className="p-3 rounded-lg border border-border bg-bg-secondary">
                                        <div className="text-[10px] text-text-secondary mb-3">Daily Activity</div>
                                        <div className="flex items-end justify-between gap-1.5 h-20">
                                            {mockAnalytics.weeklyActivity.map((day, i) => (
                                                <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${(day.hours / maxHours) * 100}%` }}
                                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                                        className="w-full bg-text-primary/20 rounded-sm min-h-[4px]"
                                                        title={`${day.hours}h`}
                                                    />
                                                    <span className="text-[10px] text-text-secondary">{day.day[0]}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Streak */}
                                    <div className="p-3 rounded-lg border border-border bg-bg-secondary">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Zap className="w-3.5 h-3.5 text-text-secondary" />
                                            <span className="text-[10px] text-text-secondary">Current Streak</span>
                                        </div>
                                        <div className="text-xl font-bold text-text-primary">
                                            {mockAnalytics.streakDays} days
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Keyboard Shortcuts */}
                            <div className="pt-4 border-t border-border">
                                <h2 className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider mb-3">
                                    Shortcuts
                                </h2>
                                <div className="space-y-2 text-[10px]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-text-secondary">New</span>
                                        <kbd className="px-1.5 py-0.5 rounded bg-bg-secondary border border-border text-text-primary font-mono text-[9px]">N</kbd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-text-secondary">Search</span>
                                        <kbd className="px-1.5 py-0.5 rounded bg-bg-secondary border border-border text-text-primary font-mono text-[9px]">/</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Sticky Top Bar */}
                <div className="sticky top-0 z-10 bg-bg-primary/95 backdrop-blur-sm border-b border-border">
                    <div className="px-8 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Sidebar Toggle */}
                                <button
                                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface rounded-lg transition-colors border border-border"
                                >
                                    {sidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                                </button>

                                {/* Search */}
                                <div className="flex-1 max-w-md relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                                    <input
                                        type="text"
                                        placeholder="Search roadmaps..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-text-primary/20"
                                    />
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/onboarding"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm"
                                >
                                    <Plus className="w-4 h-4" />
                                    New
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

                {/* Main Content Area */}
                <div className="px-8 py-6">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-text-primary font-primary mb-2">
                            My Roadmaps
                        </h1>
                        <div className="flex items-center gap-4 text-xs text-text-secondary">
                            <span>{stats.total} total</span>
                            <span className="text-border">•</span>
                            <span>{stats.inProgress} active</span>
                            <span className="text-border">•</span>
                            <span>{stats.completed} completed</span>
                        </div>
                    </div>

                    {/* Grouped Roadmaps */}
                    <div className="space-y-8">
                        {(Object.keys(groupedRoadmaps) as Array<keyof typeof groupedRoadmaps>).map((status) => {
                            const roadmapsInSection = groupedRoadmaps[status];
                            if (roadmapsInSection.length === 0) return null;

                            const config = sectionConfig[status];

                            return (
                                <div key={status} className="space-y-4">
                                    {/* Section Header */}
                                    <button
                                        onClick={() => toggleSection(status)}
                                        className="flex items-center gap-3 w-full group"
                                    >
                                        <h2 className="text-sm font-semibold text-text-primary font-primary">
                                            {config.title}
                                        </h2>
                                        <span className="text-xs text-text-secondary">
                                            ({config.count})
                                        </span>
                                        <div className="flex-1 h-px bg-border" />
                                        <motion.div
                                            animate={{ rotate: expandedSections[status] ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
                                        </motion.div>
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
                                                {roadmapsInSection.map((roadmap, index) => (
                                                    <motion.div
                                                        key={roadmap.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        onHoverStart={() => setHoveredCard(roadmap.id)}
                                                        onHoverEnd={() => setHoveredCard(null)}
                                                        className="group relative"
                                                    >
                                                        <Link href={`/viewer/experiments/progressive?roadmapId=${roadmap.id}`}>
                                                            <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50">
                                                                {/* Subtle accent - thin top line on hover */}
                                                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                                                                {/* Progress Percentage */}
                                                                <div className="flex items-center justify-between mb-3">
                                                                    <span className="text-xs text-text-secondary">
                                                                        {roadmap.completedWeeks}/{roadmap.totalWeeks} weeks
                                                                    </span>
                                                                    <span className="text-sm font-semibold text-text-primary">
                                                                        {roadmap.progress}%
                                                                    </span>
                                                                </div>

                                                                {/* Title & Description */}
                                                                <h3 className="text-base font-semibold text-text-primary font-primary mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                                                    {roadmap.title}
                                                                </h3>
                                                                <p className="text-xs text-text-secondary font-secondary mb-4 line-clamp-2">
                                                                    {roadmap.description}
                                                                </p>

                                                                {/* Metadata */}
                                                                <div className="flex items-center gap-3 text-xs text-text-secondary mb-4">
                                                                    <span className="flex items-center gap-1">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        {roadmap.lastAccessed}
                                                                    </span>
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

                                                                {/* Progress Bar - brand color */}
                                                                <div className="relative h-1 bg-bg-secondary rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{ width: 0 }}
                                                                        animate={{ width: `${roadmap.progress}%` }}
                                                                        transition={{ duration: 1, ease: 'easeOut' }}
                                                                        className="h-full bg-primary rounded-full"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </Link>

                                                        {/* Hover Actions */}
                                                        <AnimatePresence>
                                                            {hoveredCard === roadmap.id && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    exit={{ opacity: 0, y: 10 }}
                                                                    className="absolute -bottom-4 left-0 right-0 flex items-center justify-center gap-2 z-10"
                                                                >
                                                                    <Link href={`/viewer/experiments/progressive?roadmapId=${roadmap.id}`}>
                                                                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-medium shadow-lg hover:bg-primary/90 transition-colors">
                                                                            <Play className="w-3.5 h-3.5" />
                                                                            Continue
                                                                        </button>
                                                                    </Link>
                                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-primary hover:text-primary transition-colors">
                                                                        <Share2 className="w-3.5 h-3.5" />
                                                                        Share
                                                                    </button>
                                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-primary hover:text-primary transition-colors">
                                                                        <Archive className="w-3.5 h-3.5" />
                                                                        Archive
                                                                    </button>
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleDelete(roadmap.id);
                                                                        }}
                                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-lg text-xs font-medium shadow-lg hover:border-red-500 hover:text-red-600 transition-colors"
                                                                    >
                                                                        <Trash2 className="w-3.5 h-3.5" />
                                                                        Delete
                                                                    </button>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
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
