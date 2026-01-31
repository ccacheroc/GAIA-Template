
import asyncio
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.infrastructure.models.user import User
from app.infrastructure.models.quiz import Quiz, QuizStatus
from app.domain.services.security import get_password_hash

# [Feature: User Authentication] [Story: AUTH-TEACHER-004] [Ticket: AUTH-TEACHER-004-OTH-T01]

SEED_DATA = [
    {
        "email": "profe.test1@gaia.edu",
        "full_name": "Profesor Uno",
        "quiz_title": "Cuestionario de Profe 1"
    },
    {
        "email": "profe.test2@gaia.edu",
        "full_name": "Profesor Dos",
        "quiz_title": "Cuestionario de Profe 2"
    }
]

async def seed_auth_logic(session: AsyncSession):
    for data in SEED_DATA:
        # 1. Seed User
        stmt = select(User).where(User.email == data["email"])
        result = await session.execute(stmt)
        user = result.scalars().first()
        
        if not user:
            print(f"Creating user: {data['email']}")
            user = User(
                email=data["email"],
                full_name=data["full_name"],
                password_hash=get_password_hash("password123")
            )
            session.add(user)
            await session.flush() # Get ID
        else:
            print(f"User {data['email']} already exists.")

        # 2. Seed Quiz for this user
        # Check if they already own a quiz with this title
        stmt_q = select(Quiz).where(Quiz.owner_id == user.id, Quiz.title == data["quiz_title"])
        res_q = await session.execute(stmt_q)
        quiz = res_q.scalars().first()
        
        if not quiz:
            print(f"Creating quiz '{data['quiz_title']}' for {data['email']}")
            quiz = Quiz(
                owner_id=user.id,
                title=data["quiz_title"],
                description="Seeded quiz for testing ownership.",
                status=QuizStatus.DRAFT
            )
            session.add(quiz)
        else:
            print(f"Quiz '{data['quiz_title']}' already exists for {data['email']}.")

    await session.commit()
    print("Seed AUTH-TEACHER-004-OTH-T01 completed.")

async def main():
    async with AsyncSessionLocal() as session:
        await seed_auth_logic(session)

if __name__ == "__main__":
    asyncio.run(main())
