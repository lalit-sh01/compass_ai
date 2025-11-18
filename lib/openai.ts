import OpenAI from 'openai'
import { getApiKey } from './db/api-keys'

/**
 * Creates an OpenAI client instance using the user's encrypted API key
 * @returns OpenAI client instance
 * @throws Error if user doesn't have an API key set
 */
export async function createOpenAIClient(): Promise<OpenAI> {
  const apiKey = await getApiKey('openai')

  if (!apiKey) {
    throw new Error(
      'OpenAI API key not found. Please add your API key in Settings.'
    )
  }

  return new OpenAI({
    apiKey,
  })
}

/**
 * Creates an OpenAI client with a provided API key (for testing or one-off operations)
 */
export function createOpenAIClientWithKey(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
  })
}

/**
 * Generic function to call OpenAI with structured output
 */
export async function callOpenAI<T>({
  client,
  systemPrompt,
  userPrompt,
  model = 'gpt-4-turbo-preview',
  temperature = 0.7,
  maxTokens = 4000,
}: {
  client: OpenAI
  systemPrompt: string
  userPrompt: string
  model?: string
  temperature?: number
  maxTokens?: number
}): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return response
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API Error: ${error.message}`)
    }
    throw error
  }
}

/**
 * Function to call OpenAI with JSON output
 */
export async function callOpenAIJSON<T>({
  client,
  systemPrompt,
  userPrompt,
  model = 'gpt-4-turbo-preview',
  temperature = 0.7,
  maxTokens = 4000,
}: {
  client: OpenAI
  systemPrompt: string
  userPrompt: string
  model?: string
  temperature?: number
  maxTokens?: number
}): Promise<T> {
  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(response) as T
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      throw new Error(`OpenAI API Error: ${error.message}`)
    }
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response from OpenAI')
    }
    throw error
  }
}

/**
 * Estimates token count (rough approximation)
 */
export function estimateTokens(text: string): number {
  // Rough approximation: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4)
}

/**
 * Validates OpenAI API key by making a test call
 */
export async function validateOpenAIKey(apiKey: string): Promise<boolean> {
  try {
    const client = createOpenAIClientWithKey(apiKey)
    await client.models.list()
    return true
  } catch (error) {
    return false
  }
}
