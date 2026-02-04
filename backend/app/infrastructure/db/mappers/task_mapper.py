from app.domain.entities.task import Task, TaskStatus, TaskPriority
from app.infrastructure.models.task import TaskModel

class TaskMapper:
    @staticmethod
    def to_domain(model: TaskModel) -> Task:
        return Task(
            id=model.id,
            title=model.title,
            description=model.description,
            status=TaskStatus(model.status.value),
            priority=TaskPriority(model.priority.value),
            created_at=model.created_at,
            updated_at=model.updated_at,
            completed_at=model.completed_at
        )

    # Note: we can add to_model if needed for writes later
    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
