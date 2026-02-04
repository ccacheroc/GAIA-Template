import pytest
from unittest.mock import MagicMock
from app.application.use_cases.task_management.create_task import CreateTaskUseCase
from app.domain.entities.task import TaskPriority, TaskStatus

def test_create_task_use_case_success():
    # Arrange
    mock_repo = MagicMock()
    use_case = CreateTaskUseCase(mock_repo)
    
    title = "New Task"
    description = "Some description"
    priority = TaskPriority.alta
    
    # Mock repo.create to return a task with an ID
    def side_effect(task):
        task.id = 1
        return task
    mock_repo.create.side_effect = side_effect
    
    # Act
    result = use_case.execute(title, description, priority)
    
    # Assert
    assert result.id == 1
    assert result.title == title
    assert result.description == description
    assert result.priority == priority
    assert result.status == TaskStatus.pendiente
    mock_repo.create.assert_called_once()
