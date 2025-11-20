import os

from cryptography.fernet import Fernet

from app.core.config import get_settings

settings = get_settings()

# In a real app, this should be a persistent secret from env
# For migration, we'll generate one or use a fixed one if provided
# If NEXT_PUBLIC_ENCRYPTION_KEY was used in frontend, we might need to match it
# but usually backend should have its own secure key.
# Let's assume we use a new key for the backend or read from env.

ENCRYPTION_KEY = os.getenv("ENCRYPTION_KEY", Fernet.generate_key().decode())

cipher_suite = Fernet(ENCRYPTION_KEY.encode())

def encrypt_api_key(api_key: str) -> str:
    return cipher_suite.encrypt(api_key.encode()).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    return cipher_suite.decrypt(encrypted_key.encode()).decode()
