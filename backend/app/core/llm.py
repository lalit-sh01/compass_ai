from openai import AsyncOpenAI
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.api_key_service import ApiKeyService


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
    import json
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
