import { ProgressCalculator } from '../../../lib/progress/calculator';
import { Roadmap, Week } from '../../../lib/types';

// Mock data
const mockWeek: Week = {
    weekNumber: 1,
    title: 'Test Week',
    theme: 'Testing',
    totalHours: 10,
    status: 'not_started',
    timeBreakdown: { build: 5, research: 3, share: 2 },
    buildSection: {
        hours: 5,
        projectTitle: 'Test Project',
        description: 'Test Desc',
        deliverables: [
            { description: 'D1', isCompleted: false },
            { description: 'D2', isCompleted: false }
        ]
    },
    researchSection: {
        hours: 3,
        deepDiveTopics: [
            { description: 'T1', isCompleted: false }
        ]
    }
};

const mockRoadmap: Roadmap = {
    title: 'Test Roadmap',
    goal: 'Testing',
    startDate: '2025-01-01',
    targetEndDate: '2025-04-01',
    totalDurationWeeks: 1,
    timeCommitmentPerWeek: '10h',
    profile: { description: 'Test', experience: 'Beginner' },
    learningStyle: 'Visual',
    coreSkills: [],
    phases: [
        {
            phaseNumber: 1,
            title: 'Phase 1',
            summary: 'Summary',
            weekRange: '1-1',
            weeks: [mockWeek]
        }
    ],
    supplementalSections: {} as any
};

describe('ProgressCalculator', () => {
    it('should calculate 0% progress when nothing is completed', () => {
        const calculator = new ProgressCalculator(mockRoadmap, []);
        const result = calculator.calculateAll();

        expect(result.overall).toBe(0);
        expect(result.weeks[1]).toBe(0);
        expect(result.phases[1]).toBe(0);
    });

    it('should calculate correct progress when some items are completed', () => {
        // D1 is w1-d0-build
        // T1 is w1-t0-research
        const completedIds = ['w1-d0-build', 'w1-t0-research'];
        const calculator = new ProgressCalculator(mockRoadmap, completedIds);
        const result = calculator.calculateAll();

        // Total items: 2 deliverables + 1 topic = 3 items
        // Completed: 2 items
        // Expected: 67% (rounded)
        expect(result.overall).toBe(67);
        expect(result.weeks[1]).toBe(67);
    });

    it('should calculate 100% progress when all items are completed', () => {
        const completedIds = ['w1-d0-build', 'w1-d1-build', 'w1-t0-research'];
        const calculator = new ProgressCalculator(mockRoadmap, completedIds);
        const result = calculator.calculateAll();

        expect(result.overall).toBe(100);
    });
});
