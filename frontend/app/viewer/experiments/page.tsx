'use client';

import Link from 'next/link';
import { ArrowRight, Columns, Layout, Layers } from 'lucide-react';

export default function ExperimentsPage() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Roadmap Viewer Experiments</h1>
            <p className="text-text-secondary mb-8">Explore different interaction models for the unified roadmap experience.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/viewer/experiments/accordion" className="group">
                    <div className="h-full bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                            <Layout className="w-6 h-6 text-primary group-hover:text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-2">Experiment A: Fluid Accordion</h2>
                        <p className="text-text-secondary mb-4">
                            A vertical list that expands to reveal details. Keeps context in a linear flow.
                            Best for mobile and focused reading.
                        </p>
                        <div className="flex items-center text-primary font-medium text-sm">
                            Try it out <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                <Link href="/viewer/experiments/morphing" className="group">
                    <div className="h-full bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Columns className="w-6 h-6 text-purple-500 group-hover:text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-2">Experiment B: Morphing Master-Detail</h2>
                        <p className="text-text-secondary mb-4">
                            A 3-column layout that shifts focus as you drill down.
                            Best for desktop and rapid navigation between items.
                        </p>
                        <div className="flex items-center text-purple-500 font-medium text-sm">
                            Try it out <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                <Link href="/viewer/experiments/vertical-stack" className="group">
                    <div className="h-full bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Layout className="w-6 h-6 text-orange-500 group-hover:text-white rotate-90" />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-2">Experiment C: Vertical Stack Morphing</h2>
                        <p className="text-text-secondary mb-4">
                            A drill-down interface where selected items morph into sticky headers.
                        </p>
                        <div className="flex items-center text-orange-500 font-medium text-sm">
                            Try it out <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </Link>

                <Link href="/viewer/experiments/unified-split" className="group md:col-span-3">
                    <div className="h-full bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                            <Layers className="w-8 h-8 text-blue-500 group-hover:text-white" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Experiment D: Unified Split View</h2>
                            <p className="text-text-secondary mb-4 text-lg">
                                Persistent Phase Tabs + Week Stream + Cockpit Dashboard.
                            </p>
                            <div className="flex items-center text-blue-500 font-bold">
                                Launch Unified View <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>

                <Link href="/viewer/experiments/progressive" className="group md:col-span-3">
                    <div className="h-full bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Layout className="w-32 h-32" />
                        </div>
                        <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors shrink-0 z-10">
                            <ArrowRight className="w-8 h-8 text-green-500 group-hover:text-white" />
                        </div>
                        <div className="flex-1 z-10">
                            <h2 className="text-2xl font-bold text-text-primary mb-2">Experiment E: Progressive Unified View</h2>
                            <p className="text-text-secondary mb-4 text-lg">
                                The 3-step flow: Phases &rarr; Weeks &rarr; Tasks.
                                Starts simple, reveals detail on demand. The perfect balance of overview and focus.
                            </p>
                            <div className="flex items-center text-green-500 font-bold">
                                Launch Progressive View <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
