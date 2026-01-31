
import pytest
import uuid
from sqlalchemy import select
from datetime import datetime, timezone
from app.infrastructure.models.user import User

# [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-DB-T01]

@pytest.mark.asyncio
async def test_user_persistence_full_fields(db_session):
    # Given
    user_id = uuid.uuid4()
    email = f"test-{user_id}@gaia.edu"
    password_hash = "argon2id$v=19$m=65536,t=3,p=4$somehash"
    
    # When
    user = User(
        id=user_id,
        email=email,
        full_name="Test User",
        password_hash=password_hash
    )
    db_session.add(user)
    await db_session.commit()
    
    # Then
    res = await db_session.execute(select(User).where(User.id == user_id))
    saved_user = res.scalars().first()
    
    assert saved_user is not None
    assert saved_user.email == email
    assert saved_user.password_hash == password_hash
    assert isinstance(saved_user.created_at, datetime)
