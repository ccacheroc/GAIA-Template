from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.infrastructure.models.task import Base # We might need a common session getter
from app.infrastructure.repositories.task_repository_impl import SqlAlchemyTaskRepository
from app.application.use_cases.task_management.list_tasks import ListTasksUseCase
from app.application.use_cases.task_management.create_task import CreateTaskUseCase
from app.presentation.schemas.task import TaskOutput, TaskCreate

from app.infrastructure.db.session import get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskOutput])
def list_tasks(db: Session = Depends(get_db)):
    repository = SqlAlchemyTaskRepository(db)
    use_case = ListTasksUseCase(repository)
    return use_case.execute()

@router.post("/", response_model=TaskOutput, status_code=201)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    """
    [Feature: Task Management] [Story: create-task] [Ticket: TM-USER-002-BE-T01]
    Creates a new task.
    """
    repository = SqlAlchemyTaskRepository(db)
    use_case = CreateTaskUseCase(repository)
    return use_case.execute(
        title=task_in.title,
        description=task_in.description,
        priority=task_in.priority
    )

# [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
