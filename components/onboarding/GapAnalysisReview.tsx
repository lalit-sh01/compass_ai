'use client'

import { useState, useEffect } from 'react'
import type { AssessmentData } from '@/lib/agents/assessment-agent'
import type { GapAnalysisData, SkillGap } from '@/lib/agents/gap-analysis-agent'

interface GapAnalysisReviewProps {
  assessment: AssessmentData
  onComplete: (gapAnalysis: GapAnalysisData, selectedSkills: string[]) => void
}

export default function GapAnalysisReview({ assessment, onComplete }: GapAnalysisReviewProps) {
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysisData | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    runGapAnalysis()
  }, [])

  const runGapAnalysis = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/agents/gap-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessment }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate gap analysis')
      }

      setGapAnalysis(data.gapAnalysis)

      // Auto-select all essential and recommended skills
      const autoSelected = new Set([
        ...data.gapAnalysis.targetRole.requiredSkills.essential.map((s: SkillGap) => s.skill),
        ...data.gapAnalysis.targetRole.requiredSkills.recommended.map((s: SkillGap) => s.skill),
      ])
      setSelectedSkills(autoSelected)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSkill = (skill: string) => {
    const newSelected = new Set(selectedSkills)
    if (newSelected.has(skill)) {
      newSelected.delete(skill)
    } else {
      newSelected.add(skill)
    }
    setSelectedSkills(newSelected)
  }

  const handleContinue = () => {
    if (gapAnalysis) {
      onComplete(gapAnalysis, Array.from(selectedSkills))
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Analyzing Your Skills...</h3>
          <p className="text-sm text-gray-600">This may take 20-30 seconds</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <button
          onClick={runGapAnalysis}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!gapAnalysis) return null

  const allSkills = [
    ...gapAnalysis.targetRole.requiredSkills.essential.map((s) => ({ ...s, category: 'essential' })),
    ...gapAnalysis.targetRole.requiredSkills.recommended.map((s) => ({ ...s, category: 'recommended' })),
    ...gapAnalysis.targetRole.requiredSkills.optional.map((s) => ({ ...s, category: 'optional' })),
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Gap Analysis</h2>
        <p className="text-gray-600">
          Based on your goal to become a <strong>{gapAnalysis.targetRole.title}</strong>, we've identified the skills you need to develop.
        </p>
      </div>

      {/* Recommendations Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">💪 Your Strengths</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            {gapAnalysis.recommendations.strengths.slice(0, 3).map((strength, i) => (
              <li key={i}>• {strength}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">⚡ Quick Wins</h3>
          <ul className="text-sm text-green-800 space-y-1">
            {gapAnalysis.recommendations.quickWins.slice(0, 3).map((win, i) => (
              <li key={i}>• {win}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skill Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Skills to Include in Your Roadmap</h3>
        <p className="text-sm text-gray-600 mb-4">
          We've pre-selected essential and recommended skills. You can customize this list.
        </p>

        <div className="space-y-4">
          {/* Essential Skills */}
          <SkillSection
            title="Essential Skills"
            description="Must-have skills for your goal"
            skills={allSkills.filter(s => s.category === 'essential')}
            selectedSkills={selectedSkills}
            onToggle={toggleSkill}
            badgeColor="bg-red-100 text-red-800"
          />

          {/* Recommended Skills */}
          <SkillSection
            title="Recommended Skills"
            description="Strongly recommended to succeed"
            skills={allSkills.filter(s => s.category === 'recommended')}
            selectedSkills={selectedSkills}
            onToggle={toggleSkill}
            badgeColor="bg-yellow-100 text-yellow-800"
          />

          {/* Optional Skills */}
          <SkillSection
            title="Optional Skills"
            description="Nice to have for additional value"
            skills={allSkills.filter(s => s.category === 'optional')}
            selectedSkills={selectedSkills}
            onToggle={toggleSkill}
            badgeColor="bg-gray-100 text-gray-800"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>{selectedSkills.size}</strong> skills selected • Estimated time:{' '}
          <strong>
            {allSkills
              .filter(s => selectedSkills.has(s.skill))
              .reduce((sum, s) => sum + s.estimatedWeeks, 0)}{' '}
            weeks
          </strong>
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={selectedSkills.size === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Generate Roadmap →
        </button>
      </div>
    </div>
  )
}

function SkillSection({
  title,
  description,
  skills,
  selectedSkills,
  onToggle,
  badgeColor,
}: {
  title: string
  description: string
  skills: any[]
  selectedSkills: Set<string>
  onToggle: (skill: string) => void
  badgeColor: string
}) {
  if (skills.length === 0) return null

  return (
    <div>
      <div className="mb-2">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="space-y-2">
        {skills.map((skill) => (
          <button
            key={skill.skill}
            onClick={() => onToggle(skill.skill)}
            className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
              selectedSkills.has(skill.skill)
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{skill.skill}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
                    {skill.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{skill.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>Current: {skill.currentLevel}</span>
                  <span>→</span>
                  <span>Target: {skill.targetLevel}</span>
                  <span>•</span>
                  <span>{skill.estimatedWeeks} weeks</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {selectedSkills.has(skill.skill) && (
                  <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
