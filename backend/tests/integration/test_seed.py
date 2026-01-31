import pytest
from sqlalchemy import select
from app.infrastructure.models.user import User
from app.infrastructure.models.quiz import Quiz

# [Feature: User Authentication] [Story: AUTH-TEACHER-004] [Ticket: AUTH-TEACHER-004-OTH-T01]

@pytest.mark.asyncio
async def test_seed_auth_idempotency(db_session):
    from scripts.seed_auth import seed_auth_logic
    
    # 1. First run
    await seed_auth_logic(db_session)
    
    # Verify users created
    res_u = await db_session.execute(select(User).where(User.email.in_([
        "profe.test1@gaia.edu", 
        "profe.test2@gaia.edu"
    ])))
    users = res_u.scalars().all()
    assert len(users) == 2
    
    # Verify quizzes created
    res_q = await db_session.execute(select(Quiz))
    quizzes = res_q.scalars().all()
    assert len(quizzes) >= 2 # Should be at least 2 from the seed
    
    # 2. Second run (idempotence)
    await seed_auth_logic(db_session)
    
    # Verify no duplicates
    res_u2 = await db_session.execute(select(User).where(User.email.in_([
        "profe.test1@gaia.edu", 
        "profe.test2@gaia.edu"
    ])))
    users2 = res_u2.scalars().all()
    assert len(users2) == 2
