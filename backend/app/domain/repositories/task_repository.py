from abc import ABC, abstractmethod
from typing import List
from app.domain.entities.task import Task

class TaskRepository(ABC):
    @abstractmethod
    def list_pending(self) -> List[Task]:
        """Returns a list of all pending tasks."""
        pass

    @abstractmethod
    def create(self, task: Task) -> Task:
        """Persists a new task."""
        pass

    @abstractmethod
    def get_by_id(self, task_id: str) -> Task | None:
        """Retrieves a task by its ID."""
        pass

    @abstractmethod
    def update(self, task: Task) -> Task:
        """Updates an existing task."""
        pass

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
    # [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-BE-T01]
