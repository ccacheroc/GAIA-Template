from abc import ABC, abstractmethod
from typing import List
from app.domain.entities.task import Task

class TaskRepository(ABC):
    @abstractmethod
    def list_pending(self) -> List[Task]:
        """Returns a list of all pending tasks."""
        pass

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
