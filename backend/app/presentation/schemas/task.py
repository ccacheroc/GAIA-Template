from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, ConfigDict
from app.domain.entities.task import TaskStatus, TaskPriority

class TaskOutput(BaseModel):
    id: UUID
    title: str
    description: Optional[str] = None
    status: TaskStatus
    priority: TaskPriority
    created_at: datetime
    updated_at: datetime
    completed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)

    # [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-BE-T02]
