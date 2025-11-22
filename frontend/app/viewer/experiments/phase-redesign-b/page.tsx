'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Grid, Layout, Cpu, Database, Globe, Zap, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import roadmapData from '@/final_roadmap.json';

// --- Types ---
// Reusing types from previous step for simplicity
interface Week {
    weekNumber: number;
    title: string;
    theme: string;
    totalHours: number;
    status: string;
    timeBreakdown: {
        build: number;
        research: number;
        share: number;
    };
    buildSection?: any;
    researchSection?: any;
    shareSection?: any;
}

// --- Components ---

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`bg-zinc-900/50 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900/80 transition-colors ${className}`}
        >
            {children}
        </motion.div>
    );
}

function StatBadge({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
            <div className="p-2 bg-white/5 rounded-lg text-zinc-400">
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">{label}</div>
                <div className="text-sm text-white font-mono">{value}</div>
            </div>
        </div>
    );
}

export default function PhaseRedesignB() {
    const phase = roadmapData.phases[0];
    const currentWeek = phase.weeks[0]; // Simulating Week 1 as active

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30">
            {/* Header Bar */}
            <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/viewer" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5 text-zinc-400" />
                        </Link>
                        <div className="h-6 w-px bg-white/10" />
                        <h1 className="font-bold text-lg tracking-tight">{phase.title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-emerald-500">OPTION B: COMMAND CENTER</span>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs font-bold text-emerald-400">LIVE</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. Hero Card (Current Week Focus) - Spans 8 cols */}
                    <BentoCard className="lg:col-span-8 lg:row-span-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Cpu className="w-64 h-64" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Current Sprint
                                    </span>
                                    <span className="text-zinc-500 font-mono">Week {currentWeek.weekNumber}</span>
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-4 max-w-2xl leading-tight">
                                    {currentWeek.title}
                                </h2>
                                <p className="text-xl text-zinc-400 max-w-xl">
                                    {currentWeek.theme}
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <StatBadge icon={Clock} label="Hours" value={`${currentWeek.totalHours}h`} />
                                <StatBadge icon={Database} label="Build" value={`${currentWeek.timeBreakdown.build}h`} />
                                <StatBadge icon={Globe} label="Research" value={`${currentWeek.timeBreakdown.research}h`} />
                            </div>
                        </div>
                    </BentoCard>

                    {/* 2. Quick Actions - Spans 4 cols */}
                    <BentoCard className="lg:col-span-4 bg-gradient-to-br from-zinc-900 to-zinc-800">
                        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Active Deliverables</h3>
                        <div className="space-y-3">
                            {currentWeek.buildSection?.deliverables?.slice(0, 3).map((d: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-black/20 rounded-xl border border-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                                    <div className={`w-4 h-4 rounded-full border-2 ${d.isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-zinc-600 group-hover:border-emerald-500'}`} />
                                    <span className="text-sm text-zinc-300 line-clamp-1">{d.description}</span>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* 3. Resource Spotlight - Spans 4 cols */}
                    <BentoCard className="lg:col-span-4" delay={0.1}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Top Resource</h3>
                            <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div className="aspect-video bg-zinc-800 rounded-xl mb-4 flex items-center justify-center">
                            <Zap className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-sm font-medium text-white line-clamp-2">
                            {currentWeek.researchSection?.deepDiveTopics?.[0]?.suggestedResources?.[0]?.title || "No resource selected"}
                        </p>
                    </BentoCard>

                    {/* 4. Upcoming Weeks (Mini List) - Spans 12 cols */}
                    <div className="lg:col-span-12 mt-8">
                        <h3 className="text-lg font-bold text-white mb-6">Upcoming Sprints</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {phase.weeks.slice(1, 4).map((week, i) => (
                                <BentoCard key={week.weekNumber} delay={0.2 + (i * 0.1)} className="group cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-mono text-zinc-500">WEEK {week.weekNumber}</span>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-bold text-zinc-200 mb-2 group-hover:text-white transition-colors">
                                        {week.title}
                                    </h4>
                                    <p className="text-sm text-zinc-500 line-clamp-2">
                                        {week.theme}
                                    </p>
                                </BentoCard>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
