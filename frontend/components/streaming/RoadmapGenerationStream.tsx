'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Roadmap, UserContext } from '@/lib/types';

interface StreamUpdate {
  event: string;
  progress: number;
  message: string;
  partial_roadmap?: Roadmap;
  strategy_brief?: any;
  error?: string;
}

interface RoadmapGenerationStreamProps {
  userContext: UserContext;
  onComplete: (roadmap: Roadmap) => void;
  onError: (error: string) => void;
  onNegotiationRequired?: (strategyBrief: any) => void;
}

const PROGRESS_MESSAGES: Record<string, string> = {
  inquisitor: '🔍 Understanding your context...',
  gap_analyst: '📊 Analyzing skill gaps and feasibility...',
  curator: '📚 Generating personalized tasks...',
  enricher: '🔗 Finding high-quality resources...',
  validator: '✅ Final quality checks...',
  complete: '✨ Your personalized roadmap is ready!',
};

export function RoadmapGenerationStream({
  userContext,
  onComplete,
  onError,
  onNegotiationRequired,
}: RoadmapGenerationStreamProps) {
  const { getToken } = useAuth();
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('Initializing...');
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [finalRoadmap, setFinalRoadmap] = useState<Roadmap | null>(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [negotiationRequired, setNegotiationRequired] = useState(false);

  // PRD v4.1 5-node architecture
  const stages = [
    'inquisitor',      // Node A: Interview (skipped if userContext provided)
    'gap_analyst',     // Node B: Feasibility check
    'curator',         // Node C: Task generation
    'enricher',        // Node D: Resource enrichment
    'validator',       // Node E: Quality checks
  ];

  const startStream = useCallback(async () => {
    try {
      setIsStreaming(true);
      setError(null);

      const token = await getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/agents/generate-roadmap-stream`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(userContext),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream available');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              const update: StreamUpdate = JSON.parse(jsonStr);

              setCurrentProgress(update.progress);
              setCurrentMessage(update.message);

              if (stages.includes(update.event)) {
                setCompletedStages((prev) => [...new Set([...prev, update.event])]);
              }

              // Handle negotiation (IMPOSSIBLE status from Gap Analyst)
              if (update.event === 'negotiation_required' && update.strategy_brief) {
                setNegotiationRequired(true);
                if (onNegotiationRequired) {
                  onNegotiationRequired(update.strategy_brief);
                }
                setIsStreaming(false);
                return;
              }

              if (update.event === 'complete' && update.partial_roadmap) {
                setFinalRoadmap(update.partial_roadmap);
                onComplete(update.partial_roadmap);
              } else if (update.event === 'error') {
                throw new Error(update.error || update.message);
              }
            } catch (e) {
              console.error('Failed to parse SSE update:', e);
            }
          }
        }
      }

      setIsStreaming(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      onError(errorMessage);
      setIsStreaming(false);
    }
  }, [
    userContext,
    onComplete,
    onError,
    onNegotiationRequired,
    getToken,
  ]);

  useEffect(() => {
    startStream();
  }, [startStream]);

  if (negotiationRequired) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/20 p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
            ⚠️ Timeline Challenge
          </h3>
          <p className="text-yellow-800 dark:text-yellow-300 mb-4">
            Your goal requires more time than available. Please adjust your timeline or scope.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
            Generation Failed
          </h3>
          <p className="text-red-800 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              startStream();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (finalRoadmap && !isStreaming) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4">
        <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 max-w-md w-full text-center">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-2">
            ✨ Roadmap Ready!
          </h3>
          <p className="text-green-800 dark:text-green-300 mb-4">
            Your personalized {finalRoadmap.roadmap_title || 'roadmap'} is ready to explore.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-md w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {currentProgress}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>

        {/* Current Message */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-center text-gray-900 dark:text-white font-medium">
            {currentMessage}
          </p>
        </div>

        {/* Stage Progress List (PRD v4.1 5-node architecture) */}
        <div className="space-y-2 mb-8">
          {stages.map((stage) => {
            const isCompleted = completedStages.includes(stage);
            const isActive = !isCompleted && currentMessage.includes(PROGRESS_MESSAGES[stage]);

            return (
              <div key={stage} className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {isCompleted ? '✓' : '○'}
                </div>
                <span
                  className={`text-sm ${
                    isCompleted
                      ? 'text-green-700 dark:text-green-300 font-medium'
                      : isActive
                        ? 'text-blue-700 dark:text-blue-300 font-medium'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {PROGRESS_MESSAGES[stage] || stage}
                </span>
              </div>
            );
          })}
        </div>

        {/* Loading Animation */}
        {isStreaming && (
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}
      </div>
    </div>
  );
}
