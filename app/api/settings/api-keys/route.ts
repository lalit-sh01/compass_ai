import { NextRequest, NextResponse } from 'next/server'
import { saveApiKey, deleteApiKey, getApiKey } from '@/lib/db/api-keys'
import { validateApiKeyFormat } from '@/lib/encryption/api-key-encryption'
import type { ApiProvider } from '@/lib/db/api-keys'

/**
 * POST /api/settings/api-keys
 * Saves a new API key for the authenticated user
 */
export async function POST(req: NextRequest) {
  try {
    const { apiKey, provider = 'openai' } = await req.json()

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    // Validate format
    if (!validateApiKeyFormat(apiKey, provider as 'openai')) {
      return NextResponse.json(
        { error: 'Invalid API key format' },
        { status: 400 }
      )
    }

    // Save the key
    await saveApiKey(apiKey, provider as ApiProvider)

    return NextResponse.json(
      { success: true, message: 'API key saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving API key:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to save API key' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/settings/api-keys?provider=openai
 * Deletes an API key for the authenticated user
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = (searchParams.get('provider') || 'openai') as ApiProvider

    await deleteApiKey(provider)

    return NextResponse.json(
      { success: true, message: 'API key deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error deleting API key:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to delete API key' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/settings/api-keys/check?provider=openai
 * Checks if user has an API key (without returning it)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = (searchParams.get('provider') || 'openai') as ApiProvider

    const apiKey = await getApiKey(provider)

    return NextResponse.json(
      { hasKey: !!apiKey },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error checking API key:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to check API key' },
      { status: 500 }
    )
  }
}
