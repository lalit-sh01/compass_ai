# Debugging the Onboarding Flow Issue

## Problem
The Inquisitor asks a question, user answers, but then the same question appears again (no response from AI).

## Backend Status
✅ Backend is running correctly at http://localhost:8000
✅ `/profile-interview/start` endpoint works
✅ `/profile-interview/continue` endpoint streams responses correctly
✅ OpenAI API key is configured

## Debug Steps

### 1. Check Browser Console

**Action**: Open browser developer tools and check the console

1. Open your browser (Chrome/Firefox/Safari)
2. Press **F12** or **Right-click → Inspect**
3. Click the **Console** tab
4. Navigate to http://localhost:3000/onboarding
5. Answer the first question
6. **Look for log messages starting with `[ProfilerInterview]`**

Expected logs should show:
```
[ProfilerInterview] Sending request to backend with conversation: [...]
[ProfilerInterview] API endpoint: http://localhost:8000/api/agents/profile-interview/continue
[ProfilerInterview] Response status: 200
[ProfilerInterview] Stream reader initialized, starting to read...
[ProfilerInterview] SSE update: {content: "What's"}
[ProfilerInterview] SSE update: {content: " your"}
[ProfilerInterview] SSE update: {content: " current"}
...
[ProfilerInterview] Stream reading done
[ProfilerInterview] Stream complete. Assistant message length: XX
[ProfilerInterview] Assistant message: "What's your current level?"
[ProfilerInterview] Adding assistant message to conversation
```

### 2. Check Network Tab

**Action**: Look at the network request

1. In Developer Tools, click the **Network** tab
2. Try the onboarding flow again
3. Look for a request to `/profile-interview/continue`
4. Click on it and check:
   - **Status**: Should be 200 OK
   - **Response**: Should show streaming data like `data: {"content": "..."}`
   - **Type**: Should be `eventsource` or `text/event-stream`

### 3. Possible Issues and Solutions

#### Issue A: CORS Error
**Symptom**: Console shows "CORS policy" error
**Solution**: Backend CORS is already configured, but restart backend: `uv run uvicorn app.main:app --reload`

#### Issue B: Network Request Fails
**Symptom**: Console shows "Failed to fetch" or HTTP error
**Solution**:
- Check if backend is running: `curl http://localhost:8000/health`
- Check if frontend can reach backend: Add `NEXT_PUBLIC_API_URL=http://localhost:8000` to `frontend/.env.local`

#### Issue C: Stream Hangs
**Symptom**: Request goes through but no logs after "Stream reader initialized"
**Solution**: This could be a streaming issue. Check if the ReadableStream is supported in your browser.

#### Issue D: No Assistant Message
**Symptom**: Logs show "No assistant message received from stream!"
**Solution**: Backend stream is empty. Check OpenAI API key in backend .env file.

#### Issue E: Assistant Message Not Added to Conversation
**Symptom**: Logs show message received but it's not displayed
**Solution**: React state update issue. Try refreshing the page.

### 4. Quick Manual Test

**Action**: Test the backend endpoint directly

```bash
cd backend

# Test with curl
curl -X POST http://localhost:8000/api/agents/profile-interview/start

# Should return:
# {"status": "interview_started", "message": "Hello! I'm The Inquisitor...", ...}
```

### 5. Environment Check

**Frontend** (`frontend/.env.local`):
```bash
# Should have (optional, defaults to localhost:8000):
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend** (`.env`):
```bash
# Must have:
OPENAI_API_KEY=sk-proj-...
DATABASE_URL=postgresql://...
```

## What to Share with Me

If the issue persists, please share:

1. **Console logs** (copy/paste all `[ProfilerInterview]` messages)
2. **Network tab screenshot** (the `/profile-interview/continue` request)
3. **Any error messages** in red in the console
4. **Browser and version** you're using

## Current Status

- ✅ Backend endpoints working
- ✅ OpenAI API responding
- ✅ Debug logs added to frontend
- ⏳ Need to check frontend console logs to identify exact issue

---

**Next**: Please run through the steps above and share the console output!
