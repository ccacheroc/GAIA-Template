from typing import List
from app.domain.entities.task import Task
from app.domain.repositories.task_repository import TaskRepository

class ListTasksUseCase:
    def __init__(self, repository: TaskRepository):
        self._repository = repository

    def execute(self) -> List[Task]:
        return self._repository.list_pending()

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
