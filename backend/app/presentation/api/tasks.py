from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infrastructure.repositories.task_repository_impl import SqlAlchemyTaskRepository
from app.application.use_cases.task_management.list_tasks import ListTasksUseCase
from app.application.use_cases.task_management.create_task import CreateTaskUseCase
from app.application.use_cases.task_management.update_task_status import UpdateTaskStatusUseCase
from app.presentation.schemas.task import TaskOutput, TaskCreate, TaskUpdate
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

@router.patch("/{task_id}", response_model=TaskOutput)
def update_task_status(task_id: str, task_in: TaskUpdate, db: Session = Depends(get_db)):
    """
    [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-BE-T01]
    Updates a task's status.
    """
    if task_in.status is None:
        raise HTTPException(status_code=400, detail="Status is required for this operation")
        
    repository = SqlAlchemyTaskRepository(db)
    use_case = UpdateTaskStatusUseCase(repository)
    try:
        return use_case.execute(task_id, task_in.status)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

# [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
# [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-BE-T01]
