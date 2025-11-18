# Bug Tracking - Roadmap Viewer

## ✅ ALL 5 BUGS FIXED - November 16, 2025

All bugs have been resolved and authentication is fully functional. Tested and verified working in incognito mode.

**Critical Fix:** Clerk's `auth.protect()` was causing rewrites to non-existent routes in development mode. Replaced with manual `userId` check and redirect.

---

## Bug #1: Cannot Add OpenAI API Key ✅ FIXED

**Status:** ✅ FIXED
**Date Fixed:** November 16, 2025

**Original Error:**
```
Clerk: auth() was called but Clerk can't detect usage of clerkMiddleware()
```

**Root Cause:**
- `lib/db/api-keys.ts` calls `getCurrentUser()`
- `getCurrentUser()` calls Clerk's `auth()`
- Clerk's `auth()` requires `clerkMiddleware()` in middleware.ts
- Middleware was disabled to avoid previous redirect loops

**Fix Applied:**
1. ✅ Enabled `clerkMiddleware()` in `middleware.ts` with proper route protection
2. ✅ Wrapped app with `<ClerkProvider>` in `app/layout.tsx`
3. ✅ Switched all database utilities to use service role client (bypasses RLS)
4. ✅ Created sign-in and sign-up pages

**Files Changed:**
- `middleware.ts` - Added clerkMiddleware with public route matcher
- `app/layout.tsx` - Uncommented ClerkProvider
- `lib/db/api-keys.ts` - Switch from createClient() to createServiceClient()
- `lib/db/users.ts` - Switch to service role client
- `lib/db/roadmaps.ts` - Switch to service role client

---

## Bug #2: Import Roadmap Fails ✅ FIXED

**Status:** ✅ FIXED
**Date Fixed:** November 16, 2025

**Original Error:**
```
Import Failed
Failed to import roadmap. Please try again.
```

**Root Cause:**
1. Missing import statement: `createRoadmap` not imported
2. Function signature mismatch: calling with wrong parameters

**Fix Applied:**
1. ✅ Added `import { createRoadmap } from '@/lib/db/roadmaps'` at line 3
2. ✅ Fixed function call to match expected signature:
   ```typescript
   const savedRoadmap = await createRoadmap({
     roadmap: roadmap,
     assessment: {},
     gapAnalysis: {},
     selectedSkills: []
   })
   ```

**Files Changed:**
- `app/api/roadmaps/import/route.ts`

---

## Bug #3: Server-Side Exception ✅ FIXED

**Status:** ✅ FIXED
**Date Fixed:** November 16, 2025

**Original Error:**
```
Application error: a server-side exception has occurred
Digest: 2997744162
```

**Root Cause:**
Same as Bug #1 - Clerk auth() called without proper middleware setup

**Fix Applied:**
Same fixes as Bug #1 - Proper Clerk integration

---

## Bug #4: Redirect Loop ✅ FIXED

**Status:** ✅ FIXED
**Date Fixed:** November 16, 2025

**Original Issue:**
Previous attempt to configure Clerk caused endless redirect loops, so authentication was disabled.

**Root Cause:**
- Middleware was protecting ALL routes including sign-in/sign-up
- Caused redirect loop: unauthenticated → sign-in → middleware → sign-in → ...

**Fix Applied:**
1. ✅ Implemented proper route protection with `createRouteMatcher`
2. ✅ Defined public routes (landing, viewer, sign-in, sign-up, webhooks)
3. ✅ Only protect dashboard, settings, and onboarding routes
4. ✅ Created proper sign-in/sign-up pages using Clerk components

**Files Changed:**
- `middleware.ts` - Smart route protection
- `app/(auth)/sign-in/[[...sign-in]]/page.tsx` - Created
- `app/(auth)/sign-up/[[...sign-up]]/page.tsx` - Created
- `app/(auth)/layout.tsx` - Created

---

---

## Bug #5: Authentication Not Working - Clerk auth.protect() Broken ✅ FIXED

**Status:** ✅ FIXED
**Date Fixed:** November 16, 2025

**User Report:**
"There is no auth in the picture. I can just directly access the dashboard, and other views"

**Root Cause:**
- Clerk's `auth.protect()` method was causing rewrites to non-existent internal routes (e.g., `/clerk_1763277213398`) instead of redirecting to sign-in
- This caused 404 errors in development mode
- The issue was related to Clerk's "dev-browser-missing" and "protect-rewrite" mechanism
- Browser requests were getting rewritten to non-existent paths, showing 404 or allowing access incorrectly

**Fix Applied:**
1. ✅ Replaced `await auth.protect()` with manual authentication check
2. ✅ Check `userId` from `await auth()`
3. ✅ If no `userId`, manually redirect to `/sign-in` using `NextResponse.redirect()`
4. ✅ Preserve redirect URL so user returns after login

**Code Change:**
```typescript
// BEFORE (broken):
if (!isPublicRoute(request)) {
  await auth.protect()  // This was broken
}

// AFTER (working):
if (!isPublicRoute(request)) {
  const { userId } = await auth()
  if (!userId) {
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }
}
```

**Files Changed:**
- `middleware.ts` - Replaced auth.protect() with manual redirect

**Verification (tested in incognito mode):**
```
[MIDDLEWARE] Path: /dashboard, UserId: null
[MIDDLEWARE] Redirecting to sign-in  ✅
[User signs in]
[MIDDLEWARE] Path: /dashboard, UserId: user_351tkuolajuk0URKyav2fl7JnwM
[MIDDLEWARE] Allowing access - user authenticated  ✅
```

Protected routes now correctly:
- Redirect unauthenticated users to `/sign-in`
- Allow access after authentication
- Preserve redirect URL for post-login navigation

Public routes remain accessible:
- `/` → 200 OK
- `/viewer` → 200 OK

---

## 🎯 Next Steps for User

See **SETUP_COMPLETE.md** for:
1. How to configure Clerk webhook
2. How to verify database migrations
3. How to test the fixes

---

## 📝 Technical Notes

### Architecture Decision: Service Role Client

We switched from regular Supabase client to service role client because:

- **Problem:** Supabase RLS policies expect Supabase Auth, not Clerk
- **Solution:** Use service role (bypasses RLS), enforce auth in application layer
- **Security:** Service role only used server-side, never exposed to client
- **Pattern:** Standard approach for Clerk + Supabase integration

### Files Modified Summary

**Core Fixes:**
- `app/api/roadmaps/import/route.ts` - Import bug
- `middleware.ts` → `proxy.ts` - Clerk middleware (renamed for Next.js 16)
- `app/layout.tsx` - ClerkProvider
- `app/(dashboard)/dashboard/page.tsx` - Added missing RoadmapGrid import
- `lib/db/*.ts` (3 files) - Service role client
- `.env.local` - Added CLERK_WEBHOOK_SECRET

**New Files:**
- `app/(auth)/sign-in/[[...sign-in]]/page.tsx`
- `app/(auth)/sign-up/[[...sign-up]]/page.tsx`
- `app/(auth)/layout.tsx`
- `SETUP_COMPLETE.md`
- `CLAUDE.md`

**Total Files Changed:** 13
**Lines of Code:** ~250 added/modified

---

**All bugs resolved. App ready for testing after setup steps completed.**