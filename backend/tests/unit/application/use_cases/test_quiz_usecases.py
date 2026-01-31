
import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from datetime import datetime
from app.infrastructure.models.quiz import Quiz, QuizStatus
from app.presentation.schemas.quiz import QuizCreate, QuizUpdate
from app.application.use_cases.quiz.create_quiz import CreateQuiz
from app.application.use_cases.quiz.get_quiz import GetQuiz
from app.application.use_cases.quiz.update_quiz import UpdateQuiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

@pytest.fixture
def mock_repository():
    return AsyncMock()

@pytest.mark.asyncio
async def test_create_quiz_use_case(mock_repository):
    owner_id = uuid4()
    dto = QuizCreate(title="New Quiz", description="Desc")
    
    # Setup mock behavior
    mock_repository.create.side_effect = lambda q: q # Return the object passed
    
    use_case = CreateQuiz(mock_repository)
    result = await use_case.execute(owner_id, dto)
    
    assert result.title == "New Quiz"
    assert result.owner_id == owner_id
    assert result.status == QuizStatus.DRAFT
    mock_repository.create.assert_called_once()

@pytest.mark.asyncio
async def test_get_quiz_use_case_found(mock_repository):
    quiz_id = uuid4()
    expected_quiz = Quiz(id=quiz_id, title="Found Me")
    mock_repository.get_by_id.return_value = expected_quiz
    
    use_case = GetQuiz(mock_repository)
    result = await use_case.execute(quiz_id)
    
    assert result == expected_quiz
    mock_repository.get_by_id.assert_called_with(quiz_id)

@pytest.mark.asyncio
async def test_get_quiz_use_case_not_found(mock_repository):
    mock_repository.get_by_id.return_value = None
    use_case = GetQuiz(mock_repository)
    result = await use_case.execute(uuid4())
    assert result is None

@pytest.mark.asyncio
async def test_update_quiz_use_case_success(mock_repository):
    quiz_id = uuid4()
    existing_quiz = Quiz(id=quiz_id, title="Old Title", description="Old Desc")
    mock_repository.get_by_id.return_value = existing_quiz
    
    # behavior: update method returns the updated object
    mock_repository.update.side_effect = lambda q: q
    
    update_dto = QuizUpdate(title="New Title")
    use_case = UpdateQuiz(mock_repository)
    
    result = await use_case.execute(quiz_id, update_dto)
    
    assert result.title == "New Title"
    assert result.description == "Old Desc" # Should allow partial update strategy or explicit none? 
    # Schema says: description: Optional[str] = None. 
    # If None is passed, does it mean "unset" or "ignore"? 
    # Usually "ignore" if it's separate DTO. 
    # Let's assume standard Pydantic exclude_unset behavior in implementation.
    
    mock_repository.update.assert_called_once()
