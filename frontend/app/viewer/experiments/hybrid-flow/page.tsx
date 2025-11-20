'use client';

import roadmapData from '../../../../final_roadmap.json';
import BuildSectionComponent from '@/components/roadmap/BuildSection';
import { HeroAction } from '@/components/experiments/smart-stream/HeroAction';
import { CopilotSidebar } from '@/components/experiments/smart-stream/CopilotSidebar';
import { ScrollFocusWrapper } from '@/components/experiments/hybrid-flow/ScrollFocusWrapper';
import { SelectionProvider } from '@/context/SelectionContext';
import { Sparkles } from 'lucide-react';

export default function HybridFlowPage() {
    // Mock State: Week 1
    const currentWeek = roadmapData.phases[0].weeks[0];

    return (
        <SelectionProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
                <div className="mx-auto max-w-[1800px]">

                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                        {/* Main Content (8 cols = 2/3) - Centered Focus Stream */}
                        <div className="xl:col-span-8 pb-32">

                            {/* Header Area with Hero Action */}
                            <div className="mb-20">
                                <HeroAction
                                    title="Resume Build: Implement OpenAI API"
                                    subtitle="You completed the setup yesterday. Now let's connect to the LLM provider."
                                    type="build"
                                    onAction={() => { }}
                                />
                            </div>

                            <div className="space-y-16">
                                {/* 1. Build Section - Custom margin to ensure it's focused at the top */}
                                <ScrollFocusWrapper
                                    className="relative transition-all duration-500"
                                    defaultInFocus={true}
                                    rootMargin="-5% 0px -20% 0px"
                                    threshold={0.1}
                                >
                                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider">
                                                Build Phase
                                            </span>
                                            <span className="text-sm text-gray-500">{currentWeek.buildSection.hours}h estimated</span>
                                        </div>

                                        <BuildSectionComponent
                                            buildSection={currentWeek.buildSection}
                                            weekNumber={1}
                                        />
                                    </div>
                                </ScrollFocusWrapper>

                                {/* 2. Research Section */}
                                <ScrollFocusWrapper className="relative transition-all duration-500">
                                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                                                Research Phase
                                            </span>
                                            <span className="text-sm text-gray-500">{currentWeek.researchSection.hours}h estimated</span>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Deep Dives</h3>
                                            <div className="grid gap-4">
                                                {currentWeek.researchSection.deepDiveTopics.map((topic, i) => (
                                                    <div key={i} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                                        <h4 className="font-semibold text-lg mb-2">{topic.description}</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {(topic.suggestedResources || []).map((res, j) => (
                                                                <span key={j} className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                                    {res.type}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollFocusWrapper>

                                {/* 3. Share Section */}
                                <ScrollFocusWrapper className="relative transition-all duration-500">
                                    <div className="absolute -left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-transparent opacity-20 rounded-full hidden xl:block" />
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                                                Share Phase
                                            </span>
                                            <span className="text-sm text-gray-500">{currentWeek.shareSection.hours}h estimated</span>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {currentWeek.shareSection.artifactTitle}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                                {currentWeek.shareSection.artifactDescription}
                                            </p>

                                            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-500">Key Details</h4>
                                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                                    {currentWeek.shareSection.details.map((detail, i) => (
                                                        <li key={i}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {currentWeek.shareSection.tags.map((tag, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ScrollFocusWrapper>

                            </div>
                        </div>

                        {/* Right Margin: Copilot (4 cols = 1/3) */}
                        <div className="hidden xl:flex xl:col-span-4 flex-col gap-6 sticky top-8 h-[calc(100vh-4rem)]">
                            <CopilotSidebar />
                        </div>

                    </div>
                </div>
            </div>
        </SelectionProvider>
    );
}
