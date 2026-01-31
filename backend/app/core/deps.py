
from uuid import UUID, uuid4
from fastapi import Depends
from app.core.database import get_db, AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.repositories.quiz_repository import SQLAlchemyQuizRepository
from app.infrastructure.repositories.question_repository import SQLAlchemyQuestionRepository

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.domain.services.security import decode_access_token

# [Feature: User Authentication] [Story: AUTH-TEACHER-003] [Ticket: AUTH-TEACHER-003-BE-T02]
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> UUID:
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing user information",
        )
    return UUID(user_id)

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
