from typing import Annotated
from uuid import UUID

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_session
from app.core.security import verify_clerk_token

SessionDep = Annotated[AsyncSession, Depends(get_session)]
CurrentUser = Annotated[UUID, Depends(verify_clerk_token)]
