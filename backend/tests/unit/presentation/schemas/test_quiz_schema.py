
import pytest
from pydantic import ValidationError
from uuid import uuid4
from app.presentation.schemas.quiz import QuizCreate, QuizUpdate, QuizResponse

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

def test_quiz_create_valid():
    payload = {"title": "Math Quiz", "description": "Basic Algebra"}
    quiz = QuizCreate(**payload)
    assert quiz.title == "Math Quiz"
    assert quiz.description == "Basic Algebra"

def test_quiz_create_missing_title():
    payload = {"description": "No title provided"}
    with pytest.raises(ValidationError) as exc:
        QuizCreate(**payload)
    assert "Field required" in str(exc.value)
    assert "title" in str(exc.value)

def test_quiz_create_empty_title():
    # Assuming title shouldn't be empty string
    payload = {"title": "", "description": "Empty title"}
    with pytest.raises(ValidationError):
        QuizCreate(**payload)

def test_quiz_response_serialization():
    quiz_id = uuid4()
    owner_id = uuid4()
    data = {
        "id": quiz_id,
        "owner_id": owner_id,
        "title": "History Quiz",
        "description": "WWII",
        "status": "DRAFT",
        "created_at": "2024-01-01T10:00:00",
        "updated_at": "2024-01-01T10:00:00"
    }
    response = QuizResponse(**data)
    assert response.id == quiz_id
    assert response.owner_id == owner_id
    assert response.status == "DRAFT"
