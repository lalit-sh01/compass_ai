"""
SerpAPI Client - Google Search Integration
Implements real web search using SerpAPI for the Enricher (Node D)
"""

import aiohttp
from typing import List, Optional
from app.agents.tools.quality_resource_fetcher import SearchCandidate


class SerpAPIClient:
    """
    Client for SerpAPI (Google Search API).
    Documentation: https://serpapi.com/search-api
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    async def search(
        self,
        query: str,
        num_results: int = 5,
        country: str = "us",
        language: str = "en"
    ) -> List[SearchCandidate]:
        """
        Execute a Google search via SerpAPI.

        Args:
            query: Search query string
            num_results: Number of results to return (max 10)
            country: Country code (default: "us")
            language: Language code (default: "en")

        Returns:
            List of SearchCandidate objects
        """
        if not self.api_key:
            raise ValueError("SerpAPI key not configured")

        params = {
            "q": query,
            "engine": "google",
            "api_key": self.api_key,
            "num": min(num_results, 10),  # SerpAPI limit
            "gl": country,
            "hl": language
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.base_url, params=params, timeout=aiohttp.ClientTimeout(total=10)) as response:
                    if response.status == 429:
                        raise Exception("SerpAPI rate limit exceeded")

                    if response.status != 200:
                        raise Exception(f"SerpAPI error: HTTP {response.status}")

                    data = await response.json()

                    if "error" in data:
                        raise Exception(f"SerpAPI error: {data['error']}")

                    if "organic_results" not in data:
                        return []

                    candidates = []
                    for result in data["organic_results"][:num_results]:
                        # Extract domain from link
                        link = result.get("link", "")
                        domain = link.split("//")[1].split("/")[0] if "//" in link else ""

                        candidate = SearchCandidate(
                            url=link,
                            title=result.get("title", ""),
                            author=domain,  # Use domain as author for web results
                            description=result.get("snippet", ""),
                            platform="web"
                        )
                        candidates.append(candidate)

                    return candidates

        except aiohttp.ClientError as e:
            raise Exception(f"SerpAPI network error: {str(e)}")
        except Exception as e:
            raise Exception(f"SerpAPI search failed: {str(e)}")


# ============================================================================
# FALLBACK LOGIC (PRD Section 7.1)
# ============================================================================

async def search_with_fallback(
    client: SerpAPIClient,
    query: str,
    num_results: int = 5
) -> List[SearchCandidate]:
    """
    Search with exponential backoff retry and fallback logic.

    Per PRD Section 7.1:
    - Retry with exponential backoff on rate limits
    - Strip authority terms and retry on empty results
    - Return empty list if all retries fail
    """
    import asyncio

    max_retries = 3
    retry_delay = 1  # Start with 1 second

    for attempt in range(max_retries):
        try:
            results = await client.search(query, num_results)

            # If we got results, return them
            if results:
                return results

            # Empty results - try fallback query (strip authority terms)
            if attempt == 0:
                # Remove site: filters and retry with broader search
                fallback_query = query
                if "site:" in query:
                    # Extract just the search terms
                    parts = query.split()
                    fallback_query = " ".join([p for p in parts if not p.startswith("site:")])

                    print(f"  ⚠ Empty results for '{query}', retrying with '{fallback_query}'")
                    results = await client.search(fallback_query, num_results)

                    if results:
                        return results

            # No results even with fallback
            return []

        except Exception as e:
            error_msg = str(e)

            # Rate limit - retry with exponential backoff
            if "rate limit" in error_msg.lower():
                if attempt < max_retries - 1:
                    print(f"  ⚠ Rate limit hit, retrying in {retry_delay}s...")
                    await asyncio.sleep(retry_delay)
                    retry_delay *= 2  # Exponential backoff
                    continue
                else:
                    print(f"  ✗ Rate limit exceeded after {max_retries} retries")
                    return []

            # Other errors - fail immediately
            print(f"  ✗ Search failed: {error_msg}")
            return []

    return []
