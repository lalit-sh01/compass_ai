import logging

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# Ensure asyncpg driver is used
database_url = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

# Use NullPool to prevent connection attempts at startup
# Connections are only created when actually needed
engine = create_async_engine(
    database_url,
    echo=False,
    future=True,
    poolclass=NullPool,  # Don't maintain a connection pool - create on demand
    connect_args={
        "server_settings": {"application_name": "roadmap_viewer"},
        "timeout": 10,
        "command_timeout": 10,
    }
)

async def get_session() -> AsyncSession:
    async_session = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    async with async_session() as session:
        try:
            yield session
        except Exception as e:
            logger.error(f"Database session error: {e}")
            await session.rollback()
            raise
