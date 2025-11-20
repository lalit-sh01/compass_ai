import asyncio

from sqlalchemy import text

from app.core.db import engine


async def add_user_notes_column():
    async with engine.begin() as conn:
        print("Checking if user_notes column exists...")
        # Check if column exists
        result = await conn.execute(text(
            "SELECT column_name FROM information_schema.columns WHERE table_name='roadmaps' AND column_name='user_notes'"
        ))
        if result.fetchone():
            print("Column 'user_notes' already exists.")
        else:
            print("Adding 'user_notes' column...")
            await conn.execute(text("ALTER TABLE roadmaps ADD COLUMN user_notes JSONB DEFAULT '{}'::jsonb"))
            print("Column 'user_notes' added successfully.")

if __name__ == "__main__":
    asyncio.run(add_user_notes_column())
