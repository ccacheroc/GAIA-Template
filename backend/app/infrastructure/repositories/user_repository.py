from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.domain.repositories.user_repository import UserRepository
from app.infrastructure.models.user import User

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-BE-T02]

class SqlAlchemyUserRepository(UserRepository):
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).where(User.email == email)
        result = await self.session.execute(stmt)
        return result.scalars().first()

    async def save(self, user: User) -> User:
        self.session.add(user)
        # Flush or commit is handled by the use case/transaction manager usually, 
        # but for simplicity we can assume the session will be committed by the caller.
        await self.session.flush()
        return user
