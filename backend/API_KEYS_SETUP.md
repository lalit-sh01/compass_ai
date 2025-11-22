# External API Keys Setup Guide

This document explains how to configure the external API keys required for the Enricher (Node D) to fetch real resources.

## Overview

The system uses two external APIs to fetch and validate learning resources:
- **SerpAPI**: For general web search (documentation, articles, courses)
- **YouTube Data API v3**: For YouTube video search with view counts

Both APIs are **optional**. If not configured, the system will fall back to mock data.

---

## 1. SerpAPI Setup (Web Search)

**Purpose**: Fetch search results from Google for documentation sites, articles, and courses.

### Get API Key

1. Visit [https://serpapi.com/](https://serpapi.com/)
2. Sign up for a free account (100 searches/month free)
3. Copy your API key from the dashboard

### Add to `.env`

```bash
SERPAPI_API_KEY=your_serpapi_key_here
```

### Test the Integration

```bash
# From backend directory
cd backend

# Run a test search
uv run python -c "
import asyncio
from app.agents.tools.serpapi_client import SerpAPIClient

async def test():
    client = SerpAPIClient(api_key='YOUR_KEY')
    results = await client.search('site:developer.mozilla.org CSS flexbox', num_results=3)
    print(f'Found {len(results)} results')
    for r in results:
        print(f'  - {r.title}')

asyncio.run(test())
"
```

### Rate Limits

- Free tier: 100 searches/month
- Paid tier: Starting at $50/month for 5,000 searches
- System implements exponential backoff retry on rate limits

---

## 2. YouTube Data API v3 Setup

**Purpose**: Fetch YouTube videos with accurate view counts and metadata.

### Get API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the API key
   - (Optional) Restrict the key to YouTube Data API v3 only

### Add to `.env`

```bash
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Test the Integration

```bash
# From backend directory
cd backend

# Run a test search
uv run python -c "
import asyncio
from app.agents.tools.youtube_client import YouTubeClient

async def test():
    client = YouTubeClient(api_key='YOUR_KEY')
    results = await client.search('Python tutorial for beginners', num_results=3)
    print(f'Found {len(results)} results')
    for r in results:
        print(f'  - {r.title} by {r.author} ({r.view_count:,} views)')

asyncio.run(test())
"
```

### Quota Limits

- Free tier: 10,000 units/day (1 search = 100 units = 100 searches/day)
- Each additional 10,000 units costs ~$0 (first 10k is free daily)
- System handles quota exceeded errors gracefully

---

## 3. Complete `.env` Example

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/roadmap_db

# Clerk Auth
CLERK_ISSUER_URL=https://your-instance.clerk.accounts.dev
CLERK_AUDIENCE=

# Encryption
ENCRYPTION_KEY=your-base64-encryption-key

# OpenAI (for LLM agents)
OPENAI_API_KEY=sk-...

# External APIs for Resource Fetching (OPTIONAL)
SERPAPI_API_KEY=your_serpapi_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

---

## 4. Fallback Behavior

### No API Keys Configured

If neither `SERPAPI_API_KEY` nor `YOUTUBE_API_KEY` is set, the system will:
1. Print a warning: `⚠ API key not configured, using mock data`
2. Use mock search results with realistic metadata
3. Continue functioning normally

### Partial Configuration

You can configure only one API:
- **Only SerpAPI**: YouTube searches will use mock data
- **Only YouTube API**: Web searches will use mock data

### Error Handling

Per PRD Section 7.1, the system implements robust error handling:

1. **Rate Limits**: Exponential backoff retry (1s, 2s, 4s)
2. **Empty Results**: Strips authority filters and retries with broader query
3. **Network Errors**: Falls back to mock data
4. **Quota Exceeded**: Logs error and falls back to mock data

---

## 5. Cost Estimation

### For a 14-Week Roadmap

Assuming:
- 14 weeks × 10 tasks/week = 140 tasks
- Each task requires 1 resource search

**SerpAPI**:
- 140 searches × $0 (free tier covers this)
- Only costs if you generate >100 roadmaps/month

**YouTube Data API**:
- 140 searches × 100 units = 14,000 units
- First 10,000 units/day are free
- Cost: $0 (well within free tier)

**Total**: $0 for typical usage

### For Production at Scale

If generating 1,000 roadmaps/month:
- SerpAPI: 140,000 searches = ~$1,400/month (paid plan)
- YouTube: Still free (10k units/day = 300k units/month)

---

## 6. Security Best Practices

1. **Never commit API keys to git**
   - Already in `.gitignore`
   - Use environment variables only

2. **Restrict API keys**
   - SerpAPI: Use IP restrictions in dashboard
   - YouTube: Restrict to YouTube Data API v3 only

3. **Rotate keys regularly**
   - Recommended: Every 90 days
   - Immediately if leaked

4. **Monitor usage**
   - SerpAPI: Dashboard > Usage
   - YouTube: Google Cloud Console > APIs > Quotas

---

## 7. Troubleshooting

### "SerpAPI error: HTTP 403"
- API key is invalid or expired
- Check dashboard for account status

### "YouTube API quota exceeded"
- You've hit the 10,000 units/day limit
- Wait until quota resets (daily at midnight PST)
- Or request quota increase in Google Cloud Console

### "Empty search results"
- Query may be too specific
- System automatically retries with broader query
- Check logs for fallback query used

### Mock data still being used
- Check `.env` file is in `backend/` directory
- Verify API key has no extra whitespace
- Restart uvicorn server after adding keys

---

## 8. Install Dependencies

After adding API keys, install the required `aiohttp` package:

```bash
cd backend
uv sync  # This will install aiohttp>=3.9.0
```

---

## References

- [SerpAPI Documentation](https://serpapi.com/search-api)
- [YouTube Data API v3 Documentation](https://developers.google.com/youtube/v3/docs)
- [PRD Section 5: Quality Resource Fetcher](../PRD.pdf)
