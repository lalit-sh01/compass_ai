import { auth, currentUser } from '@clerk/nextjs/server'
import { serverApiClient } from '@/lib/api-client-server'

export interface User {
  id: string
  clerk_user_id: string
  email: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export interface CreateUserInput {
  clerk_user_id: string
  email: string
  full_name?: string
}

/**
 * Gets the current user from the database via Python backend
 * Auto-syncs user record if it doesn't exist
 */
export async function getCurrentUser(): Promise<User | null> {
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  try {
    // Try to get existing user from backend
    return await serverApiClient.get<User>('/api/users/me')
  } catch (error) {
    // If user not found (404), try to sync/create
    // We can't easily distinguish 404 from other errors with current client, 
    // but let's assume if it fails we try to sync if we have clerk data
    console.log(`[getCurrentUser] User lookup failed, attempting sync. Error: ${error}`)

    const clerkUser = await currentUser()

    if (!clerkUser) {
      return null
    }

    // Get email from Clerk user
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || `${userId}@clerk.user`
    const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || undefined

    console.log(`[AUTO-CREATE USER] Syncing user record for Clerk ID: ${userId}, Email: ${email}`)

    try {
      // Sync user (create or update)
      const user = await serverApiClient.post<User>('/api/users/sync', {
        email,
        full_name: fullName
      })

      console.log(`[AUTO-CREATE USER] User synced successfully: ${user.id}`)
      return user
    } catch (syncError) {
      console.error(`[getCurrentUser] Failed to sync user: ${syncError}`)
      return null
    }
  }
}

// Deprecated/Unused functions kept for compatibility if needed, 
// but they should ideally be removed or updated to use backend if possible.
// For now, we stub them or throw error as we want to force usage of backend.

export async function createUser(input: CreateUserInput): Promise<User> {
  // This was used by webhooks. For now, we can't easily call backend from webhook 
  // without a token unless we implement API key auth for webhooks.
  // But getCurrentUser handles creation now.
  throw new Error('createUser is deprecated. Use getCurrentUser which auto-syncs.')
}

export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
  // This is hard to implement without admin privileges or assuming current user.
  // If it's current user, use getCurrentUser.
  const { userId } = await auth()
  if (userId === clerkUserId) {
    return getCurrentUser()
  }
  throw new Error('getUserByClerkId for other users is not supported via backend yet')
}

export async function updateUser(
  clerkUserId: string,
  updates: Partial<Omit<User, 'id' | 'clerk_user_id' | 'created_at' | 'updated_at'>>
): Promise<User> {
  // We could implement PATCH /api/users/me
  throw new Error('updateUser not implemented via backend yet')
}

export async function deleteUser(clerkUserId: string): Promise<void> {
  throw new Error('deleteUser not implemented via backend yet')
}
