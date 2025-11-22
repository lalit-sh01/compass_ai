'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfilerInterview } from '@/components/streaming/ProfilerInterview'
import { RoadmapGenerationStream } from '@/components/streaming/RoadmapGenerationStream'
import type { Roadmap, UserContext } from '@/lib/types'
import { useApiClient } from '@/lib/api-client'

type OnboardingStep = 'profiler-interview' | 'roadmap-generation' | 'success'

export default function OnboardingPage() {
  const router = useRouter()
  const apiClient = useApiClient()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('profiler-interview')
  const [generatedRoadmap, setGeneratedRoadmap] = useState<Roadmap | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [userContext, setUserContext] = useState<UserContext | null>(null)

  // Called when profiler interview completes
  const handleProfilerComplete = async (profileData: UserContext) => {
    console.log('Profiler complete, user context:', profileData)
    setUserContext(profileData)
    // Small delay to show the completion message
    setTimeout(() => {
      setCurrentStep('roadmap-generation')
    }, 1000)
  }

  const handleGenerationComplete = async (roadmap: Roadmap) => {
    setGeneratedRoadmap(roadmap)
    setCurrentStep('success')

    // Save roadmap to database
    try {
      const response = await apiClient.post('/api/roadmaps', {
        title: roadmap.roadmap_title || userContext?.specific_goal || 'Your Roadmap',
        description: userContext?.specific_goal || '',
        original_roadmap: roadmap,
        current_roadmap: roadmap,
      })
      console.log('Roadmap saved:', response)
    } catch (err) {
      console.error('Failed to save roadmap:', err)
      // Still allow user to view roadmap even if save fails
    }
  }

  const handleGenerationError = (err: string) => {
    setError(err)
    setCurrentStep('profiler-interview')
  }

  const handleViewRoadmap = () => {
    if (generatedRoadmap) {
      router.push('/viewer')
    }
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  const handleProfilerError = (err: string) => {
    setError(err)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Personalized Roadmap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {currentStep === 'profiler-interview'
              ? "Let's understand your goals and learning style"
              : currentStep === 'roadmap-generation'
                ? 'Generating your customized roadmap...'
                : 'Your roadmap is ready!'}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        {/* Step Content */}
        {currentStep === 'profiler-interview' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <ProfilerInterview
              onComplete={handleProfilerComplete}
              onError={handleProfilerError}
            />
          </div>
        )}

        {currentStep === 'roadmap-generation' && userContext && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <RoadmapGenerationStream
              userContext={userContext}
              onComplete={handleGenerationComplete}
              onError={handleGenerationError}
            />
          </div>
        )}

        {currentStep === 'success' && generatedRoadmap && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl">✨</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Roadmap is Ready!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We've created a personalized learning path tailored to your goals and learning style.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold">{generatedRoadmap.roadmap_title}</span>
              </p>

              {userContext && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-left max-w-md mx-auto">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Your Profile:</h3>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>
                      <strong>Goal:</strong> {userContext.specific_goal}
                    </li>
                    {userContext.goal_domain && (
                      <li>
                        <strong>Domain:</strong> {userContext.goal_domain}
                      </li>
                    )}
                    {userContext.learning_preferences && (
                      <li>
                        <strong>Learning Style:</strong> {userContext.learning_preferences}
                      </li>
                    )}
                    {userContext.learning_style && !userContext.learning_preferences && (
                      <li>
                        <strong>Learning Style:</strong> {userContext.learning_style}
                      </li>
                    )}
                    <li>
                      <strong>Weekly Hours:</strong> {userContext.weekly_hours_cap}h
                    </li>
                    <li>
                      <strong>Timeline:</strong> {userContext.deadline_months} months
                    </li>
                    {userContext.budget_constraint && (
                      <li>
                        <strong>Budget:</strong> {userContext.budget_constraint}
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex gap-4 pt-6 justify-center">
                <button
                  onClick={handleBackToDashboard}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-medium"
                >
                  Back to Dashboard
                </button>
                <button
                  onClick={handleViewRoadmap}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium"
                >
                  View Roadmap
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
