export interface SkillGap {
  skill: string
  description: string
  currentLevel: 'none' | 'beginner' | 'intermediate' | 'advanced'
  targetLevel: 'intermediate' | 'advanced' | 'expert'
  priority: 'high' | 'medium' | 'low'
  estimatedWeeks: number
}

export interface GapAnalysisData {
  targetRole: {
    title: string
    requiredSkills: {
      essential: SkillGap[]
      recommended: SkillGap[]
      optional: SkillGap[]
    }
  }
  learningPath: {
    phase1: {
      title: string
      focus: string[]
      duration: number
    }
    phase2: {
      title: string
      focus: string[]
      duration: number
    }
    phase3: {
      title: string
      focus: string[]
      duration: number
    }
  }
  recommendations: {
    strengths: string[]
    quickWins: string[]
    challenges: string[]
    resources: string[]
  }
}
