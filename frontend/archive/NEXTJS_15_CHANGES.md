# Next.js 15+ Changes

## Async Params in Dynamic Routes

### Issue
Next.js 15 and later requires dynamic route params to be unwrapped using `React.use()` because they are now Promises.

### Error Message
```
A param property was accessed directly with `params.id`.
`params` is a Promise and must be unwrapped with `React.use()`
before accessing its properties.
```

### Old Code (Next.js 14)
```tsx
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id; // ❌ This doesn't work in Next.js 15+
}
```

### New Code (Next.js 15+)
```tsx
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // ✅ Unwrap the Promise
  const id = resolvedParams.id;
}
```

## Files Updated

1. ✅ `app/viewer/phase/[id]/page.tsx`
   - Changed `params: { id: string }` → `params: Promise<{ id: string }>`
   - Added `const resolvedParams = use(params)`
   - Access via `resolvedParams.id`

2. ✅ `app/viewer/week/[number]/page.tsx`
   - Changed `params: { number: string }` → `params: Promise<{ number: string }>`
   - Added `const resolvedParams = use(params)`
   - Access via `resolvedParams.number`

## Why This Change?

Next.js made this change to:
1. Support async data fetching in Server Components
2. Enable better streaming and Suspense integration
3. Prepare for future async APIs

## Status

✅ **Fixed**: All dynamic routes now work correctly with Next.js 16.0.3

## Testing

```bash
# All these routes work:
http://localhost:3000/viewer/phase/1
http://localhost:3000/viewer/phase/2
http://localhost:3000/viewer/phase/3
http://localhost:3000/viewer/week/1
http://localhost:3000/viewer/week/14
```

All pages compile and load successfully! ✅
