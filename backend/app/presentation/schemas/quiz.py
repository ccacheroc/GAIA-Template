
from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from enum import Enum
from app.presentation.schemas.question import QuestionResponse

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class QuizStatus(str, Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"

class QuizBase(BaseModel):
    title: str = Field(..., min_length=1, description="Title of the quiz")
    description: Optional[str] = Field(None, description="Optional description of the quiz")

class QuizCreate(QuizBase):
    pass

class QuizUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = None

class QuizResponse(QuizBase):
    id: UUID
    teacher_id: UUID
    status: QuizStatus
    created_at: datetime
    updated_at: datetime
    questions: List[QuestionResponse] = []
    
    model_config = ConfigDict(from_attributes=True)
