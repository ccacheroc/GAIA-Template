import pytest
from unittest.mock import Mock
from datetime import datetime, timezone
from app.domain.entities.task import Task, TaskStatus, TaskPriority
from app.application.use_cases.task_management.update_task_status import UpdateTaskStatusUseCase

def test_update_task_to_completed():
    # Arrange
    mock_repo = Mock()
    task_id = "123"
    now = datetime.now(timezone.utc)
    existing_task = Task(
        id=task_id, 
        title="Test Task", 
        description=None,
        status=TaskStatus.PENDIENTE,
        priority=TaskPriority.MEDIA,
        created_at=now,
        updated_at=now
    )
    mock_repo.get_by_id.return_value = existing_task
    mock_repo.update.side_effect = lambda t: t
    
    use_case = UpdateTaskStatusUseCase(mock_repo)
    
    # Act
    updated_task = use_case.execute(task_id, TaskStatus.COMPLETADA)
    
    # Assert
    assert updated_task.status == TaskStatus.COMPLETADA
    assert updated_task.completed_at is not None
    assert isinstance(updated_task.completed_at, datetime)
    mock_repo.get_by_id.assert_called_once_with(task_id)
    mock_repo.update.assert_called_once()

def test_update_task_to_pending():
    # Arrange
    mock_repo = Mock()
    task_id = "123"
    now = datetime.now(timezone.utc)
    existing_task = Task(
        id=task_id, 
        title="Test Task", 
        description=None,
        status=TaskStatus.COMPLETADA, 
        priority=TaskPriority.MEDIA,
        created_at=now,
        updated_at=now,
        completed_at=now
    )
    mock_repo.get_by_id.return_value = existing_task
    mock_repo.update.side_effect = lambda t: t
    
    use_case = UpdateTaskStatusUseCase(mock_repo)
    
    # Act
    updated_task = use_case.execute(task_id, TaskStatus.PENDIENTE)
    
    # Assert
    assert updated_task.status == TaskStatus.PENDIENTE
    assert updated_task.completed_at is None
    mock_repo.update.assert_called_once()

def test_update_task_not_found():
    # Arrange
    mock_repo = Mock()
    mock_repo.get_by_id.return_value = None
    use_case = UpdateTaskStatusUseCase(mock_repo)
    
    # Act & Assert
    with pytest.raises(ValueError, match="Task with id 123 not found"):
        use_case.execute("123", TaskStatus.COMPLETADA)
