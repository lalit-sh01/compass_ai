import Link from 'next/link';
import { ArrowRight, Layout, Sparkles } from 'lucide-react';

export default function ExperimentsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Design Experiments
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Exploring AI-Native interfaces for the Roadmap Viewer.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Option A */}
                    <Link href="/viewer/experiments/smart-stream" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all hover:shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Layout className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Smart Stream</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    A focused, linear flow that prioritizes the "Next Best Action". Collapses future content to reduce cognitive load.
                                </p>
                            </div>
                            <div className="flex items-center text-orange-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Try Prototype <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </div>
                    </Link>

                    {/* Option B */}
                    <Link href="/viewer/experiments/living-space" className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all hover:shadow-2xl">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Living White Space</h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Utilizes screen margins for context-aware micro-learning and AI tips. Features a "Progress Pulse" for active items.
                                </p>
                            </div>
                            <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                                Try Prototype <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                    {/* Option 3: Hybrid Flow */}
                    <Link href="/viewer/experiments/hybrid-flow" className="group">
                        <div className="h-full p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all hover:shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Layout className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                    Hybrid Flow
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Best of both worlds. "Smart Stream" hero action + "Living Space" focus effects.
                                </p>
                                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Hero Action Header
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Focus & Blur Effects
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        Context-Aware Copilot
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
