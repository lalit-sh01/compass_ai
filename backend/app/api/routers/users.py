from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select

from app.api.deps import CurrentUser, SessionDep
from app.core.security import get_clerk_user_id
from app.models.user import User
from app.services.api_key_service import ApiKeyService

router = APIRouter()

class ApiKeyInput(BaseModel):
    apiKey: str
    provider: str = "openai"

class UserSync(BaseModel):
    email: str
    full_name: str | None = None

@router.get("/me", response_model=User)
async def get_current_user_profile(
    session: SessionDep,
    user_id: CurrentUser
):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/sync", response_model=User)
async def sync_user(
    user_in: UserSync,
    session: SessionDep,
    clerk_user_id: str = Depends(get_clerk_user_id)
):
    # Check if user exists
    statement = select(User).where(User.clerk_user_id == clerk_user_id)
    result = await session.execute(statement)
    user = result.scalars().first()
    
    if user:
        # Update existing user
        user.email = user_in.email
        if user_in.full_name:
            user.full_name = user_in.full_name
        session.add(user)
    else:
        # Create new user
        user = User(
            clerk_user_id=clerk_user_id,
            email=user_in.email,
            full_name=user_in.full_name
        )
        session.add(user)
    
    await session.commit()
    await session.refresh(user)
    return user

@router.get("/api-keys/{provider}", response_model=dict)
async def get_api_key(
    provider: str,
    session: SessionDep,
    user_id: CurrentUser
):
    service = ApiKeyService(session)
    key = await service.get_api_key(user_id, provider)
    return {"apiKey": key}

@router.get("/has-api-key/{provider}")
async def has_api_key(
    provider: str,
    session: SessionDep,
    user_id: CurrentUser
):
    service = ApiKeyService(session)
    has_key = await service.has_api_key(user_id, provider)
    return {"hasKey": has_key}

@router.post("/api-keys")
async def save_api_key(
    input_data: ApiKeyInput,
    session: SessionDep,
    user_id: CurrentUser
):
    service = ApiKeyService(session)
    await service.save_api_key(user_id, input_data.apiKey, input_data.provider)
    return {"success": True}

@router.delete("/api-keys")
async def delete_api_key(
    provider: str,
    session: SessionDep,
    user_id: CurrentUser
):
    service = ApiKeyService(session)
    await service.delete_api_key(user_id, provider)
    return {"success": True}
