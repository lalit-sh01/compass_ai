interface Week {
    weekNumber: number;
    status?: string;
    [key: string]: any;
}

interface Phase {
    weeks: Week[];
    [key: string]: any;
}

/**
 * Determines the active week for a phase.
 * Returns the first incomplete week, or the first week if all are complete.
 */
export function getActiveWeek(phase: Phase): Week {
    const incompleteWeek = phase.weeks.find(w => w.status !== 'completed');
    return incompleteWeek || phase.weeks[0];
}

/**
 * Gets upcoming weeks (weeks after the active week)
 */
export function getUpcomingWeeks(phase: Phase, activeWeek: Week, limit: number = 3): Week[] {
    const activeIndex = phase.weeks.findIndex(w => w.weekNumber === activeWeek.weekNumber);
    return phase.weeks.slice(activeIndex + 1, activeIndex + 1 + limit);
}
