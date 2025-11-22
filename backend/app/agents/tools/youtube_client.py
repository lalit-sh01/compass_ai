"""
YouTube Data API v3 Client
Implements YouTube video search with view count fetching for the Enricher (Node D)
"""

import aiohttp
from typing import List, Dict, Optional
from app.agents.tools.quality_resource_fetcher import SearchCandidate


class YouTubeClient:
    """
    Client for YouTube Data API v3.
    Documentation: https://developers.google.com/youtube/v3/docs
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.base_url = "https://www.googleapis.com/youtube/v3"

    async def search(
        self,
        query: str,
        num_results: int = 5,
        order: str = "relevance"
    ) -> List[SearchCandidate]:
        """
        Search for YouTube videos.

        Args:
            query: Search query (cleaned of site:youtube.com prefix)
            num_results: Number of results to return (max 50)
            order: Sort order (relevance, date, rating, viewCount)

        Returns:
            List of SearchCandidate objects with view counts
        """
        if not self.api_key:
            raise ValueError("YouTube API key not configured")

        # Clean query (remove site:youtube.com if present)
        cleaned_query = query.replace("site:youtube.com", "").strip()

        # Search endpoint
        search_url = f"{self.base_url}/search"
        search_params = {
            "part": "snippet",
            "q": cleaned_query,
            "type": "video",
            "maxResults": min(num_results, 50),
            "key": self.api_key,
            "videoDefinition": "any",
            "order": order,
            "safeSearch": "none"
        }

        try:
            async with aiohttp.ClientSession() as session:
                # Execute search
                async with session.get(search_url, params=search_params, timeout=aiohttp.ClientTimeout(total=10)) as response:
                    if response.status == 403:
                        error_data = await response.json()
                        if "quotaExceeded" in str(error_data):
                            raise Exception("YouTube API quota exceeded")
                        raise Exception("YouTube API permission denied")

                    if response.status != 200:
                        raise Exception(f"YouTube API error: HTTP {response.status}")

                    data = await response.json()

                    if "error" in data:
                        raise Exception(f"YouTube API error: {data['error'].get('message', 'Unknown')}")

                    if "items" not in data or not data["items"]:
                        return []

                    # Extract video IDs
                    video_ids = [item["id"]["videoId"] for item in data["items"]]

                    # Fetch statistics (view counts) in batch
                    video_stats = await self._fetch_statistics(video_ids, session)

                    # Build candidates
                    candidates = []
                    for item in data["items"]:
                        video_id = item["id"]["videoId"]
                        snippet = item["snippet"]

                        # Get view count from statistics
                        stats = video_stats.get(video_id, {})
                        view_count = int(stats.get("viewCount", 0)) if stats.get("viewCount") else None

                        candidate = SearchCandidate(
                            url=f"https://www.youtube.com/watch?v={video_id}",
                            title=snippet.get("title", ""),
                            author=snippet.get("channelTitle", ""),
                            description=snippet.get("description", ""),
                            view_count=view_count,
                            publication_date=snippet.get("publishedAt", ""),
                            platform="youtube"
                        )
                        candidates.append(candidate)

                    return candidates

        except aiohttp.ClientError as e:
            raise Exception(f"YouTube API network error: {str(e)}")
        except Exception as e:
            raise Exception(f"YouTube search failed: {str(e)}")

    async def _fetch_statistics(
        self,
        video_ids: List[str],
        session: aiohttp.ClientSession
    ) -> Dict[str, Dict]:
        """
        Fetch video statistics (view counts, like counts, etc.) in batch.

        Args:
            video_ids: List of video IDs
            session: Existing aiohttp session

        Returns:
            Dict mapping video_id -> statistics dict
        """
        if not video_ids:
            return {}

        videos_url = f"{self.base_url}/videos"
        params = {
            "part": "statistics",
            "id": ",".join(video_ids),
            "key": self.api_key
        }

        try:
            async with session.get(videos_url, params=params, timeout=aiohttp.ClientTimeout(total=10)) as response:
                if response.status != 200:
                    print(f"  ⚠ Failed to fetch YouTube statistics: HTTP {response.status}")
                    return {}

                data = await response.json()

                if "items" not in data:
                    return {}

                stats_map = {}
                for item in data["items"]:
                    video_id = item["id"]
                    statistics = item.get("statistics", {})
                    stats_map[video_id] = statistics

                return stats_map

        except Exception as e:
            print(f"  ⚠ YouTube statistics fetch error: {str(e)}")
            return {}


# ============================================================================
# FALLBACK LOGIC (PRD Section 7.1)
# ============================================================================

async def search_youtube_with_fallback(
    client: YouTubeClient,
    query: str,
    num_results: int = 5
) -> List[SearchCandidate]:
    """
    YouTube search with exponential backoff retry and fallback logic.

    Per PRD Section 7.1:
    - Retry with exponential backoff on rate limits
    - Strip specific channel filters and retry on empty results
    - Return empty list if all retries fail
    """
    import asyncio

    max_retries = 3
    retry_delay = 1

    for attempt in range(max_retries):
        try:
            results = await client.search(query, num_results)

            # If we got results, return them
            if results:
                return results

            # Empty results - try fallback query (strip channel filters)
            if attempt == 0:
                # Remove specific channel names and retry
                # Example: "site:youtube.com PingSkills forehand" -> "forehand topspin tutorial"
                fallback_query = query
                # Strip site: prefix
                fallback_query = fallback_query.replace("site:youtube.com", "")
                # Add generic tutorial keyword if not present
                if "tutorial" not in fallback_query.lower():
                    fallback_query += " tutorial"

                print(f"  ⚠ Empty YouTube results for '{query}', retrying with '{fallback_query}'")
                results = await client.search(fallback_query.strip(), num_results)

                if results:
                    return results

            # No results even with fallback
            return []

        except Exception as e:
            error_msg = str(e)

            # Quota exceeded - fail immediately (can't retry)
            if "quota exceeded" in error_msg.lower():
                print(f"  ✗ YouTube API quota exceeded")
                return []

            # Rate limit - retry with exponential backoff
            if "rate limit" in error_msg.lower():
                if attempt < max_retries - 1:
                    print(f"  ⚠ YouTube rate limit, retrying in {retry_delay}s...")
                    await asyncio.sleep(retry_delay)
                    retry_delay *= 2
                    continue
                else:
                    print(f"  ✗ YouTube rate limit exceeded after {max_retries} retries")
                    return []

            # Other errors - fail immediately
            print(f"  ✗ YouTube search failed: {error_msg}")
            return []

    return []
