// TypeScript types for the AI PM Roadmap Schema
// Designed to handle variations in the actual data structure

export interface Resource {
  title: string;
  type: string;
  url?: string; // Optional for resources list, required for suggestedResources
}

export interface Subtask {
  description: string;
  isCompleted: boolean;
  suggestedResources?: Resource[];
}

export interface DeepDiveTopic {
  description: string;
  isCompleted: boolean;
  suggestedResources?: Resource[];
  subtasks?: Subtask[];
}

export interface Deliverable {
  description: string;
  isCompleted: boolean;
  subtasks?: Subtask[]; // Some deliverables have nested subtasks
}

export interface BuildSection {
  hours: number;
  projectTitle: string;
  description: string;
  technicalStack?: string[];
  components?: string[];
  deliverables?: Deliverable[];
}

export interface ResearchSection {
  hours: number;
  deepDiveTopics?: DeepDiveTopic[];
  resources?: Resource[];
  deliverables?: Deliverable[]; // Some weeks have deliverables in research section
}

export interface ShareSection {
  hours: number;
  artifactTitle: string;
  artifactDescription: string;
  details?: string[];
  tags?: string[];
  deliverables?: Deliverable[]; // Some weeks have deliverables in share section
}

export interface TimeBreakdown {
  build: number;
  research: number;
  share: number;
}

export interface Week {
  weekNumber: number;
  title: string;
  theme: string;
  totalHours: number;
  status: string;
  timeBreakdown: TimeBreakdown;
  buildSection?: BuildSection;
  researchSection?: ResearchSection;
  shareSection?: ShareSection;
}

export interface Phase {
  phaseNumber: number;
  title: string;
  summary: string;
  weekRange: string;
  weeks: Week[];
}

export interface CoreSkill {
  skill: string;
  description: string;
  relevantWeeks: string;
}

export interface Profile {
  description: string;
  experience: string;
}

export interface WeeklyTimeAllocationTemplate {
  monTue: string;
  wedThu: string;
  friSat: string;
  sun: string;
}

export interface Metric {
  description: string;
  isCompleted: boolean;
}

export interface SuccessMetric {
  category: string;
  metrics: Metric[];
}

export interface MasterResourceItem {
  name: string;
  description: string;
}

export interface MasterResource {
  category: string;
  items: MasterResourceItem[];
}

export interface InterviewBank {
  category: string;
  weight: string;
  framework: string;
  notes: string;
  questions: string[];
}

export interface DemonstrationMoment {
  category: string;
  items: string[];
}

export interface WeeklyRituals {
  daily: string;
  weekly: string;
  biWeekly: string;
}

export interface RedFlagCheckpoint {
  checkpoint: string;
  items: string[];
  adjustment: string;
}

export interface CompetitiveAdvantage {
  advantage: string;
  description: string;
  leverage?: {
    inInterviews?: string;
    inNetworking?: string;
  };
}

export interface SupplementalSections {
  weeklyTimeAllocationTemplate: WeeklyTimeAllocationTemplate;
  successMetrics: SuccessMetric[];
  masterResources: MasterResource[];
  interviewBank: InterviewBank[];
  demonstrationMoments: DemonstrationMoment[];
  weeklyRituals: WeeklyRituals;
  redFlagsAndAdjustments: RedFlagCheckpoint[];
  competitiveAdvantages: CompetitiveAdvantage[];
  finalMotivation: string;
  nextSteps: string[];
}

export interface Roadmap {
  title: string;
  goal: string;
  startDate: string;
  targetEndDate: string;
  totalDurationWeeks: number;
  timeCommitmentPerWeek: string;
  profile: Profile;
  learningStyle: string;
  coreSkills: CoreSkill[];
  phases: Phase[];
  supplementalSections: SupplementalSections;
}

// Helper type for filtering and search
export interface SearchFilters {
  phase?: number;
  skill?: string;
  status?: string;
  searchTerm?: string;
}
