import { ProgressState } from './tracker';

export function aggregateProgress(progressState: ProgressState): {
    completedDeliverables: number;
    totalDeliverables: number;
    completedTopics: number;
    totalTopics: number;
} {
    // This is a placeholder for more complex aggregation if needed
    // For now, the calculator does most of the heavy lifting
    return {
        completedDeliverables: 0, // To be implemented if needed
        totalDeliverables: 0,
        completedTopics: 0,
        totalTopics: 0
    };
}
