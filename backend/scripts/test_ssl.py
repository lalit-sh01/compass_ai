import ssl
import certifi
import urllib.request
import os
from dotenv import load_dotenv

load_dotenv()

CLERK_ISSUER_URL = os.getenv("CLERK_ISSUER_URL")
JWKS_URL = f"{CLERK_ISSUER_URL}/.well-known/jwks.json"

print(f"Testing connection to: {JWKS_URL}")
print(f"Certifi path: {certifi.where()}")

try:
    # Test 1: Default urllib (often fails on mac)
    print("\nTest 1: Default urllib")
    urllib.request.urlopen(JWKS_URL)
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")

try:
    # Test 2: SSL Context with certifi
    print("\nTest 2: SSL Context with certifi")
    context = ssl.create_default_context(cafile=certifi.where())
    urllib.request.urlopen(JWKS_URL, context=context)
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")
