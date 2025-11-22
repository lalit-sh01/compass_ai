"""
Quality Resource Fetcher - Python Tool (Node D Support)
Executes search queries and scores resources using weighted algorithm.
Factor Weights:
- 50%: Domain Authority (hardcoded trusted domains + expert authors)
- 30%: Social Proof (view counts, engagement metrics)
- 20%: Relevance & Quality (description quality, freshness, depth)
"""

import asyncio
import re
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from datetime import datetime


# ============================================================================
# TRUSTED DOMAINS PER GOAL DOMAIN
# ============================================================================

TRUSTED_DOMAINS = {
    "Cognitive": {
        "youtube": [
            "3Blue1Brown",
            "Crash Course",
            "Kurzgesagt",
            "TED-Ed",
            "StatQuest",
            "Computerphile"
        ],
        "documentation": [
            "developer.mozilla.org",
            "docs.python.org",
            "docs.djangoproject.com",
            "docs.fastapi.tiangolo.com",
            "kubernetes.io",
            "react.dev",
            "angular.io"
        ],
        "platforms": [
            "coursera.org",
            "edx.org",
            "udacity.com",
            "platzi.com",
            "linkedin.com/learning",
        ]
    },
    "Physical": {
        "youtube": [
            "PingSkills",
            "Athleanx",
            "OptimizeHealth",
            "James Clear",
            "Renaissance Periodization"
        ],
        "documentation": [
            "nsca.org",
            "acsm.org",
        ],
        "platforms": [
            "skillshare.com",
            "udemy.com",
        ]
    },
    "Market": {
        "youtube": [
            "Crash Course",
            "TED",
            "Bloomberg",
            "CNBC",
            "Harvard Business School"
        ],
        "documentation": [
            "investopedia.com",
            "sec.gov",
            "wsj.com",
            "ft.com",
            "mckinsey.com"
        ],
        "platforms": [
            "coursera.org",
            "linkedin.com/learning"
        ]
    }
}


@dataclass
class SearchCandidate:
    """Represents a single search result."""
    url: str
    title: str
    author: str
    description: str
    view_count: Optional[int] = None
    publication_date: Optional[str] = None
    platform: str = "unknown"  # youtube, documentation, course, blog, etc.

    def to_dict(self) -> Dict:
        return {
            "url": self.url,
            "title": self.title,
            "author": self.author,
            "description": self.description,
            "view_count": self.view_count,
            "publication_date": self.publication_date,
            "platform": self.platform,
        }


