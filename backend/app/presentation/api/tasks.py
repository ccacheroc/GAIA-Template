from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.infrastructure.models.task import Base # We might need a common session getter
from app.infrastructure.repositories.task_repository_impl import SqlAlchemyTaskRepository
from app.application.use_cases.task_management.list_tasks import ListTasksUseCase
from app.presentation.schemas.task import TaskOutput

# Placeholder for DB session dependency
# In a real app, this would be in app/infrastructure/db/session.py or similar
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

def get_db():
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "password")
    server = os.getenv("POSTGRES_SERVER", "localhost")
    db_name = os.getenv("POSTGRES_DB", "gaia_db")
    SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{server}/{db_name}"
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=List[TaskOutput])
def list_tasks(db: Session = Depends(get_db)):
    repository = SqlAlchemyTaskRepository(db)
    use_case = ListTasksUseCase(repository)
    return use_case.execute()

# [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
