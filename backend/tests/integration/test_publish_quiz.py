import pytest
from uuid import uuid4
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.models.user import User
from app.infrastructure.models.quiz import Quiz, QuizStatus, Question, QuestionType, Option
from app.core.deps import SIMPLE_TEACHER_ID

@pytest.mark.asyncio
async def test_publish_quiz_happy_path(client, db_session: AsyncSession):
    # 1. Setup Data - Use existing teacher
    user_id = SIMPLE_TEACHER_ID
    # Ensure teacher exists (handled by conftest but safe to check/merge)
    # The fixture seed_teacher runs autouse=True
    
    quiz_id = uuid4()
    quiz = Quiz(id=quiz_id, teacher_id=user_id, title="Ready to Publish", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    
    # Add a valid question with options
    q_id = uuid4()
    question = Question(id=q_id, quiz_id=quiz_id, content="Q1", type=QuestionType.TF, sequence=1)
    db_session.add(question)
    
    opt1 = Option(id=uuid4(), question_id=q_id, content="True", is_correct=True)
    opt2 = Option(id=uuid4(), question_id=q_id, content="False", is_correct=False)
    db_session.add(opt1)
    db_session.add(opt2)
    
    await db_session.commit()
    
    # 2. Call Publish Endpoint
    response = await client.post(f"/api/v1/quizzes/{quiz_id}/publish")
    
    # 3. Verify
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "PUBLISHED"
    
    # Verify persistence
    await db_session.refresh(quiz)
    assert quiz.status == QuizStatus.PUBLISHED

@pytest.mark.asyncio
async def test_publish_quiz_validation_failure_no_questions(client, db_session: AsyncSession):
    # 1. Setup Data
    user_id = SIMPLE_TEACHER_ID
    
    quiz_id = uuid4()
    quiz = Quiz(id=quiz_id, teacher_id=user_id, title="Empty Quiz", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    
    await db_session.commit()
    
    # 2. Call Publish Endpoint
    response = await client.post(f"/api/v1/quizzes/{quiz_id}/publish")
    
    # 3. Verify Failure
    assert response.status_code == 400
    assert "at least one question" in response.json()["detail"].lower()

@pytest.mark.asyncio
async def test_publish_quiz_validation_failure_invalid_question(client, db_session: AsyncSession):
    # 1. Setup Data
    user_id = SIMPLE_TEACHER_ID
    
    quiz_id = uuid4()
    quiz = Quiz(id=quiz_id, teacher_id=user_id, title="Invalid Question Quiz", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    
    q_id = uuid4()
    # Question with options but none correct
    question = Question(id=q_id, quiz_id=quiz_id, content="Incomplete Q", type=QuestionType.MULTIPLE_CHOICE, sequence=1)
    db_session.add(question)
    
    opt1 = Option(id=uuid4(), question_id=q_id, content="False1", is_correct=False)
    opt2 = Option(id=uuid4(), question_id=q_id, content="False2", is_correct=False)
    db_session.add(opt1)
    db_session.add(opt2)
    
    await db_session.commit()
    
    # 2. Call Publish Endpoint
    response = await client.post(f"/api/v1/quizzes/{quiz_id}/publish")
    
    # 3. Verify Failure
    assert response.status_code == 400
    assert "must have at least one correct answer" in response.json()["detail"].lower()
