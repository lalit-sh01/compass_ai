'use client'

import { useState } from 'react'
import { validateApiKeyFormat, maskApiKey } from '@/lib/encryption/api-key-encryption'
import { useApiClient } from '@/lib/api-client'

interface ApiKeySettingsProps {
  initialHasKey: boolean
}

export default function ApiKeySettings({ initialHasKey }: ApiKeySettingsProps) {
  const apiClient = useApiClient()
  const [apiKey, setApiKey] = useState('')
  const [hasKey, setHasKey] = useState(initialHasKey)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showKey, setShowKey] = useState(false)

  const handleSaveKey = async () => {
    setError(null)
    setSuccess(null)

    // Validate format
    if (!validateApiKeyFormat(apiKey, 'openai')) {
      setError('Invalid OpenAI API key format. Keys should start with "sk-" and be at least 20 characters.')
      return
    }

    setIsLoading(true)

    try {
      await apiClient.post('/api/users/api-keys', {
        apiKey,
        provider: 'openai'
      })

      setSuccess('API key saved successfully!')
      setHasKey(true)
      setApiKey('')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteKey = async () => {
    if (!confirm('Are you sure you want to delete your API key? You will not be able to generate new roadmaps without it.')) {
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await apiClient.delete('/api/users/api-keys?provider=openai')

      setSuccess('API key deleted successfully')
      setHasKey(false)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* OpenAI API Key */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">OpenAI API Key</h3>
            {hasKey && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Get your API key from{' '}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            OpenAI Platform
          </a>
        </p>

        {hasKey ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-700 font-mono">
                sk-...••••••
              </div>
              <button
                onClick={handleDeleteKey}
                disabled={isLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Your API key is encrypted and stored securely. Delete it if you want to add a new one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                Enter your OpenAI API key
              </label>
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showKey"
                  checked={showKey}
                  onChange={(e) => setShowKey(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="showKey" className="text-sm text-gray-600">
                  Show API key
                </label>
              </div>
            </div>

            <button
              onClick={handleSaveKey}
              disabled={!apiKey || isLoading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isLoading ? 'Saving...' : 'Save API Key'}
            </button>
          </div>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">🔒 Security Notice</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Your API keys are encrypted using AES-256 encryption</li>
          <li>Keys are only decrypted when generating roadmaps</li>
          <li>We never share or expose your API keys</li>
          <li>You can delete your API key at any time</li>
        </ul>
      </div>
    </div>
  )
}
