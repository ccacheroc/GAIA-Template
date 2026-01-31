from fastapi import HTTPException, status
from app.domain.repositories.user_repository import UserRepository
from app.infrastructure.models.user import User
from app.domain.services.security import get_password_hash
from app.presentation.schemas.auth import UserRegister

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

class RegisterTeacher:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, user_in: UserRegister) -> User:
        # Check if email exists
        existing_user = await self.user_repo.get_by_email(user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create user
        new_user = User(
            email=user_in.email,
            full_name=user_in.full_name,
            password_hash=get_password_hash(user_in.password)
        )
        
        return await self.user_repo.save(new_user)
