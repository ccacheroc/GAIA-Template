
import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.infrastructure.models.user import User
from app.core.deps import SIMPLE_TEACHER_ID

async def seed_teacher():
    async with AsyncSessionLocal() as session:
        # Check if user exists
        stmt = select(User).where(User.id == SIMPLE_TEACHER_ID)
        result = await session.execute(stmt)
        user = result.scalars().first()
        
        if not user:
            print(f"Seeding teacher with ID: {SIMPLE_TEACHER_ID}")
            new_user = User(
                id=SIMPLE_TEACHER_ID,
                email="teacher@example.com",
                full_name="Test Teacher"
            )
            session.add(new_user)
            await session.commit()
            print("Teacher seeded successfully.")
        else:
            print("Teacher already exists.")

if __name__ == "__main__":
    asyncio.run(seed_teacher())
