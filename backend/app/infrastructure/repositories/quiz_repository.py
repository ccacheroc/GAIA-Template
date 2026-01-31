
from typing import Optional
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.domain.repositories.quiz_repository import QuizRepository
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class SQLAlchemyQuizRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, quiz: Quiz) -> Quiz:
        from sqlalchemy.orm import selectinload
        from app.infrastructure.models.quiz import Question

        self.session.add(quiz)
        await self.session.flush()
        await self.session.refresh(quiz)
        
        # Load relationships for serialization
        result = await self.session.execute(
            select(Quiz)
            .where(Quiz.id == quiz.id)
            .options(
                selectinload(Quiz.questions).selectinload(Question.options)
            )
        )
        return result.scalars().first()

    async def get_by_id(self, quiz_id: UUID) -> Optional[Quiz]:
        from sqlalchemy.orm import selectinload
        from app.infrastructure.models.quiz import Question

        result = await self.session.execute(
            select(Quiz)
            .where(Quiz.id == quiz_id)
            .options(
                selectinload(Quiz.questions).selectinload(Question.options)
            )
        )
        return result.scalars().first()

    async def update(self, quiz: Quiz) -> Quiz:
        from sqlalchemy.orm import selectinload
        from app.infrastructure.models.quiz import Question

        # Flush changes to DB
        await self.session.flush()
        
        # Reload fully to ensure response schemas can access relationships
        result = await self.session.execute(
            select(Quiz)
            .where(Quiz.id == quiz.id)
            .options(
                selectinload(Quiz.questions).selectinload(Question.options)
            )
        )
        return result.scalars().first()

    async def list_by_owner(self, owner_id: UUID) -> list[Quiz]:
        from sqlalchemy.orm import selectinload
        from app.infrastructure.models.quiz import Question

        result = await self.session.execute(
            select(Quiz)
            .where(Quiz.owner_id == owner_id)
            .options(
                selectinload(Quiz.questions).selectinload(Question.options)
            )
            .order_by(Quiz.created_at.desc())
        )
        return list(result.scalars().all())
