import CryptoJS from 'crypto-js'

const getEncryptionSecret = (): string => {
  const secret = process.env.ENCRYPTION_SECRET
  if (!secret) {
    throw new Error('ENCRYPTION_SECRET environment variable is not set')
  }
  return secret
}

/**
 * Encrypts an API key using AES encryption
 * @param apiKey - The plain text API key to encrypt
 * @returns The encrypted API key as a string
 */
export function encryptApiKey(apiKey: string): string {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('API key cannot be empty')
  }

  try {
    const encrypted = CryptoJS.AES.encrypt(apiKey, getEncryptionSecret()).toString()
    return encrypted
  } catch (error) {
    throw new Error('Failed to encrypt API key: ' + (error as Error).message)
  }
}

/**
 * Decrypts an encrypted API key
 * @param encryptedKey - The encrypted API key string
 * @returns The decrypted plain text API key
 */
export function decryptApiKey(encryptedKey: string): string {
  if (!encryptedKey || encryptedKey.trim() === '') {
    throw new Error('Encrypted key cannot be empty')
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedKey, getEncryptionSecret())
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8)

    if (!plaintext) {
      throw new Error('Decryption failed - invalid key or secret')
    }

    return plaintext
  } catch (error) {
    throw new Error('Failed to decrypt API key: ' + (error as Error).message)
  }
}

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
