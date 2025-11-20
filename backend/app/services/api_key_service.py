from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.encryption import decrypt_api_key, encrypt_api_key
from app.models.user_api_key import UserApiKey


class ApiKeyService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def save_api_key(self, user_id: str, api_key: str, provider: str = "openai") -> UserApiKey:
        # Deactivate existing keys
        statement = select(UserApiKey).where(
            UserApiKey.user_id == user_id, 
            UserApiKey.provider == provider,
            UserApiKey.is_active == True
        )
        results = await self.session.execute(statement)
        existing_keys = results.scalars().all()
        
        for key in existing_keys:
            key.is_active = False
            self.session.add(key)
            
        # Create new key
        encrypted_key = encrypt_api_key(api_key)
        new_key = UserApiKey(
            user_id=user_id,
            provider=provider,
            encrypted_key=encrypted_key,
            is_active=True
        )
        self.session.add(new_key)
        await self.session.commit()
        await self.session.refresh(new_key)
        return new_key

    async def get_api_key(self, user_id: str, provider: str = "openai") -> Optional[str]:
        statement = select(UserApiKey).where(
            UserApiKey.user_id == user_id,
            UserApiKey.provider == provider,
            UserApiKey.is_active == True
        )
        result = await self.session.execute(statement)
        key_record = result.scalars().first()
        
        if key_record:
            return decrypt_api_key(key_record.encrypted_key)
        return None

    async def has_api_key(self, user_id: str, provider: str = "openai") -> bool:
        statement = select(UserApiKey).where(
            UserApiKey.user_id == user_id,
            UserApiKey.provider == provider,
            UserApiKey.is_active == True
        )
        result = await self.session.execute(statement)
        return result.scalars().first() is not None

    async def delete_api_key(self, user_id: str, provider: str = "openai") -> None:
        statement = select(UserApiKey).where(
            UserApiKey.user_id == user_id,
            UserApiKey.provider == provider,
            UserApiKey.is_active == True
        )
        results = await self.session.execute(statement)
        existing_keys = results.scalars().all()
        
        for key in existing_keys:
            key.is_active = False
            self.session.add(key)
            
        await self.session.commit()
