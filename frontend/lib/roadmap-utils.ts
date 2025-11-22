import type { Roadmap, Week, Phase, Resource, SearchFilters, LegacyRoadmap, Task } from './types';
import { isNewRoadmap, isLegacyRoadmap } from './types';

/**
 * Get all weeks from a roadmap (supports both old and new formats)
 */
export function getAllWeeks(roadmap: Roadmap | LegacyRoadmap): (Week | import('./types').Week)[] {
  // New format (PRD v4.1): phases[{phaseName: Week[]}]
  if (isNewRoadmap(roadmap)) {
    const weeks: Week[] = [];
    for (const phaseDict of roadmap.phases) {
      for (const phaseName in phaseDict) {
        weeks.push(...phaseDict[phaseName]);
      }
    }
    return weeks;
  }

  // Old format (Legacy): phases[].weeks[]
  if (isLegacyRoadmap(roadmap)) {
    return roadmap.phases.flatMap((phase) => phase.weeks);
  }

  return [];
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

// ============================================================================
// NEW FORMAT (PRD v4.1) UTILITY FUNCTIONS
// ============================================================================

/**
 * Get tasks by type from a new format week
 */
export function getTasksByType(week: Week, taskType: string): Task[] {
  if (!week.tasks) return [];
  return week.tasks.filter(t => t.task_type === taskType);
}

/**
 * Get unique task types from a new format week
 */
export function getUniqueTaskTypes(week: Week): string[] {
  if (!week.tasks) return [];
  return [...new Set(week.tasks.map(t => t.task_type))];
}

/**
 * Calculate task distribution for a new format week
 * Returns percentage breakdown by task type
 */
export function calculateTaskDistribution(week: Week): Record<string, number> {
  if (!week.tasks || week.tasks.length === 0) return {};

  const distribution: Record<string, number> = {};
  const totalMinutes = week.total_minutes || week.tasks.reduce((sum, t) => sum + t.estimated_minutes, 0);

  for (const task of week.tasks) {
    if (!distribution[task.task_type]) {
      distribution[task.task_type] = 0;
    }
    distribution[task.task_type] += task.estimated_minutes;
  }

  // Convert to percentages
  for (const type in distribution) {
    distribution[type] = Math.round((distribution[type] / totalMinutes) * 100);
  }

  return distribution;
}

/**
 * Get task category display name (label or formatted type)
 */
export function getTaskCategoryDisplay(task: Task): string {
  if (task.task_category_label) {
    return task.task_category_label;
  }
  // Format task_type: "watch-demo" → "Watch Demo"
  return task.task_type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Count tasks with quality warnings
 */
export function countQualityWarnings(week: Week): number {
  if (!week.tasks) return 0;
  return week.tasks.filter(t => t.quality_warning === 'LOW_CONFIDENCE').length;
}

/**
 * Get phase names from new format roadmap
 */
export function getPhaseNames(roadmap: Roadmap): string[] {
  if (!isNewRoadmap(roadmap)) return [];

  const names: string[] = [];
  for (const phaseDict of roadmap.phases) {
    names.push(...Object.keys(phaseDict));
  }
  return names;
}

/**
 * Get phase for a specific week number (new format only)
 */
export function getPhaseForWeek(roadmap: Roadmap, weekNumber: number): { phaseName: string; weeks: Week[] } | null {
  if (!isNewRoadmap(roadmap)) return null;

  for (const phaseDict of roadmap.phases) {
    for (const phaseName in phaseDict) {
      const weeks = phaseDict[phaseName];
      if (weeks.some(w => w.week_number === weekNumber)) {
        return { phaseName, weeks };
      }
    }
  }

  return null;
}

/**
 * Convert total minutes to hours display
 */
export function minutesToHoursDisplay(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

/**
 * Get roadmap title (works for both formats)
 */
export function getRoadmapTitle(roadmap: Roadmap | LegacyRoadmap): string {
  if ('roadmap_title' in roadmap) {
    return roadmap.roadmap_title;
  }
  if ('title' in roadmap) {
    return roadmap.title;
  }
  return 'Untitled Roadmap';
}

/**
 * Get total duration in weeks (works for both formats)
 */
export function getTotalDurationWeeks(roadmap: Roadmap | LegacyRoadmap): number {
  if ('total_duration_weeks' in roadmap) {
    return roadmap.total_duration_weeks;
  }
  if ('totalDurationWeeks' in roadmap) {
    return roadmap.totalDurationWeeks;
  }
  return 0;
}

/**
 * Get week progress for new format (count completed tasks)
 */
export function getNewFormatWeekProgress(week: Week): { completed: number; total: number; percentage: number } {
  if (!week.tasks) {
    return { completed: 0, total: 0, percentage: 0 };
  }

  // Note: Task completion tracking would require additional state management
  // For now, return totals based on task count
  const total = week.tasks.length;
  const completed = 0; // Would need to be tracked separately

  return {
    completed,
    total,
    percentage: 0,
  };
}
