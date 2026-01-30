import pytest
import uuid
from sqlalchemy import select
from app.infrastructure.models.quiz import Quiz, Question, Option, QuestionType

from app.core.deps import SIMPLE_TEACHER_ID

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-DB-T01]
@pytest.mark.asyncio
async def test_question_persistence(db_session):
    """
    Verify that we can save a Quiz with Questions and Options.
    """
    quiz = Quiz(
        title="Test Quiz with Questions",
        teacher_id=SIMPLE_TEACHER_ID,
    )
    
    question = Question(
        type=QuestionType.TF,
        content="Is the sky blue?",
        sequence=1,
        quiz=quiz
    )
    
    option_true = Option(content="True", is_correct=True, question=question)
    option_false = Option(content="False", is_correct=False, question=question)
    
    db_session.add(quiz)
    await db_session.commit()
    
    # Verify persistence
    result = await db_session.execute(
        select(Quiz).where(Quiz.id == quiz.id)
    )
    persisted_quiz = result.scalar_one()
    
    assert len(persisted_quiz.questions) == 1
    assert persisted_quiz.questions[0].content == "Is the sky blue?"
    assert len(persisted_quiz.questions[0].options) == 2
