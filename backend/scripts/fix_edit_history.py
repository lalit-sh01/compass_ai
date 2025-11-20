import asyncio
from sqlalchemy import text
from app.core.db import engine

async def fix_edit_history_type():
    async with engine.begin() as conn:
        print("Fixing edit_history column type...")
        
        # Step 1: Drop the default
        await conn.execute(text(
            "ALTER TABLE roadmaps ALTER COLUMN edit_history DROP DEFAULT"
        ))
        print("Dropped default constraint")
        
        # Step 2: Change from JSONB[] to JSONB
        await conn.execute(text(
            "ALTER TABLE roadmaps ALTER COLUMN edit_history TYPE JSONB USING '[]'::jsonb"
        ))
        print("Changed column type to JSONB")
        
        # Step 3: Set new default
        await conn.execute(text(
            "ALTER TABLE roadmaps ALTER COLUMN edit_history SET DEFAULT '[]'::jsonb"
        ))
        print("Set new default value")
        
        print("Successfully fixed edit_history column type!")

if __name__ == "__main__":
    asyncio.run(fix_edit_history_type())
