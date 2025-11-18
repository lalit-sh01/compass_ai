'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AssessmentWizard from '@/components/onboarding/AssessmentWizard'
import GapAnalysisReview from '@/components/onboarding/GapAnalysisReview'
import RoadmapPreview from '@/components/onboarding/RoadmapPreview'
import type { AssessmentData } from '@/lib/agents/assessment-agent'
import type { GapAnalysisData } from '@/lib/agents/gap-analysis-agent'
import type { Roadmap } from '@/lib/types'

type OnboardingStep = 'assessment' | 'gap-analysis' | 'roadmap-preview'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('assessment')
  const [assessment, setAssessment] = useState<AssessmentData | null>(null)
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysisData | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)

  const handleAssessmentComplete = (data: AssessmentData) => {
    setAssessment(data)
    setCurrentStep('gap-analysis')
  }

  const handleGapAnalysisComplete = (data: GapAnalysisData, skills: string[]) => {
    setGapAnalysis(data)
    setSelectedSkills(skills)
    setCurrentStep('roadmap-preview')
  }

  const handleRoadmapSave = async (roadmap: Roadmap) => {
    // Navigate to the newly created roadmap
    // For now, just go to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <Step
              number={1}
              label="Assessment"
              active={currentStep === 'assessment'}
              completed={currentStep !== 'assessment'}
            />
            <Connector completed={currentStep !== 'assessment'} />
            <Step
              number={2}
              label="Gap Analysis"
              active={currentStep === 'gap-analysis'}
              completed={currentStep === 'roadmap-preview'}
            />
            <Connector completed={currentStep === 'roadmap-preview'} />
            <Step
              number={3}
              label="Roadmap"
              active={currentStep === 'roadmap-preview'}
              completed={false}
            />
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 'assessment' && (
          <AssessmentWizard onComplete={handleAssessmentComplete} />
        )}

        {currentStep === 'gap-analysis' && assessment && (
          <GapAnalysisReview
            assessment={assessment}
            onComplete={handleGapAnalysisComplete}
          />
        )}

        {currentStep === 'roadmap-preview' && assessment && gapAnalysis && (
          <RoadmapPreview
            assessment={assessment}
            gapAnalysis={gapAnalysis}
            selectedSkills={selectedSkills}
            onSave={handleRoadmapSave}
          />
        )}
      </div>
    </div>
  )
}

function Step({
  number,
  label,
  active,
  completed,
}: {
  number: number
  label: string
  active: boolean
  completed: boolean
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-semibold transition-colors ${
          active
            ? 'border-blue-600 bg-blue-600 text-white'
            : completed
            ? 'border-green-600 bg-green-600 text-white'
            : 'border-gray-300 bg-white text-gray-400'
        }`}
      >
        {completed ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          number
        )}
      </div>
      <span
        className={`text-sm font-medium ${
          active ? 'text-blue-600' : completed ? 'text-green-600' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

function Connector({ completed }: { completed: boolean }) {
  return (
    <div
      className={`h-0.5 w-24 transition-colors ${completed ? 'bg-green-600' : 'bg-gray-300'}`}
    />
  )
}
