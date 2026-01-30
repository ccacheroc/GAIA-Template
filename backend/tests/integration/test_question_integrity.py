
import pytest
from sqlalchemy import select
from app.infrastructure.models.quiz import Quiz, Question, Option, QuestionType
from app.core.deps import SIMPLE_TEACHER_ID

# [Feature: Quiz Management] [Story: QQ-TEACHER-003] [Ticket: QQ-TEACHER-003-DB-T01]

@pytest.mark.asyncio
async def test_db_allows_multiple_correct_answers_currently(db_session):
    """
    PROVE THE BAD STATE: Currently the DB allows multiple correct answers per question.
    We want to prevent this in T01.
    """
    quiz = Quiz(title="Integrity Test", teacher_id=SIMPLE_TEACHER_ID)
    db_session.add(quiz)
    await db_session.commit()
    await db_session.refresh(quiz)

    question = Question(
        quiz_id=quiz.id,
        type=QuestionType.MULTIPLE_CHOICE,
        content="Testing multiple correct?",
        sequence=1
    )
    db_session.add(question)
    await db_session.commit()
    await db_session.refresh(question)

    # Add two correct options - this should FAIL after our fix
    opt1 = Option(question_id=question.id, content="Correct 1", is_correct=True)
    opt2 = Option(question_id=question.id, content="Correct 2", is_correct=True)
    
    db_session.add_all([opt1, opt2])
    
    # This should FAIL with IntegrityError
    with pytest.raises(Exception) as excinfo: # Using Exception generally because SQLAlchemy wraps it
        await db_session.commit()
    
    assert "ix_one_correct_option_per_question" in str(excinfo.value)
