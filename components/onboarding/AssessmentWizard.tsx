'use client'

import { useState } from 'react'
import { ASSESSMENT_QUESTIONS } from '@/lib/agents/prompts/assessment'
import type { AssessmentData } from '@/lib/agents/assessment-agent'

interface AssessmentWizardProps {
  onComplete: (assessment: AssessmentData) => void
}

export default function AssessmentWizard({ onComplete }: AssessmentWizardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / ASSESSMENT_QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const handleNext = () => {
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/agents/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process assessment')
      }

      onComplete(data.assessment)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const isAnswered = answers[currentQuestion.id] && answers[currentQuestion.id].trim() !== ''
  const canProceed = currentQuestion.required ? isAnswered : true

  return (
    <div className="bg-surface rounded-lg shadow-sm p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">
            Question {currentQuestionIndex + 1} of {ASSESSMENT_QUESTIONS.length}
          </span>
          <span className="text-sm text-text-secondary">{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-4">{currentQuestion.question}</h2>

        {currentQuestion.type === 'text' && (
          <input
            type="text"
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
        )}

        {currentQuestion.type === 'textarea' && (
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder={currentQuestion.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            autoFocus
          />
        )}

        {currentQuestion.type === 'select' && currentQuestion.options && (
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full px-4 py-3 text-left border-2 rounded-lg transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <span className="font-medium text-text-primary">{option.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-2 text-text-secondary hover:text-text-primary disabled:opacity-0 disabled:cursor-default font-medium"
        >
          ← Back
        </button>

        <button
          onClick={handleNext}
          disabled={!canProceed || isLoading}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : currentQuestionIndex === ASSESSMENT_QUESTIONS.length - 1 ? (
            'Generate Gap Analysis →'
          ) : (
            'Next →'
          )}
        </button>
      </div>
    </div>
  )
}
