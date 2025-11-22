from typing import AsyncGenerator, Optional
from openai import AsyncOpenAI
from sqlalchemy.ext.asyncio import AsyncSession
import json
import re

from app.services.api_key_service import ApiKeyService
from app.core.config import get_settings


async def create_openai_client(session: AsyncSession, user_id: str) -> AsyncOpenAI:
    service = ApiKeyService(session)
    api_key = await service.get_api_key(user_id, "openai")

    if not api_key:
        raise ValueError("OpenAI API key not found. Please add your API key in Settings.")

    return AsyncOpenAI(api_key=api_key)

async def call_openai_json(
    client: AsyncOpenAI,
    system_prompt: str,
    user_prompt: str,
    model: str = "gpt-4-turbo-preview",
    temperature: float = 0.7,
    max_tokens: int = 4000
) -> dict:
    try:
        response = await client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        if not content:
            raise ValueError("No response from OpenAI")

        return json.loads(content)
    except Exception as e:
        raise ValueError(f"OpenAI API Error: {str(e)}")


# ============================================================================
# STREAMING FUNCTIONS (for agentic roadmap generation)
# ============================================================================


async def stream_openai_json(
    system_prompt: str,
    user_prompt: str,
    model: str = "gpt-4o-mini",
    temperature: float = 0.7,
    max_tokens: int = 2000,
) -> AsyncGenerator[str, None]:
    """
    Stream JSON response from OpenAI API token by token.
    Used for cognitive profiler to get real-time feedback.

    Args:
        system_prompt: System prompt
        user_prompt: User message
        model: Model name (default: gpt-4o-mini for speed)
        temperature: Temperature (0.0-1.0)
        max_tokens: Max tokens in response

    Yields:
        Text chunks as they arrive from the API
    """
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    stream = await client.chat.completions.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        stream=True,
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
    )

    async for chunk in stream:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content


async def stream_openai_text(
    system_prompt: str,
    user_prompt: str,
    model: str = "gpt-4o-mini",
    temperature: float = 0.7,
    max_tokens: int = 2000,
) -> AsyncGenerator[str, None]:
    """
    Stream plain text response from OpenAI API.

    Args:
        system_prompt: System prompt
        user_prompt: User message
        model: Model name
        temperature: Temperature
        max_tokens: Max tokens

    Yields:
        Text chunks as they arrive
    """
    settings = get_settings()
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    stream = await client.chat.completions.create(
        model=model,
        max_tokens=max_tokens,
        temperature=temperature,
        stream=True,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
    )

    async for chunk in stream:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content
