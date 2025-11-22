export interface Question {
    id: string
    question: string
    type: 'text' | 'textarea' | 'select'
    options?: { label: string; value: string }[]
    placeholder?: string
    required?: boolean
}

export const ASSESSMENT_QUESTIONS: Question[] = [
    {
        id: 'goal',
        question: 'What is your primary goal for this roadmap?',
        type: 'textarea',
        placeholder: 'e.g., Become a Senior PM, Transition into AI Product Management...',
        required: true,
    },
    {
        id: 'experience',
        question: 'How many years of relevant experience do you have?',
        type: 'select',
        options: [
            { label: '0-2 years', value: '0-2' },
            { label: '3-5 years', value: '3-5' },
            { label: '5-8 years', value: '5-8' },
            { label: '8+ years', value: '8+' },
        ],
        required: true,
    },
    {
        id: 'current_role',
        question: 'What is your current role?',
        type: 'text',
        placeholder: 'e.g., Software Engineer, Marketing Manager, Junior PM',
        required: true,
    },
    {
        id: 'skills',
        question: 'What are your top 3 current skills?',
        type: 'textarea',
        placeholder: 'e.g., Data Analysis, User Research, Python...',
        required: true,
    },
    {
        id: 'learning_style',
        question: 'How do you prefer to learn?',
        type: 'select',
        options: [
            { label: 'Hands-on (Building projects)', value: 'hands-on' },
            { label: 'Theoretical (Reading/Courses)', value: 'theoretical' },
            { label: 'Balanced', value: 'balanced' },
        ],
        required: true,
    },
    {
        id: 'time_commitment',
        question: 'How many hours per week can you dedicate?',
        type: 'select',
        options: [
            { label: '5-10 hours', value: '5-10' },
            { label: '10-20 hours', value: '10-20' },
            { label: '20+ hours', value: '20+' },
        ],
        required: true,
    },
]
