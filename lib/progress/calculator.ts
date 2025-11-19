import { Roadmap, Week, Phase } from '@/lib/types';
import { ProgressState, calculateProgress, generateItemId } from './tracker';

export class ProgressCalculator {
    private roadmap: Roadmap;
    private completedItems: Set<string>;

    constructor(roadmap: Roadmap, completedItemIds: string[]) {
        this.roadmap = roadmap;
        this.completedItems = new Set(completedItemIds);
    }

    public calculateAll(): ProgressState {
        const weekProgress: Record<number, number> = {};
        const phaseProgress: Record<number, number> = {};
        let totalItems = 0;
        let totalCompleted = 0;

        // Calculate per week
        this.roadmap.phases.forEach(phase => {
            let phaseTotal = 0;
            let phaseCompleted = 0;

            phase.weeks.forEach(week => {
                const { total, completed } = this.calculateWeekStats(week);
                weekProgress[week.weekNumber] = calculateProgress(total, completed);

                phaseTotal += total;
                phaseCompleted += completed;
            });

            phaseProgress[phase.phaseNumber] = calculateProgress(phaseTotal, phaseCompleted);
            totalItems += phaseTotal;
            totalCompleted += phaseCompleted;
        });

        return {
            overall: calculateProgress(totalItems, totalCompleted),
            phases: phaseProgress,
            weeks: weekProgress,
            items: {} // This would be populated from DB in a real scenario
        };
    }

    private calculateWeekStats(week: Week): { total: number; completed: number } {
        let total = 0;
        let completed = 0;

        // Check Build Section
        if (week.buildSection?.deliverables) {
            week.buildSection.deliverables.forEach((d, i) => {
                total++;
                if (this.completedItems.has(generateItemId(week.weekNumber, 'deliverable', i, 'build'))) {
                    completed++;
                }
            });
        }

        // Check Research Section
        if (week.researchSection?.deepDiveTopics) {
            week.researchSection.deepDiveTopics.forEach((t, i) => {
                total++;
                // Topics usually don't have section suffix in my previous thought, but let's be consistent if needed.
                // However, topics are unique to research section usually.
                // Let's keep topics simple or add 'research' if we want strictness.
                // For now, let's assume topics are unique enough or add 'research'.
                if (this.completedItems.has(generateItemId(week.weekNumber, 'topic', i, 'research'))) {
                    completed++;
                }
            });
        }

        // Check Share Section
        if (week.shareSection?.deliverables) {
            week.shareSection.deliverables.forEach((d, i) => {
                total++;
                if (this.completedItems.has(generateItemId(week.weekNumber, 'deliverable', i, 'share'))) {
                    completed++;
                }
            });
        }

        return { total, completed };
    }
}
