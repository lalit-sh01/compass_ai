#!/usr/bin/env python3
"""
Test script for the Inquisitor interview endpoint
"""
import asyncio
import httpx

async def test_interview():
    print("Testing /profile-interview/start...")
    async with httpx.AsyncClient() as client:
        # Test start endpoint
        response = await client.post("http://localhost:8000/api/agents/profile-interview/start")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}\n")

        # Test continue endpoint
        print("\nTesting /profile-interview/continue with user answer...")
        conversation = [
            {"role": "assistant", "content": "What skill do you want to master?"},
            {"role": "user", "content": "I want to learn React"}
        ]

        try:
            async with client.stream(
                "POST",
                "http://localhost:8000/api/agents/profile-interview/continue",
                json={"conversation_history": conversation},
                timeout=30.0
            ) as response:
                print(f"Status: {response.status_code}")
                print(f"Headers: {response.headers.get('content-type')}")
                print("\nStreaming response:")
                print("-" * 50)

                buffer = ""
                async for chunk in response.aiter_text():
                    buffer += chunk
                    print(chunk, end='', flush=True)

                print("\n" + "-" * 50)
                print(f"\nTotal response length: {len(buffer)} characters")

        except Exception as e:
            print(f"Error during streaming: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_interview())
