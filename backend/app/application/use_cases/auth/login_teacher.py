from fastapi import HTTPException, status
from typing import Optional
from app.domain.repositories.user_repository import UserRepository
from app.domain.services.security import verify_password, create_access_token
from app.presentation.schemas.auth import UserLogin
from app.presentation.schemas.token import Token

# [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-BE-T01]

class LoginTeacher:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    async def execute(self, credentials: UserLogin) -> Token:
        # Retrieve user
        user = await self.user_repo.get_by_email(credentials.email)
        
        # Verify user and password
        if not user or not verify_password(credentials.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Correo o contraseña incorrectos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create token
        access_token = create_access_token(data={"sub": str(user.id), "email": user.email})
        
        return Token(access_token=access_token)
