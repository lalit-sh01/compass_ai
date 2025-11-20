/**
 * Validates an API key format (basic validation)
 * @param apiKey - The API key to validate
 * @param provider - The provider (e.g., 'openai')
 * @returns True if valid, false otherwise
 */

/**
 * Validates an API key format (basic validation)
 * @param apiKey - The API key to validate
 * @param provider - The provider (e.g., 'openai')
 * @returns True if valid, false otherwise
 */
export function validateApiKeyFormat(apiKey: string, provider: 'openai' = 'openai'): boolean {
  if (!apiKey || apiKey.trim() === '') {
    return false
  }

  // Provider-specific validation
  switch (provider) {
    case 'openai':
      // OpenAI keys start with 'sk-' and are typically 48+ characters
      return apiKey.startsWith('sk-') && apiKey.length >= 20
    default:
      return apiKey.length >= 10
  }
}

/**
 * Masks an API key for display purposes
 * @param apiKey - The API key to mask
 * @returns Masked version (e.g., "sk-...xyz123")
 */
export function maskApiKey(apiKey: string): string {
  if (!apiKey || apiKey.length < 10) {
    return '***'
  }

  const prefix = apiKey.substring(0, 3)
  const suffix = apiKey.substring(apiKey.length - 6)
  return `${prefix}...${suffix}`
}
