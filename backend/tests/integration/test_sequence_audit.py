import pytest
from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.models.user import User
from app.infrastructure.models.quiz import Quiz, Question, QuestionType
from scripts.audit_sequences import audit_quizzes_logic
from tests.conftest import AUTH_TEACHER_ID

@pytest.mark.asyncio
async def test_audit_detects_and_fixes_gaps(db_session: AsyncSession):
    # Setup
    user_id = AUTH_TEACHER_ID

    
    # Ensure user exists (idempotent check)
    user = await db_session.get(User, user_id)
    if not user:
         user = User(id=user_id, email=f"teacher_{user_id}@example.com", full_name="Teacher", password_hash="dummy")
         db_session.add(user)
         await db_session.commit()
    
    quiz_id = uuid4()
    quiz = Quiz(id=quiz_id, owner_id=user_id, title="Gap Quiz")
    db_session.add(quiz)
    
    # Add questions with gaps: 1, 3
    q1 = Question(id=uuid4(), quiz_id=quiz_id, content="Q1", type=QuestionType.TF, sequence=1)
    q2 = Question(id=uuid4(), quiz_id=quiz_id, content="Q2", type=QuestionType.TF, sequence=3)
    db_session.add(q1)
    db_session.add(q2)
    
    await db_session.commit()
    
    # Run audit logic (check only)
    issues, fixed = await audit_quizzes_logic(db_session, fix=False)
    
    # Expect at least our quiz to be flagged
    # Note: issues count is number of invalid quizzes
    assert issues >= 1 
    assert fixed == 0
    
    # Run with fix
    issues_fix, fixed_fix = await audit_quizzes_logic(db_session, fix=True)
    
    assert issues_fix >= 1
    assert fixed_fix >= 1 # At least our quiz repaired
    
    # Verify fix persistence
    await db_session.refresh(q1)
    await db_session.refresh(q2)
    
    # Logic sorts by sequence: q1(1) < q2(3), so q1 becomes 1, q2 becomes 2.
    assert q1.sequence == 1
    assert q2.sequence == 2
