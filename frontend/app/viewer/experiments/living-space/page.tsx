'use client';

import roadmapData from '../../../../final_roadmap.json';
import BuildSectionComponent from '@/components/roadmap/BuildSection';
import { ProgressPulse } from '@/components/experiments/living-space/ProgressPulse';
import { MicroTipCard } from '@/components/experiments/living-space/MicroTipCard';
import { Sparkles } from 'lucide-react';
import { SelectionProvider } from '@/context/SelectionContext';

export default function LivingSpacePage() {
    // Mock State: Week 1
    const currentWeek = roadmapData.phases[0].weeks[0];

    return (
        <SelectionProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
                <div className="mx-auto max-w-[1600px]">

                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Week 1: AI Fundamentals
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            Focus Mode: <span className="text-orange-500 font-semibold">Active</span>
                        </p>
                    </header>

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                        {/* Left Margin: Context & Tips (3 cols) */}
                        <div className="hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-8">
                            <MicroTipCard
                                title="Why this matters?"
                                content="Building a product from scratch is the fastest way to understand the limitations of current LLMs. You will face latency and hallucination issues immediately."
                            />
                            <MicroTipCard
                                title="Pro Tip: Vercel"
                                content="Use Vercel's AI SDK for streaming responses. It handles the complexity of edge functions for you."
                            />
                        </div>

                        {/* Main Content (6 cols) */}
                        <div className="xl:col-span-6 space-y-12">

                            {/* Active Section with Pulse */}
                            <div className="relative">
                                <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 rounded-full hidden xl:block" />

                                <ProgressPulse isActive={true}>
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
                                                Current Focus
                                            </span>
                                            <span className="text-sm text-gray-500">14h estimated</span>
                                        </div>

                                        <BuildSectionComponent
                                            buildSection={currentWeek.buildSection}
                                            weekNumber={1}
                                        />
                                    </div>
                                </ProgressPulse>
                            </div>

                            {/* Pending Sections (Dimmed) */}
                            <div className="opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                                <div className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-800 border-dashed">
                                    <h3 className="text-xl font-bold text-gray-400 mb-4">Research: Deep Dives</h3>
                                    <p className="text-gray-500">
                                        Complete the build to unlock research topics on Transformers and Attention mechanisms.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Right Margin: AI Insights (3 cols) */}
                        <div className="hidden xl:flex xl:col-span-3 flex-col gap-6 sticky top-8">
                            <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 p-6 border border-indigo-100 dark:border-indigo-900/30">
                                <div className="flex items-center gap-2 mb-4 text-indigo-600 dark:text-indigo-400">
                                    <Sparkles className="w-5 h-5" />
                                    <h3 className="font-bold">AI Coach</h3>
                                </div>
                                <p className="text-sm text-indigo-900 dark:text-indigo-200 mb-4">
                                    "I noticed you haven't deployed to Vercel yet. Want a quick guide on setting up the CLI?"
                                </p>
                                <button className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors">
                                    Show Guide
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </SelectionProvider>
    );
}
