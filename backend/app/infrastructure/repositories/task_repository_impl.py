from typing import List
from sqlalchemy.orm import Session
from app.domain.entities.task import Task, TaskStatus
from app.domain.repositories.task_repository import TaskRepository
from app.infrastructure.models.task import TaskModel
from app.infrastructure.db.mappers.task_mapper import TaskMapper

class SqlAlchemyTaskRepository(TaskRepository):
    def __init__(self, session: Session):
        self._session = session

    def list_pending(self) -> List[Task]:
        models = self._session.query(TaskModel).filter(
            TaskModel.status == TaskStatus.PENDIENTE
        ).all()
        return [TaskMapper.to_domain(m) for m in models]

    def create(self, task: Task) -> Task:
        """
        [Feature: Task Management] [Story: create-task] [Ticket: TM-USER-002-BE-T01]
        Persists a domain task to the database.
        """
        model = TaskMapper.to_model(task)
        self._session.add(model)
        self._session.commit()
        self._session.refresh(model)
        return TaskMapper.to_domain(model)

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
