'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Lock, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartSectionProps {
    title: string;
    type: 'build' | 'research' | 'share';
    status: 'active' | 'pending' | 'locked' | 'completed';
    children: React.ReactNode;
    summary?: string;
}

export function SmartSection({ title, type, status, children, summary }: SmartSectionProps) {
    const [isExpanded, setIsExpanded] = useState(status === 'active');

    const statusColors = {
        active: 'border-orange-500/50 bg-surface shadow-lg ring-1 ring-orange-500/20',
        pending: 'border-border bg-surface/50 opacity-75',
        locked: 'border-border bg-gray-50 dark:bg-gray-900/50 opacity-50',
        completed: 'border-green-500/20 bg-green-50/10',
    };

    const typeIcons = {
        build: '🛠️',
        research: '📚',
        share: '📢',
    };

    return (
        <div className={cn(
            "rounded-xl border transition-all duration-300",
            statusColors[status],
            isExpanded ? "my-6" : "my-2"
        )}>
            <button
                onClick={() => status !== 'locked' && setIsExpanded(!isExpanded)}
                className="flex w-full items-center justify-between p-4"
                disabled={status === 'locked'}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">{typeIcons[type]}</span>
                    <div className="text-left">
                        <h3 className={cn(
                            "font-semibold",
                            status === 'active' ? "text-lg" : "text-base"
                        )}>
                            {title}
                        </h3>
                        {!isExpanded && summary && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{summary}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {status === 'locked' && <Lock className="h-4 w-4 text-muted-foreground" />}
                    {status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {status === 'active' && (
                        <span className="flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                    )}
                    {status !== 'locked' && (
                        isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                </div>
            </button>

            {isExpanded && (
                <div className="border-t border-border p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    {children}
                </div>
            )}
        </div>
    );
}
