
from uuid import UUID, uuid4
from fastapi import Depends
from app.core.database import get_db, AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.repositories.quiz_repository import SQLAlchemyQuizRepository
from app.infrastructure.repositories.question_repository import SQLAlchemyQuestionRepository

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

# Placeholder for Auth - In real app this comes from JWT
SIMPLE_TEACHER_ID = UUID('ab84ab20-bd4c-4e62-944b-3c5bf8304dd1')

async def get_current_user() -> UUID:
    return SIMPLE_TEACHER_ID

async def get_quiz_repository(session: AsyncSession = Depends(get_db)) -> SQLAlchemyQuizRepository:
    return SQLAlchemyQuizRepository(session)

async def get_question_repository(session: AsyncSession = Depends(get_db)) -> SQLAlchemyQuestionRepository:
    return SQLAlchemyQuestionRepository(session)

# [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-BE-T01]
from app.application.use_cases.question.reorder_questions import ReorderQuestionsUseCase

async def get_reorder_questions_use_case(
    question_repo: SQLAlchemyQuestionRepository = Depends(get_question_repository),
    quiz_repo: SQLAlchemyQuizRepository = Depends(get_quiz_repository)
) -> ReorderQuestionsUseCase:
    return ReorderQuestionsUseCase(question_repo, quiz_repo)
