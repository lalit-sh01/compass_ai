'use client';

import roadmapData from '../../../../final_roadmap.json';
import { HeroAction } from '@/components/experiments/smart-stream/HeroAction';
import { SmartSection } from '@/components/experiments/smart-stream/SmartSection';
import { CopilotSidebar } from '@/components/experiments/smart-stream/CopilotSidebar';
import { SelectionProvider } from '@/context/SelectionContext';

export default function SmartStreamPage() {
    // Mock State: Week 1
    const currentWeek = roadmapData.phases[0].weeks[0];

    return (
        <SelectionProvider>
            <div className="min-h-screen bg-background p-6">
                <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Stream (2/3) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Hero Action */}
                        <HeroAction
                            title="Resume Build: Implement OpenAI API"
                            subtitle="You completed the setup yesterday. Now let's connect to the LLM provider."
                            type="build"
                            onAction={() => { }}
                        />

                        {/* 2. Smart Stream */}
                        <div className="space-y-2">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 ml-1">
                                Week 1 Stream
                            </h2>

                            {/* Active Section */}
                            <SmartSection
                                title="Build: AI Product Assistant"
                                type="build"
                                status="active"
                                summary="Build a ChatGPT-style interface"
                            >
                                <div className="space-y-6">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {currentWeek.buildSection.description}
                                    </p>

                                    <div className="space-y-3">
                                        <h4 className="font-semibold text-sm">Deliverables</h4>
                                        {currentWeek.buildSection.deliverables.map((d, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-border">
                                                <div className="mt-0.5 h-5 w-5 rounded border border-gray-300 dark:border-gray-600" />
                                                <span className="text-sm">{d.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </SmartSection>

                            {/* Pending Sections */}
                            <SmartSection
                                title="Research: LLM Fundamentals"
                                type="research"
                                status="pending"
                                summary="4 topics pending"
                            >
                                <div className="p-4 text-center text-muted-foreground">
                                    Research content hidden until Build is underway.
                                </div>
                            </SmartSection>

                            <SmartSection
                                title="Share: LinkedIn Post"
                                type="share"
                                status="locked"
                                summary="Locked until Build > 50%"
                            >
                                <div className="p-4 text-center text-muted-foreground">
                                    Complete the build to unlock this section.
                                </div>
                            </SmartSection>
                        </div>
                    </div>

                    {/* Copilot Sidebar (1/3) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-6">
                            <CopilotSidebar />
                        </div>
                    </div>

                </div>
            </div>
        </SelectionProvider>
    );
}
