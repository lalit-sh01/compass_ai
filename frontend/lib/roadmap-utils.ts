import type { Roadmap, Week, Phase, Resource, SearchFilters } from './types';

/**
 * Get all weeks from a roadmap
 */
export function getAllWeeks(roadmap: Roadmap): Week[] {
  return roadmap.phases.flatMap((phase) => phase.weeks);
}

/**
 * Get a specific week by number
 */
export function getWeekByNumber(roadmap: Roadmap, weekNumber: number): Week | undefined {
  return getAllWeeks(roadmap).find((week) => week.weekNumber === weekNumber);
}

/**
 * Get a specific phase by number
 */
export function getPhaseByNumber(roadmap: Roadmap, phaseNumber: number): Phase | undefined {
  return roadmap.phases.find((phase) => phase.phaseNumber === phaseNumber);
}

/**
 * Get all resources from a week
 */
export function getWeekResources(week: Week): Resource[] {
  const resources: Resource[] = [];

  // Resources from research section
  if (week.researchSection?.resources) {
    resources.push(...week.researchSection.resources);
  }

  // Resources from deep dive topics
  week.researchSection?.deepDiveTopics?.forEach((topic) => {
    if (topic.suggestedResources) {
      resources.push(...topic.suggestedResources);
    }

    // Resources from subtasks
    topic.subtasks?.forEach((subtask) => {
      if (subtask.suggestedResources) {
        resources.push(...subtask.suggestedResources);
      }
    });
  });

  return resources;
}

/**
 * Get all unique resources from entire roadmap
 */
export function getAllResources(roadmap: Roadmap): Resource[] {
  const allResources: Resource[] = [];
  const seen = new Set<string>();

  getAllWeeks(roadmap).forEach((week) => {
    getWeekResources(week).forEach((resource) => {
      const key = `${resource.title}-${resource.url || ''}`;
      if (!seen.has(key)) {
        seen.add(key);
        allResources.push(resource);
      }
    });
  });

  return allResources;
}

/**
 * Calculate total completed deliverables in a week
 */
export function getWeekProgress(week: Week): { completed: number; total: number; percentage: number } {
  let completed = 0;
  let total = 0;

  const countDeliverables = (deliverables: Array<{ isCompleted: boolean }> | undefined) => {
    if (!deliverables) return;
    deliverables.forEach((d) => {
      total++;
      if (d.isCompleted) completed++;
    });
  };

  // Count from build section
  countDeliverables(week.buildSection?.deliverables);

  // Count from research section
  countDeliverables(week.researchSection?.deliverables);

  // Count deep dive topics
  week.researchSection?.deepDiveTopics?.forEach((topic) => {
    total++;
    if (topic.isCompleted) completed++;

    // Count subtasks
    topic.subtasks?.forEach((subtask) => {
      total++;
      if (subtask.isCompleted) completed++;
    });
  });

  // Count from share section
  countDeliverables(week.shareSection?.deliverables);

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}

/**
 * Calculate phase progress
 */
export function getPhaseProgress(phase: Phase): { completed: number; total: number; percentage: number } {
  let totalCompleted = 0;
  let totalItems = 0;

  phase.weeks.forEach((week) => {
    const progress = getWeekProgress(week);
    totalCompleted += progress.completed;
    totalItems += progress.total;
  });

  const percentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return { completed: totalCompleted, total: totalItems, percentage };
}

/**
 * Calculate overall roadmap progress
 */
export function getRoadmapProgress(roadmap: Roadmap): { completed: number; total: number; percentage: number } {
  let totalCompleted = 0;
  let totalItems = 0;

  roadmap.phases.forEach((phase) => {
    const progress = getPhaseProgress(phase);
    totalCompleted += progress.completed;
    totalItems += progress.total;
  });

  const percentage = totalItems > 0 ? Math.round((totalCompleted / totalItems) * 100) : 0;

  return { completed: totalCompleted, total: totalItems, percentage };
}

/**
 * Search weeks by term
 */
export function searchWeeks(roadmap: Roadmap, searchTerm: string): Week[] {
  if (!searchTerm.trim()) {
    return getAllWeeks(roadmap);
  }

  const term = searchTerm.toLowerCase();

  return getAllWeeks(roadmap).filter((week) => {
    // Search in week title and theme
    if (week.title.toLowerCase().includes(term) || week.theme.toLowerCase().includes(term)) {
      return true;
    }

    // Search in build section
    if (week.buildSection?.projectTitle.toLowerCase().includes(term)) {
      return true;
    }

    if (week.buildSection?.description.toLowerCase().includes(term)) {
      return true;
    }

    // Search in research topics
    if (week.researchSection?.deepDiveTopics?.some((topic) => topic.description.toLowerCase().includes(term))) {
      return true;
    }

    // Search in share section
    if (week.shareSection?.artifactTitle.toLowerCase().includes(term)) {
      return true;
    }

    return false;
  });
}

/**
 * Filter weeks by filters
 */
export function filterWeeks(roadmap: Roadmap, filters: SearchFilters): Week[] {
  let weeks = getAllWeeks(roadmap);

  // Filter by phase
  if (filters.phase !== undefined) {
    weeks = weeks.filter((week) => {
      const phase = roadmap.phases.find((p) => p.weeks.some((w) => w.weekNumber === week.weekNumber));
      return phase?.phaseNumber === filters.phase;
    });
  }

  // Filter by status
  if (filters.status) {
    weeks = weeks.filter((week) => week.status === filters.status);
  }

  // Filter by search term
  if (filters.searchTerm) {
    weeks = searchWeeks({ ...roadmap, phases: [{ phaseNumber: 0, title: '', summary: '', weekRange: '', weeks }] }, filters.searchTerm);
  }

  return weeks;
}

/**
 * Get resource type badge color
 */
export function getResourceTypeColor(type: string): string {
  const typeMap: Record<string, string> = {
    YouTube: 'bg-red-100 text-red-700',
    Article: 'bg-blue-100 text-blue-700',
    Guide: 'bg-green-100 text-green-700',
    Book: 'bg-purple-100 text-purple-700',
    Course: 'bg-orange-100 text-orange-700',
    Documentation: 'bg-gray-100 text-gray-700',
    Tool: 'bg-yellow-100 text-yellow-700',
    Paper: 'bg-indigo-100 text-indigo-700',
    Blog: 'bg-pink-100 text-pink-700',
    Platform: 'bg-teal-100 text-teal-700',
    Template: 'bg-cyan-100 text-cyan-700',
    Gallery: 'bg-violet-100 text-violet-700',
    Community: 'bg-emerald-100 text-emerald-700',
    Framework: 'bg-lime-100 text-lime-700',
    Podcast: 'bg-rose-100 text-rose-700',
    Networking: 'bg-amber-100 text-amber-700',
  };

  return typeMap[type] || 'bg-gray-100 text-gray-700';
}

/**
 * Format date string to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get weeks by status
 */
export function getWeeksByStatus(roadmap: Roadmap, status: string): Week[] {
  return getAllWeeks(roadmap).filter((week) => week.status === status);
}
