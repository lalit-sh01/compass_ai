from uuid import UUID

import ssl
import certifi
import jwt
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.config import get_settings
from app.core.db import get_session
from app.models.user import User

security = HTTPBearer()
settings = get_settings()

async def get_clerk_user_id(
    credentials: HTTPAuthorizationCredentials = Security(security)
) -> str:
    """
    Verifies the Clerk JWT token and returns the Clerk user ID (sub).
    Does NOT check the database.
    """
    token = credentials.credentials
    
    try:
        jwks_url = f"{settings.CLERK_ISSUER_URL}/.well-known/jwks.json"
        
        # Create SSL context with certifi's CA bundle
        ssl_context = ssl.create_default_context(cafile=certifi.where())
        jwks_client = PyJWKClient(jwks_url, ssl_context=ssl_context)
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        decode_options = {"verify_signature": True}
        decode_kwargs = {
            "jwt": token,
            "key": signing_key.key,
            "algorithms": ["RS256"],
        }
        
        if settings.CLERK_AUDIENCE:
            decode_kwargs["audience"] = settings.CLERK_AUDIENCE
            decode_options["verify_audience"] = True
        else:
            decode_options["verify_audience"] = False
            
        decode_kwargs["options"] = decode_options
        
        payload = jwt.decode(**decode_kwargs)
        
        clerk_user_id = payload.get("sub")
        if not clerk_user_id:
             raise HTTPException(status_code=401, detail="Invalid token: missing sub")
             
        return clerk_user_id
        
    except jwt.PyJWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

async def verify_clerk_token(
    clerk_user_id: str = Depends(get_clerk_user_id),
    session: AsyncSession = Depends(get_session)
) -> UUID:
    """
    Verifies the Clerk JWT token and returns the database user UUID.
    Requires user to exist in database.
    """
    # Look up user in database by clerk_user_id
    statement = select(User).where(User.clerk_user_id == clerk_user_id)
    result = await session.execute(statement)
    user = result.scalars().first()
    
    if not user:
        raise HTTPException(status_code=401, detail="User not found in database")
    
    return user.id

