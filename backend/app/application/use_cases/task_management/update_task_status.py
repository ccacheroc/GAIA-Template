from datetime import datetime, timezone
from app.domain.repositories.task_repository import TaskRepository
from app.domain.entities.task import Task, TaskStatus

# [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-BE-T01]
class UpdateTaskStatusUseCase:
    def __init__(self, repository: TaskRepository):
        self.repository = repository

    def execute(self, task_id: str, new_status: TaskStatus) -> Task:
        task = self.repository.get_by_id(task_id)
        if not task:
            raise ValueError(f"Task with id {task_id} not found")

        task.status = new_status
        
        if new_status == TaskStatus.COMPLETADA:
            task.completed_at = datetime.now(timezone.utc)
        else:
            task.completed_at = None
            
        task.updated_at = datetime.now(timezone.utc)
        
        return self.repository.update(task)
