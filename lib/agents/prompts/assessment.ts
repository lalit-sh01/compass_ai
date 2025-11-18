export const ASSESSMENT_SYSTEM_PROMPT = `You are an expert career counselor and learning path designer. Your role is to assess a user's current skills, experience, and goals to create a personalized learning roadmap.

Your task is to analyze the user's responses and create a comprehensive assessment that will be used to generate a tailored learning roadmap.

You must output a valid JSON object with the following structure:

{
  "goal": {
    "title": "The user's learning goal (e.g., 'AWS Solutions Architect')",
    "description": "Detailed description of what the user wants to achieve",
    "timeframe": "Target timeframe in weeks (e.g., 16 for 4 months)",
    "motivation": "User's motivation and why they want to achieve this goal"
  },
  "currentSkills": {
    "technical": ["Array of technical skills user currently has"],
    "soft": ["Array of soft skills user currently has"],
    "experience": {
      "years": "Number of years of relevant experience",
      "roles": ["Previous or current roles"],
      "projects": ["Notable projects or achievements"]
    }
  },
  "learningPreferences": {
    "pace": "fast | moderate | slow",
    "style": "hands-on | theoretical | balanced",
    "hoursPerWeek": "Number of hours user can dedicate per week",
    "preferredResources": ["video", "articles", "documentation", "courses", "books"]
  },
  "constraints": {
    "availableTime": "Description of time availability",
    "budget": "free | low | moderate | high",
    "prerequisites": ["Any prerequisites user has already completed"],
    "challenges": ["Anticipated challenges or concerns"]
  }
}

Be thorough, ask clarifying questions if needed, and ensure the assessment accurately captures the user's current state and aspirations.`

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'goal',
    question: 'What is your learning goal? What do you want to become or achieve?',
    placeholder: 'e.g., AWS Solutions Architect, Full-Stack Developer, Data Scientist',
    type: 'text' as const,
    required: true,
  },
  {
    id: 'timeframe',
    question: 'What is your target timeframe?',
    placeholder: 'e.g., 3 months, 6 months, 1 year',
    type: 'select' as const,
    required: true,
    options: [
      { value: '8', label: '2 months (8 weeks)' },
      { value: '12', label: '3 months (12 weeks)' },
      { value: '16', label: '4 months (16 weeks)' },
      { value: '24', label: '6 months (24 weeks)' },
      { value: '36', label: '9 months (36 weeks)' },
      { value: '52', label: '1 year (52 weeks)' },
    ],
  },
  {
    id: 'motivation',
    question: 'Why do you want to achieve this goal?',
    placeholder: 'e.g., Career change, promotion, personal growth, new project',
    type: 'textarea' as const,
    required: true,
  },
  {
    id: 'currentRole',
    question: 'What is your current role or background?',
    placeholder: 'e.g., Junior Developer, Career Changer, Student, DevOps Engineer',
    type: 'text' as const,
    required: true,
  },
  {
    id: 'technicalSkills',
    question: 'What technical skills do you currently have?',
    placeholder: 'e.g., Python, JavaScript, Docker, SQL, React',
    type: 'textarea' as const,
    required: true,
  },
  {
    id: 'experience',
    question: 'How many years of relevant experience do you have?',
    type: 'select' as const,
    required: true,
    options: [
      { value: '0', label: 'No experience (Beginner)' },
      { value: '1', label: '0-1 years' },
      { value: '2', label: '1-3 years' },
      { value: '5', label: '3-5 years' },
      { value: '8', label: '5-10 years' },
      { value: '10', label: '10+ years' },
    ],
  },
  {
    id: 'learningStyle',
    question: 'What is your preferred learning style?',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'hands-on', label: 'Hands-on (Learning by doing)' },
      { value: 'theoretical', label: 'Theoretical (Understanding concepts first)' },
      { value: 'balanced', label: 'Balanced (Mix of both)' },
    ],
  },
  {
    id: 'hoursPerWeek',
    question: 'How many hours per week can you dedicate to learning?',
    type: 'select' as const,
    required: true,
    options: [
      { value: '5', label: '5 hours/week (1 hour/day)' },
      { value: '10', label: '10 hours/week (1-2 hours/day)' },
      { value: '15', label: '15 hours/week (2-3 hours/day)' },
      { value: '20', label: '20 hours/week (3-4 hours/day)' },
      { value: '30', label: '30+ hours/week (Full-time)' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget for learning resources?',
    type: 'select' as const,
    required: true,
    options: [
      { value: 'free', label: 'Free resources only' },
      { value: 'low', label: 'Low ($0-$50/month)' },
      { value: 'moderate', label: 'Moderate ($50-$200/month)' },
      { value: 'high', label: 'High ($200+/month)' },
    ],
  },
  {
    id: 'challenges',
    question: 'What challenges do you anticipate in your learning journey?',
    placeholder: 'e.g., Time management, staying motivated, finding resources',
    type: 'textarea' as const,
    required: false,
  },
]

export function buildAssessmentPrompt(answers: Record<string, string>): string {
  return `Based on the following user responses, create a comprehensive assessment:

**Learning Goal**: ${answers.goal}
**Target Timeframe**: ${answers.timeframe} weeks
**Motivation**: ${answers.motivation}
**Current Role**: ${answers.currentRole}
**Technical Skills**: ${answers.technicalSkills}
**Years of Experience**: ${answers.experience} years
**Learning Style**: ${answers.learningStyle}
**Hours per Week**: ${answers.hoursPerWeek} hours
**Budget**: ${answers.budget}
${answers.challenges ? `**Anticipated Challenges**: ${answers.challenges}` : ''}

Analyze these responses and create a structured assessment that captures:
1. The user's clear goal and what they want to achieve
2. Their current skill level and experience
3. Their learning preferences and constraints
4. Any gaps or areas they need to focus on

Output the assessment as a valid JSON object following the specified schema.`
}
