/**
 * Hook for managing roadmap mutations (add/remove/update)
 * Handles optimistic updates and validation
 */

import { useState, useCallback } from 'react';
import { useRoadmap } from '@/context/RoadmapContext';
import { useApiClient } from '@/lib/api-client';
import type { Deliverable, Resource, Week } from '@/lib/types';

interface MutationOptions {
    optimistic?: boolean;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useRoadmapMutations() {
    const { roadmap, setRoadmapDirect } = useRoadmap();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const apiClient = useApiClient();

    const persistRoadmap = async (updatedRoadmap: any) => {
        try {
            await apiClient.patch(`/api/roadmaps/${updatedRoadmap.id}`, {
                current_roadmap: updatedRoadmap
            });
        } catch (err) {
            console.error('Failed to persist roadmap:', err);
            throw err;
        }
    };

    /**
     * Add a deliverable to a week section
     */
    const addDeliverable = useCallback(async (
        weekNumber: number,
        section: 'build' | 'research' | 'share',
        description: string,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        const newDeliverable: Deliverable = {
            description,
            isCompleted: false,
        };

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection) {
                        week.buildSection.deliverables = [
                            ...(week.buildSection.deliverables || []),
                            newDeliverable
                        ];
                    } else if (section === 'research' && week.researchSection) {
                        week.researchSection.deliverables = [
                            ...(week.researchSection.deliverables || []),
                            newDeliverable
                        ];
                    } else if (section === 'share' && week.shareSection) {
                        week.shareSection.deliverables = [
                            ...(week.shareSection.deliverables || []),
                            newDeliverable
                        ];
                    }

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);

            // Rollback optimistic update on error
            // In a real implementation, we'd restore from a saved state
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Remove a deliverable from a week section
     */
    const removeDeliverable = useCallback(async (
        weekNumber: number,
        section: 'build' | 'research' | 'share',
        index: number,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week) {
                    if (section === 'build' && week.buildSection?.deliverables) {
                        week.buildSection.deliverables = week.buildSection.deliverables.filter(
                            (_, i) => i !== index
                        );
                    } else if (section === 'research' && week.researchSection?.deliverables) {
                        week.researchSection.deliverables = week.researchSection.deliverables.filter(
                            (_, i) => i !== index
                        );
                    } else if (section === 'share' && week.shareSection?.deliverables) {
                        week.shareSection.deliverables = week.shareSection.deliverables.filter(
                            (_, i) => i !== index
                        );
                    }

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Add a resource to a topic
     */
    const addResource = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        resource: Omit<Resource, 'url'> & { url: string },
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    topic.suggestedResources = [
                        ...(topic.suggestedResources || []),
                        resource
                    ];

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Remove a resource from a topic
     */
    const removeResource = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        resourceIndex: number,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const topic = week.researchSection.deepDiveTopics[topicIndex];
                    if (topic.suggestedResources) {
                        topic.suggestedResources = topic.suggestedResources.filter(
                            (_, i) => i !== resourceIndex
                        );
                    }

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Reorder deliverables within a week section
     */
    const reorderDeliverables = useCallback(async (
        weekNumber: number,
        section: 'build' | 'research' | 'share',
        startIndex: number,
        endIndex: number,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week) {
                    let deliverables: Deliverable[] | undefined;
                    if (section === 'build') deliverables = week.buildSection?.deliverables;
                    else if (section === 'research') deliverables = week.researchSection?.deliverables;
                    else if (section === 'share') deliverables = week.shareSection?.deliverables;

                    if (deliverables) {
                        const [removed] = deliverables.splice(startIndex, 1);
                        deliverables.splice(endIndex, 0, removed);

                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Reorder resources within a topic
     */
    /**
     * Reorder resources within a topic
     */
    const reorderResources = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        startIndex: number,
        endIndex: number,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources) {
                        const [removed] = resources.splice(startIndex, 1);
                        resources.splice(endIndex, 0, removed);

                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Toggle deliverable completion status
     */
    const toggleDeliverable = useCallback(async (
        weekNumber: number,
        section: 'build' | 'research' | 'share',
        index: number,
        isCompleted: boolean,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week) {
                    let deliverable: Deliverable | undefined;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];

                    if (deliverable) {
                        deliverable.isCompleted = isCompleted;

                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Update deliverable description
     */
    const updateDeliverable = useCallback(async (
        weekNumber: number,
        section: 'build' | 'research' | 'share',
        index: number,
        description: string,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week) {
                    let deliverable: Deliverable | undefined;
                    if (section === 'build') deliverable = week.buildSection?.deliverables?.[index];
                    else if (section === 'research') deliverable = week.researchSection?.deliverables?.[index];
                    else if (section === 'share') deliverable = week.shareSection?.deliverables?.[index];

                    if (deliverable) {
                        deliverable.description = description;

                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Update resource details
     */
    const updateResource = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        resourceIndex: number,
        resource: Resource,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]?.suggestedResources) {
                    const resources = week.researchSection.deepDiveTopics[topicIndex].suggestedResources;
                    if (resources && resources[resourceIndex]) {
                        resources[resourceIndex] = resource;

                        if (options?.optimistic !== false) {
                            setRoadmapDirect(updatedRoadmap);
                        }
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Toggle topic completion status
     */
    const toggleTopic = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        isCompleted: boolean,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].isCompleted = isCompleted;

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Update topic description
     */
    const updateTopic = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        description: string,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics?.[topicIndex]) {
                    week.researchSection.deepDiveTopics[topicIndex].description = description;

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    /**
     * Remove a topic
     */
    const removeTopic = useCallback(async (
        weekNumber: number,
        topicIndex: number,
        options?: MutationOptions
    ) => {
        if (!roadmap) {
            throw new Error('No roadmap loaded');
        }

        setIsLoading(true);
        setError(null);

        try {
            const updatedRoadmap = { ...roadmap };
            const phase = updatedRoadmap.phases.find(p =>
                p.weeks.some(w => w.weekNumber === weekNumber)
            );

            if (phase) {
                const week = phase.weeks.find(w => w.weekNumber === weekNumber);
                if (week?.researchSection?.deepDiveTopics) {
                    week.researchSection.deepDiveTopics = week.researchSection.deepDiveTopics.filter(
                        (_, i) => i !== topicIndex
                    );

                    if (options?.optimistic !== false) {
                        setRoadmapDirect(updatedRoadmap);
                    }
                }
            }

            await persistRoadmap(updatedRoadmap);

            options?.onSuccess?.();
        } catch (err) {
            const error = err as Error;
            setError(error);
            options?.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [roadmap, setRoadmapDirect]);

    return {
        addDeliverable,
        removeDeliverable,
        reorderDeliverables,
        addResource,
        removeResource,
        reorderResources,
        toggleDeliverable,
        updateDeliverable,
        updateResource,
        toggleTopic,
        updateTopic,
        removeTopic,
        isLoading,
        error,
    };
}
