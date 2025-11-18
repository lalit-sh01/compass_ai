import { createServiceClient } from '@/lib/supabase/server'

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
 * Creates a new user in the database (called from Clerk webhook)
 * Uses service client because webhooks don't have user session
 */
export async function createUser(input: CreateUserInput): Promise<User> {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('users')
    .insert({
      clerk_user_id: input.clerk_user_id,
      email: input.email,
      full_name: input.full_name || null,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create user: ${error.message}`)
  }

  return data
}

/**
 * Gets a user by their Clerk user ID
 */
export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    throw new Error(`Failed to get user: ${error.message}`)
  }

  return data
}

/**
 * Updates a user's information
 */
export async function updateUser(
  clerkUserId: string,
  updates: Partial<Omit<User, 'id' | 'clerk_user_id' | 'created_at' | 'updated_at'>>
): Promise<User> {
  const supabase = createServiceClient()

  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('clerk_user_id', clerkUserId)
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to update user: ${error.message}`)
  }

  return data
}

/**
 * Deletes a user (called from Clerk webhook)
 */
export async function deleteUser(clerkUserId: string): Promise<void> {
  const supabase = createServiceClient()

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('clerk_user_id', clerkUserId)

  if (error) {
    throw new Error(`Failed to delete user: ${error.message}`)
  }
}

/**
 * Gets the current user from the database based on their Clerk session
 * Auto-creates user record if it doesn't exist (for development)
 */
export async function getCurrentUser(): Promise<User | null> {
  const { auth, currentUser } = await import('@clerk/nextjs/server')
  const { userId } = await auth()

  if (!userId) {
    return null
  }

  // Try to get existing user
  let user = await getUserByClerkId(userId)

  // If user doesn't exist, create them automatically
  if (!user) {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return null
    }

    // Get email from Clerk user
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || `${userId}@clerk.user`
    const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null

    console.log(`[AUTO-CREATE USER] Creating user record for Clerk ID: ${userId}, Email: ${email}`)

    // Auto-create user record
    user = await createUser({
      clerk_user_id: userId,
      email: email,
      full_name: fullName
    })

    console.log(`[AUTO-CREATE USER] User created successfully: ${user.id}`)
  }

  return user
}
