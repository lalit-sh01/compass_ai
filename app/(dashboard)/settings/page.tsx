import { Suspense } from 'react'
import { getCurrentUser } from '@/lib/db/users'
import { hasApiKey } from '@/lib/db/api-keys'
import { redirect } from 'next/navigation'
import ApiKeySettings from '@/components/settings/ApiKeySettings'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const hasOpenAiKey = await hasApiKey('openai')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and API keys
          </p>
        </div>

        <div className="grid gap-6">
          {/* User Info Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              {user.full_name && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-900">{user.full_name}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* API Keys Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">API Keys</h2>
            <p className="text-sm text-gray-600 mb-6">
              Your API keys are encrypted and stored securely. We use your API key to generate personalized roadmaps.
            </p>

            <Suspense fallback={<div>Loading...</div>}>
              <ApiKeySettings initialHasKey={hasOpenAiKey} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
