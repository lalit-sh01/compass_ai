from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    CLERK_ISSUER_URL: str
    CLERK_AUDIENCE: str = "" # Optional if checking audience
    ENCRYPTION_KEY: str
    OPENAI_API_KEY: str = "" # Optional - for system operations

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
