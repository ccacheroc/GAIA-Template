from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.infrastructure.repositories.user_repository import SqlAlchemyUserRepository
from app.application.use_cases.auth.register_teacher import RegisterTeacher
from app.presentation.schemas.auth import UserRegister, UserRead

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

router = APIRouter(tags=["Authentication"])

@router.post("/auth/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(
    user_in: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    user_repo = SqlAlchemyUserRepository(db)
    use_case = RegisterTeacher(user_repo)
    user = await use_case.execute(user_in)
    await db.commit()
    return user
