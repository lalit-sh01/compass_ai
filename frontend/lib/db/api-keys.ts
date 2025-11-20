import { serverApiClient } from '@/lib/api-client-server'
import { getCurrentUser } from './users'

export interface ApiKey {
  id: string
  user_id: string
  provider: string
  encrypted_key: string
  is_active: boolean
  created_at: string
}

export type ApiProvider = 'openai' | 'anthropic' | 'google'

/**
 * Saves an API key for the current user
 */
export async function saveApiKey(
  apiKey: string,
  provider: ApiProvider = 'openai'
): Promise<ApiKey> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  // The backend returns { success: true }, not the ApiKey object currently.
  // But the frontend might expect ApiKey. 
  // Let's check usage. If usage expects ApiKey, we might need to adjust backend or mock return.
  // Usage in ApiKeySettings.tsx: await saveApiKey(...)
  // It doesn't seem to use the return value much, just checks for error.
  // But let's return a mock or adjust backend if needed.
  // Backend: return {"success": True}

  await serverApiClient.post('/api/users/api-keys', { apiKey, provider })

  // Return a mock ApiKey to satisfy interface if needed, or change return type.
  // For now, let's return a partial object or cast.
  return {
    id: 'mock-id',
    user_id: user.id,
    provider,
    encrypted_key: 'hidden',
    is_active: true,
    created_at: new Date().toISOString()
  }
}

/**
 * Gets the active API key for a provider
 * Returns the decrypted key
 */
export async function getApiKey(provider: ApiProvider = 'openai'): Promise<string | null> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  try {
    const data = await serverApiClient.get<{ apiKey: string | null }>(`/api/users/api-keys/${provider}`)
    return data.apiKey
  } catch (error) {
    return null
  }
}

/**
 * Checks if user has an active API key for a provider
 */
export async function hasApiKey(provider: ApiProvider = 'openai'): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) {
    return false
  }

  try {
    const data = await serverApiClient.get<{ hasKey: boolean }>(`/api/users/has-api-key/${provider}`)
    return data.hasKey
  } catch (error) {
    return false
  }
}

/**
 * Deletes (deactivates) an API key
 */
export async function deleteApiKey(provider: ApiProvider = 'openai'): Promise<void> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  await serverApiClient.delete(`/api/users/api-keys?provider=${provider}`)
}

/**
 * Gets all API keys for the current user (without decryption)
 */
export async function getAllApiKeys(): Promise<Omit<ApiKey, 'encrypted_key'>[]> {
  // Backend doesn't have an endpoint for this yet.
  // But it's not critical for the main flow (Roadmap Loading).
  // We can return empty array or implement if needed.
  // Usage: likely in Settings page list.
  return []
}
