import { createServiceClient } from '@/lib/supabase/server'
import { encryptApiKey, decryptApiKey } from '@/lib/encryption/api-key-encryption'
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

  const supabase = createServiceClient()

  // Encrypt the API key before storing
  const encryptedKey = encryptApiKey(apiKey)

  // Deactivate existing keys for this provider
  await supabase
    .from('user_api_keys')
    .update({ is_active: false })
    .eq('user_id', user.id)
    .eq('provider', provider)

  // Insert new key
  const { data, error } = await supabase
    .from('user_api_keys')
    .insert({
      user_id: user.id,
      provider,
      encrypted_key: encryptedKey,
      is_active: true,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to save API key: ${error.message}`)
  }

  return data
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

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('user_api_keys')
    .select('encrypted_key')
    .eq('user_id', user.id)
    .eq('provider', provider)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned - user hasn't set up API key yet
      return null
    }
    throw new Error(`Failed to get API key: ${error.message}`)
  }

  if (!data) {
    return null
  }

  // Decrypt and return
  try {
    return decryptApiKey(data.encrypted_key)
  } catch (error) {
    throw new Error('Failed to decrypt API key')
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

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('user_api_keys')
    .select('id')
    .eq('user_id', user.id)
    .eq('provider', provider)
    .eq('is_active', true)
    .single()

  if (error && error.code !== 'PGRST116') {
    throw new Error(`Failed to check API key: ${error.message}`)
  }

  return !!data
}

/**
 * Deletes (deactivates) an API key
 */
export async function deleteApiKey(provider: ApiProvider = 'openai'): Promise<void> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const supabase = createServiceClient()

  const { error } = await supabase
    .from('user_api_keys')
    .update({ is_active: false })
    .eq('user_id', user.id)
    .eq('provider', provider)

  if (error) {
    throw new Error(`Failed to delete API key: ${error.message}`)
  }
}

/**
 * Gets all API keys for the current user (without decryption)
 */
export async function getAllApiKeys(): Promise<Omit<ApiKey, 'encrypted_key'>[]> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('user_api_keys')
    .select('id, user_id, provider, is_active, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get API keys: ${error.message}`)
  }

  return data || []
}
