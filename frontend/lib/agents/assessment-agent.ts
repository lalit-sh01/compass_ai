export interface AssessmentData {
  goal: {
    title: string
    description: string
    timeframe: number
    motivation: string
  }
  currentSkills: {
    technical: string[]
    soft: string[]
    experience: {
      years: number
      roles: string[]
      projects: string[]
    }
  }
  learningPreferences: {
    pace: 'fast' | 'moderate' | 'slow'
    style: 'hands-on' | 'theoretical' | 'balanced'
    hoursPerWeek: number
    preferredResources: string[]
  }
  constraints: {
    availableTime: string
    budget: 'free' | 'low' | 'moderate' | 'high'
    prerequisites: string[]
    challenges: string[]
  }
}
