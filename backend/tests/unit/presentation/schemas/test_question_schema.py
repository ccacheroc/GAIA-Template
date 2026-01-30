
import pytest
from pydantic import ValidationError
from app.presentation.schemas.question import QuestionCreate, OptionCreate
from app.infrastructure.models.quiz import QuestionType

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

def test_question_create_tf_validation_correct_options():
    """TF questions must have exactly 2 options."""
    # Valid Case
    valid_data = {
        "type": QuestionType.TF,
        "content": "Is this a test?",
        "options": [
            {"content": "True", "is_correct": True},
            {"content": "False", "is_correct": False}
        ]
    }
    question = QuestionCreate(**valid_data)
    assert len(question.options) == 2

def test_question_create_tf_validation_wrong_count():
    """TF questions with wrong option count should fail."""
    invalid_data = {
        "type": QuestionType.TF,
        "content": "Is this a test?",
        "options": [
            {"content": "True", "is_correct": True}
        ]
    }
    with pytest.raises(ValidationError):
        QuestionCreate(**invalid_data)

def test_question_create_tf_validation_no_correct():
    """TF questions must have exactly one correct answer."""
    invalid_data = {
        "type": QuestionType.TF,
        "content": "Is this a test?",
        "options": [
            {"content": "True", "is_correct": False},
            {"content": "False", "is_correct": False}
        ]
    }
    with pytest.raises(ValidationError):
        QuestionCreate(**invalid_data)

# [Feature: Quiz Management] [Story: QQ-TEACHER-003] [Ticket: QQ-TEACHER-003-BE-T02]

def test_question_create_mc_validation_min_options():
    """MC questions must have at least 2 options."""
    invalid_data = {
        "type": QuestionType.MULTIPLE_CHOICE,
        "content": "MC test?",
        "options": [{"content": "Opt 1", "is_correct": True}]
    }
    with pytest.raises(ValidationError) as excinfo:
        QuestionCreate(**invalid_data)
    assert "between 2 and 6 options" in str(excinfo.value)

def test_question_create_mc_validation_max_options():
    """MC questions must have at most 6 options."""
    invalid_data = {
        "type": QuestionType.MULTIPLE_CHOICE,
        "content": "MC test?",
        "options": [{"content": f"Opt {i}", "is_correct": (i==0)} for i in range(7)]
    }
    with pytest.raises(ValidationError) as excinfo:
        QuestionCreate(**invalid_data)
    assert "between 2 and 6 options" in str(excinfo.value)

def test_question_create_mc_validation_exact_one_correct():
    """MC questions must have exactly one correct answer (requirement QQ-TEACHER-003)."""
    # 0 correct
    invalid_data = {
        "type": QuestionType.MULTIPLE_CHOICE,
        "content": "MC test?",
        "options": [
            {"content": "A", "is_correct": False},
            {"content": "B", "is_correct": False}
        ]
    }
    with pytest.raises(ValidationError):
        QuestionCreate(**invalid_data)

    # 2 correct
    invalid_data["options"] = [
        {"content": "A", "is_correct": True},
        {"content": "B", "is_correct": True}
    ]
    with pytest.raises(ValidationError):
        QuestionCreate(**invalid_data)
