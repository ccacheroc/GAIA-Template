
import pytest
import uuid
from app.infrastructure.models.quiz import QuestionType, Quiz
from app.core.deps import SIMPLE_TEACHER_ID

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

@pytest.mark.asyncio
async def test_add_tf_question_to_quiz(client, db_session):
    # 1. Create a quiz first
    quiz = Quiz(
        title="API Test Quiz",
        owner_id=SIMPLE_TEACHER_ID
    )
    db_session.add(quiz)
    await db_session.commit()
    await db_session.refresh(quiz)

    # 2. Add a question via API
    payload = {
        "type": "TF",
        "content": "Does 2+2=4?",
        "options": [
            {"content": "True", "is_correct": True},
            {"content": "False", "is_correct": False}
        ]
    }
    
    response = await client.post(f"/api/v1/quizzes/{quiz.id}/questions", json=payload)
    
    assert response.status_code == 201
    data = response.json()
    assert data["content"] == "Does 2+2=4?"
    assert data["type"] == "TF"
    assert len(data["options"]) == 2
    assert data["sequence"] == 1

@pytest.mark.asyncio
async def test_add_question_bola_check(client, db_session):
    # 1. Create another user
    from app.infrastructure.models.user import User
    new_id = uuid.uuid4()
    other_teacher = User(id=new_id, email=f"bola_{new_id}@example.com", full_name="Other", password_hash="dummy")
    db_session.add(other_teacher)
    await db_session.commit()

    # 2. Create a quiz belonging to someone else
    quiz = Quiz(
        title="Other Teacher's Quiz",
        owner_id=other_teacher.id
    )
    db_session.add(quiz)
    await db_session.commit()
    await db_session.refresh(quiz)

    # 3. Attempt to add a question (using SIMPLE_TEACHER_ID by default in client)
    payload = {
        "type": "TF",
        "content": "Malicious attempt?",
        "options": [
            {"content": "True", "is_correct": True},
            {"content": "False", "is_correct": False}
        ]
    }
    
    response = await client.post(f"/api/v1/quizzes/{quiz.id}/questions", json=payload)
    
    # PermissionError should be mapped to 404 in the router as per my implementation
    assert response.status_code == 404
    assert response.json()["detail"] == "Teacher does not own this quiz or quiz not found."
