
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from uuid import UUID
from app.infrastructure.models.quiz import Question
from app.domain.repositories.question_repository import QuestionRepository

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

from sqlalchemy.orm import selectinload

class SQLAlchemyQuestionRepository(QuestionRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def add(self, question: Question) -> Question:
        self.session.add(question)
        await self.session.commit()
        
        # Eagerly load options for the response
        result = await self.session.execute(
            select(Question)
            .where(Question.id == question.id)
            .options(selectinload(Question.options))
        )
        return result.scalar_one()

    async def get_next_sequence(self, quiz_id: UUID) -> int:
        result = await self.session.execute(
            select(func.max(Question.sequence)).where(Question.quiz_id == quiz_id)
        )
        max_seq = result.scalar()
        return (max_seq or 0) + 1