class QualityResourceFetcher:
    """
    Executes search queries and scores candidates using weighted algorithm.
    This is a DETERMINISTIC TOOL, not an LLM.
    """

    def __init__(self, goal_domain: str = "Cognitive"):
        self.goal_domain = goal_domain
        self.trusted_domains = TRUSTED_DOMAINS.get(goal_domain, TRUSTED_DOMAINS["Cognitive"])

    def score_candidate(self, candidate: SearchCandidate) -> float:
        """
        Score a single candidate using weighted factors.
        Returns: Float between 0 and 100.

        Weights:
        - 50%: Domain Authority
        - 30%: Social Proof
        - 20%: Relevance & Quality
        """
        score = 0.0

        # FACTOR 1: Domain Authority (50%)
        domain_authority_score = self._score_domain_authority(candidate)
        score += domain_authority_score * 0.50

        # FACTOR 2: Social Proof (30%)
        social_proof_score = self._score_social_proof(candidate)
        score += social_proof_score * 0.30

        # FACTOR 3: Relevance & Quality (20%)
        relevance_quality_score = self._score_relevance_and_quality(candidate)
        score += relevance_quality_score * 0.20

        return score

    def _score_domain_authority(self, candidate: SearchCandidate) -> float:
        """
        Score based on hardcoded trusted domains and authors.
        Returns: 0-100 points.

        +50 if matches trusted domain/author list
        +25 if matches platform (e.g., is from YouTube)
        +10 if known quality indicator in URL
        +0 otherwise
        """
        score = 0.0

        # Check if author is in trusted list
        for author_list in self.trusted_domains.values():
            if isinstance(author_list, list):
                for trusted_author in author_list:
                    if trusted_author.lower() in candidate.author.lower():
                        return 50.0  # Maximum authority score

        # Check if URL matches trusted domain
        trusted_urls = []
        for author_list in self.trusted_domains.values():
            if isinstance(author_list, list):
                trusted_urls.extend(author_list)

        for trusted_url in trusted_urls:
            if trusted_url.lower() in candidate.url.lower():
                score += 25.0

        # Platform bonus
        if candidate.platform == "youtube" and "youtube.com" in candidate.url:
            score += 10.0
        elif candidate.platform == "documentation":
            score += 15.0

        return min(score, 50.0)  # Cap at 50

    def _score_social_proof(self, candidate: SearchCandidate) -> float:
        """
        Score based on social proof (views, engagement).
        Returns: 0-30 points.

        +30 if view_count > 500k
        +15 if view_count > 50k
        +5 if view_count > 5k
        +0 otherwise
        """
        if not candidate.view_count:
            return 0.0

        if candidate.view_count > 500_000:
            return 30.0
        elif candidate.view_count > 50_000:
            return 15.0
        elif candidate.view_count > 5_000:
            return 5.0
        else:
            return 0.0

    def _score_relevance_and_quality(self, candidate: SearchCandidate) -> float:
        """
        Score based on description quality, freshness, depth.
        Returns: 0-20 points.

        Penalties:
        - -40 points for known low-value content (e.g., "Shorts")
        - -10 points if description too short
        - -5 points if very old (>5 years)

        Otherwise: +20 points
        """
        score = 20.0

        # Penalty: Known low-value content
        if "shorts" in candidate.url.lower() or "clip" in candidate.url.lower():
            score -= 40.0

        # Penalty: Short/vague description
        if not candidate.description or len(candidate.description) < 20:
            score -= 10.0

        # Penalty: Very old content
        if candidate.publication_date:
            try:
                pub_date = datetime.fromisoformat(candidate.publication_date)
                age_years = (datetime.now() - pub_date).days / 365.25
                if age_years > 5:
                    score -= 5.0
            except:
                pass

        return max(score, 0.0)

    async def fetch_and_score(
        self,
        search_query: str,
        top_k: int = 5
    ) -> Tuple[Optional[Dict], float]:
        """
        Fetch search results for a query and score them.
        Returns: (selected_resource_dict, quality_score)

        Implementation:
        1. Detect if YouTube-specific search (site:youtube.com)
        2. If YouTube: Use YouTube Data API with fallback
        3. If general web: Use SerpAPI with fallback
        4. Score all candidates using weighted algorithm
        5. Return the top candidate + score
        """
        from app.core.config import get_settings
        from app.agents.tools.youtube_client import YouTubeClient, search_youtube_with_fallback
        from app.agents.tools.serpapi_client import SerpAPIClient, search_with_fallback

        settings = get_settings()

        # Detect search type
        is_youtube_search = "site:youtube.com" in search_query.lower()

        try:
            if is_youtube_search:
                # YouTube search with real API
                if settings.YOUTUBE_API_KEY:
                    client = YouTubeClient(api_key=settings.YOUTUBE_API_KEY)
                    candidates = await search_youtube_with_fallback(client, search_query, top_k)
                else:
                    print("  ⚠ YouTube API key not configured, using mock data")
                    candidates = self._mock_search_results(search_query)
            else:
                # Web search with real API
                if settings.SERPAPI_API_KEY:
                    client = SerpAPIClient(api_key=settings.SERPAPI_API_KEY)
                    candidates = await search_with_fallback(client, search_query, top_k)
                else:
                    print("  ⚠ SerpAPI key not configured, using mock data")
                    candidates = self._mock_search_results(search_query)

            if not candidates:
                return None, 0.0

            # Score all candidates
            scored = []
            for candidate in candidates:
                score = self.score_candidate(candidate)
                scored.append((candidate, score))

            # Sort by score (descending)
            scored.sort(key=lambda x: x[1], reverse=True)

            # Select top candidate
            best_candidate, best_score = scored[0]

            return {
                "resource_url": best_candidate.url,
                "resource_title": best_candidate.title,
                "resource_author": best_candidate.author,
            }, best_score

        except Exception as e:
            print(f"  ✗ Resource fetch failed: {str(e)}, falling back to mock data")
            # Fallback to mock if real API fails
            mock_candidates = self._mock_search_results(search_query)
            if not mock_candidates:
                return None, 0.0

            scored = [(c, self.score_candidate(c)) for c in mock_candidates]
            scored.sort(key=lambda x: x[1], reverse=True)
            best_candidate, best_score = scored[0]

            return {
                "resource_url": best_candidate.url,
                "resource_title": best_candidate.title,
                "resource_author": best_candidate.author,
            }, best_score

    def _mock_search_results(self, search_query: str) -> List[SearchCandidate]:
        """
        MOCK: Simulate search results.
        In production, this would call real APIs (SerpAPI, YouTube Data API).
        """
        # Parse the search query to extract keywords
        if "site:youtube.com" in search_query.lower():
            # YouTube search
            return [
                SearchCandidate(
                    url="https://www.youtube.com/watch?v=mock1",
                    title="Professional Forehand Technique Tutorial",
                    author="PingSkills",
                    description="Comprehensive guide to mastering the forehand in table tennis",
                    view_count=250_000,
                    platform="youtube"
                ),
                SearchCandidate(
                    url="https://www.youtube.com/watch?v=mock2",
                    title="Basic Forehand Tips",
                    author="TennisCoach",
                    description="Quick tips for beginners",
                    view_count=45_000,
                    platform="youtube"
                ),
            ]
        elif "site:developer.mozilla.org" in search_query.lower():
            # MDN documentation
            return [
                SearchCandidate(
                    url="https://developer.mozilla.org/en-US/docs/Web/CSS/flexbox",
                    title="CSS Flexible Box Layout (Flexbox)",
                    author="MDN Web Docs",
                    description="Complete reference for CSS Flexbox with examples and browser compatibility",
                    platform="documentation"
                ),
            ]
        else:
            # Generic search
            return [
                SearchCandidate(
                    url="https://example.com/article1",
                    title="Comprehensive Guide",
                    author="Expert Author",
                    description="Detailed explanation with practical examples",
                    view_count=100_000,
                ),
            ]


# ============================================================================
# FLAGGING LOGIC
# ============================================================================

def get_quality_warning(quality_score: float) -> Optional[str]:
    """
    Determine if quality_warning flag should be set.
    If score < 30: Set quality_warning = "LOW_CONFIDENCE"
    This forces the Validator (Node E) to perform manual semantic review.
    """
    if quality_score < 30:
        return "LOW_CONFIDENCE"
    return None
