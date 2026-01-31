
import pytest
import asyncio
from typing import AsyncGenerator, Generator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
import os

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-DB-T01]

# Default to localhost for local testing if not set
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5455/app_db")

from app.infrastructure.db.base import Base
from app.infrastructure.models.user import User
from app.infrastructure.models.quiz import Quiz
from app.core.deps import SIMPLE_TEACHER_ID


@pytest.fixture
async def engine():
    engine = create_async_engine(DATABASE_URL, echo=False)
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    yield engine
    await engine.dispose()


@pytest.fixture(autouse=True)
async def seed_teacher(db_session):
    # Ensure SIMPLE_TEACHER_ID exists
    from sqlalchemy import select
    res = await db_session.execute(select(User).where(User.id == SIMPLE_TEACHER_ID))
    user = res.scalars().first()
    if not user:
        user = User(id=SIMPLE_TEACHER_ID, email="teacher@example.com", full_name="Test Teacher", password_hash="dummy")
        db_session.add(user)
        try:
            await db_session.commit()
        except Exception:
            await db_session.rollback()


@pytest.fixture
async def db_session(engine) -> AsyncGenerator[AsyncSession, None]:
    async_session = async_sessionmaker(engine, expire_on_commit=False)
    async with async_session() as session:
        yield session

from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.database import get_db

@pytest.fixture
async def client(db_session) -> AsyncGenerator[AsyncClient, None]:
    # Override dependency
    app.dependency_overrides[get_db] = lambda: db_session
    
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
    
    app.dependency_overrides.clear()

