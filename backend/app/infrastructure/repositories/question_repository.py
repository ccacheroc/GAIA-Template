
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

    # [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-BE-T01]
    async def get_by_quiz_id(self, quiz_id: UUID) -> list[Question]:
        result = await self.session.execute(
            select(Question)
            .where(Question.quiz_id == quiz_id)
            .order_by(Question.sequence)
        )
        return list(result.scalars().all())

    async def update_all_sequences(self, quiz_id: UUID, reorder_items: list[tuple[UUID, int]]) -> None:
        """
        Updates sequences for multiple questions. 
        Note: The transaction management is assumed to be handled at the session level.
        """
        for question_id, new_sequence in reorder_items:
            # We don't need to fetch the whole object if we just want to update one field,
            # but for a batch of 2-20 questions, fetching and updating is safe and simple.
            # Alternatively use a bulk update statement if performance is a concern (not here).
            result = await self.session.execute(
                select(Question).where(Question.id == question_id, Question.quiz_id == quiz_id)
            )
            question = result.scalar_one_or_none()
            if question:
                question.sequence = new_sequence
        
        await self.session.commit()
