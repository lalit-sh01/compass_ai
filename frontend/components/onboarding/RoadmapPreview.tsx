'use client'

import { useState, useEffect } from 'react'
import type { AssessmentData } from '@/lib/agents/assessment-agent'
import type { GapAnalysisData } from '@/lib/agents/gap-analysis-agent'
import type { Roadmap } from '@/lib/types'
import Link from 'next/link'
import { useApiClient } from '@/lib/api-client'

interface RoadmapPreviewProps {
  assessment: AssessmentData
  gapAnalysis: GapAnalysisData
  selectedSkills: string[]
  onSave: (roadmap: Roadmap) => Promise<void>
}

export default function RoadmapPreview({
  assessment,
  gapAnalysis,
  selectedSkills,
  onSave,
}: RoadmapPreviewProps) {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const apiClient = useApiClient()

  useEffect(() => {
    generateRoadmap()
  }, [])

  const generateRoadmap = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const data = await apiClient.post('/api/agents/generate-roadmap', {
        assessment,
        gapAnalysis,
        selectedSkills
      })

      setRoadmap(data.roadmap)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!roadmap) return

    setIsSaving(true)
    setError(null)

    try {
      const data = await apiClient.post('/api/roadmaps', {
        roadmap,
        assessment,
        gapAnalysis,
        selectedSkills,
      })

      // Navigate to the viewer with the roadmap ID
      window.location.href = `/viewer/${data.id}`
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsSaving(false)
    }
  }

  if (isGenerating) {
    return (
      <div className="bg-surface rounded-lg shadow-sm p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <h3 className="text-lg font-semibold text-text-primary">Crafting Your Personalized Roadmap...</h3>
          <p className="text-sm text-gray-600">This may take 30-60 seconds. We're creating a comprehensive {assessment.goal.timeframe}-week plan just for you.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-surface rounded-lg shadow-sm p-8">
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <button
          onClick={generateRoadmap}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!roadmap) return null

  return (
    <div className="bg-surface rounded-lg shadow-sm p-8">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-text-primary mb-2">Your Roadmap is Ready!</h2>
        <p className="text-gray-600">
          We've created a comprehensive {roadmap.totalDurationWeeks}-week learning plan tailored to your goals.
        </p>
      </div>

      {/* Roadmap Overview */}
      <div className="mb-8 space-y-6">
        {/* Title and Goal */}
        <div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">{roadmap.title}</h3>
          <p className="text-lg text-text-secondary">{roadmap.goal}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-primary/5 rounded-lg">
            <div className="text-2xl font-bold text-text-primary">{roadmap.totalDurationWeeks}</div>
            <div className="text-sm text-text-secondary">Weeks</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-900">{roadmap.phases.length}</div>
            <div className="text-sm text-green-700">Phases</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-900">{roadmap.coreSkills.length}</div>
            <div className="text-sm text-purple-700">Core Skills</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-900">{roadmap.timeCommitmentPerWeek}</div>
            <div className="text-sm text-orange-700">Per Week</div>
          </div>
        </div>

        {/* Phases Overview */}
        <div>
          <h4 className="font-semibold text-text-primary mb-3">Learning Phases</h4>
          <div className="space-y-3">
            {roadmap.phases.map((phase) => (
              <div key={phase.phaseNumber} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium text-primary">Phase {phase.phaseNumber}</span>
                    <h5 className="font-semibold text-text-primary">{phase.title}</h5>
                  </div>
                  <span className="text-sm text-text-secondary">{phase.weekRange}</span>
                </div>
                <p className="text-sm text-gray-600">{phase.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Skills */}
        <div>
          <h4 className="font-semibold text-text-primary mb-3">Core Skills You'll Master</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.coreSkills.slice(0, 6).map((skill, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-text-primary text-sm mb-1">{skill.skill}</div>
                <div className="text-xs text-gray-600">{skill.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          onClick={generateRoadmap}
          className="px-4 py-2 text-text-secondary hover:text-text-primary font-medium"
        >
          Regenerate
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          ) : (
            'Save & Start Learning →'
          )}
        </button>
      </div>
    </div>
  )
}
