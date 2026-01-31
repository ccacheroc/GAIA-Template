
import pytest
from uuid import uuid4
from app.core.deps import get_current_user
from app.infrastructure.models.quiz import Quiz, QuizStatus

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

@pytest.mark.asyncio
async def test_create_quiz_success(client):
    payload = {"title": "Integration Quiz", "description": "Testing API"}
    response = await client.post("/api/v1/quizzes", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Integration Quiz"
    assert data["status"] == "DRAFT"
    assert "id" in data

@pytest.mark.asyncio
async def test_create_quiz_validation_error(client):
    payload = {"description": "Missing Title"}
    response = await client.post("/api/v1/quizzes", json=payload)
    assert response.status_code == 422

@pytest.mark.asyncio
async def test_get_quiz_success(client, db_session):
    # Seed
    from app.core.deps import SIMPLE_TEACHER_ID
    quiz = Quiz(owner_id=SIMPLE_TEACHER_ID, title="Seed Quiz", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    await db_session.commit()
    await db_session.refresh(quiz)
    
    response = await client.get(f"/api/v1/quizzes/{quiz.id}")
    assert response.status_code == 200
    assert response.json()["title"] == "Seed Quiz"

@pytest.mark.asyncio
async def test_get_quiz_bola(client, db_session):
    # Seed other teacher
    from app.infrastructure.models.user import User
    other_teacher = uuid4()
    user = User(id=other_teacher, email=f"other_{other_teacher}@example.com", full_name="Other Teacher", password_hash="dummy")
    db_session.add(user)
    await db_session.flush()
    
    # Seed quiz owned by OTHER
    quiz = Quiz(owner_id=other_teacher, title="Other Quiz", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    await db_session.commit()
    
    # Client uses SIMPLE_TEACHER_ID by default
    response = await client.get(f"/api/v1/quizzes/{quiz.id}")
    assert response.status_code == 403

@pytest.mark.asyncio
async def test_update_quiz(client, db_session):
    from app.core.deps import SIMPLE_TEACHER_ID
    quiz = Quiz(owner_id=SIMPLE_TEACHER_ID, title="To Update", status=QuizStatus.DRAFT)
    db_session.add(quiz)
    await db_session.commit()
    
    payload = {"title": "Updated Title"}
    response = await client.put(f"/api/v1/quizzes/{quiz.id}", json=payload)
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Title"
