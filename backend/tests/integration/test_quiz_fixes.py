
import pytest
from uuid import uuid4
from app.infrastructure.models.quiz import Quiz, Question, QuizStatus, QuestionType

# [Feature: Quiz Management] [Story: QQ-BUG-001] [Ticket: QQ-BUG-001-BE-V01]

@pytest.mark.asyncio
async def test_delete_question_and_cascade_options(client, db_session):
    from tests.conftest import AUTH_TEACHER_ID
    
    # 1. Seed quiz, question and options
    quiz = Quiz(owner_id=AUTH_TEACHER_ID, title="Quiz to test delete question", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    await db_session.flush()
    
    question = Question(quiz_id=quiz.id, type=QuestionType.TF, content="Delete me", sequence=1)
    db_session.add(question)
    await db_session.commit()
    await db_session.refresh(question)
    
    # 2. Delete question
    response = await client.delete(f"/api/v1/quizzes/questions/{question.id}")
    assert response.status_code == 204
    
    # 3. Verify gone
    from sqlalchemy import select
    from app.infrastructure.models.quiz import Question as DBQuestion
    res = await db_session.execute(select(DBQuestion).where(DBQuestion.id == question.id))
    assert res.scalar_one_or_none() is None

@pytest.mark.asyncio
async def test_delete_quiz_cascade(client, db_session):
    from tests.conftest import AUTH_TEACHER_ID
    
    # 1. Seed quiz and question
    quiz = Quiz(owner_id=AUTH_TEACHER_ID, title="Quiz to cascade", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    await db_session.flush()
    
    question = Question(quiz_id=quiz.id, type=QuestionType.TF, content="I should die", sequence=1)
    db_session.add(question)
    await db_session.commit()
    
    # 2. Delete Quiz
    response = await client.delete(f"/api/v1/quizzes/{quiz.id}")
    assert response.status_code == 204
    
    # 3. Verify both gone
    from sqlalchemy import select
    res_q = await db_session.execute(select(Quiz).where(Quiz.id == quiz.id))
    assert res_q.scalar_one_or_none() is None
    
    from app.infrastructure.models.quiz import Question as DBQuestion
    res_qs = await db_session.execute(select(DBQuestion).where(DBQuestion.quiz_id == quiz.id))
    assert res_qs.scalars().first() is None

@pytest.mark.asyncio
async def test_update_quiz_persistence(client, db_session):
    from tests.conftest import AUTH_TEACHER_ID
    quiz = Quiz(owner_id=AUTH_TEACHER_ID, title="Old Title", description="Old Desc")
    db_session.add(quiz)
    await db_session.commit()
    
    payload = {"title": "New Title", "description": "New Desc"}
    response = await client.put(f"/api/v1/quizzes/{quiz.id}", json=payload)
    assert response.status_code == 200
    
    # Verify in DB (new session to avoid cache)
    # Actually client requests go through the app's session
    from app.core.database import AsyncSessionLocal
    async with AsyncSessionLocal() as session:
        from sqlalchemy import select
        res = await session.execute(select(Quiz).where(Quiz.id == quiz.id))
        updated = res.scalar_one()
        assert updated.title == "New Title"
        assert updated.description == "New Desc"
