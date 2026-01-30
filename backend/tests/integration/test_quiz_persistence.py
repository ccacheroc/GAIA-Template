
import pytest
from sqlalchemy import text
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-DB-T01]

@pytest.mark.asyncio
async def test_quiz_table_exists(db_session):
    """
    Verifies that the quizzes table has been created in the database.
    This serves as an integration test for the Alembic migration.
    """
    try:
        # Try to select from the table. 
        # If table doesn't exist, this throws a ProgrammingError (UndefinedTable)
        result = await db_session.execute(text("SELECT count(*) FROM quizzes"))
        assert result is not None
    except Exception as e:
        error_msg = str(e)
        if "does not exist" in error_msg and "quizzes" in error_msg:
             pytest.fail(f"Migration verification failed: Table 'quizzes' not found in database. Error: {e}")
        else:
             # If it fails for other reasons (auth, connection), let it raise
             raise e
