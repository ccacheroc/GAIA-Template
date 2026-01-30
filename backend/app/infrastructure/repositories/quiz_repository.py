
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
        self.session.add(quiz)
        await self.session.flush()
        await self.session.refresh(quiz)
        return quiz

    async def get_by_id(self, quiz_id: UUID) -> Optional[Quiz]:
        result = await self.session.execute(
            select(Quiz).where(Quiz.id == quiz_id)
        )
        return result.scalars().first()

    async def update(self, quiz: Quiz) -> Quiz:
        # Assumes quiz object is attached to session. 
        # If passed from use case, it might need merging or assumes it came from get_by_id within same UoW.
        await self.session.flush()
        await self.session.refresh(quiz)
        return quiz

    async def list_by_teacher(self, teacher_id: UUID) -> list[Quiz]:
        result = await self.session.execute(
            select(Quiz).where(Quiz.teacher_id == teacher_id).order_by(Quiz.created_at.desc())
        )
        return list(result.scalars().all())
