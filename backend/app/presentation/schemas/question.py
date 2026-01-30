
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator
from typing import Optional, List
from uuid import UUID
from app.infrastructure.models.quiz import QuestionType

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

class OptionBase(BaseModel):
    content: str = Field(..., min_length=1)
    is_correct: bool = False

class OptionCreate(OptionBase):
    pass

class OptionResponse(OptionBase):
    id: UUID
    model_config = ConfigDict(from_attributes=True)

class QuestionBase(BaseModel):
    content: str = Field(..., min_length=1)
    type: QuestionType

class QuestionCreate(QuestionBase):
    options: List[OptionCreate]

    @model_validator(mode="after")
    def validate_options(self) -> 'QuestionCreate':
        correct_count = sum(1 for opt in self.options if opt.is_correct)

        if self.type == QuestionType.TF:
            if len(self.options) != 2:
                raise ValueError("True/False questions must have exactly 2 options.")
            if correct_count != 1:
                raise ValueError("True/False questions must have exactly one correct answer.")
        
        elif self.type == QuestionType.MULTIPLE_CHOICE:
            if not (2 <= len(self.options) <= 6):
                raise ValueError("Multiple Choice questions must have between 2 and 6 options.")
            if correct_count != 1:
                raise ValueError("Multiple Choice questions must have exactly one correct answer.")
        
        return self

class QuestionResponse(QuestionBase):
    id: UUID
    quiz_id: UUID
    sequence: int
    options: List[OptionResponse]
    model_config = ConfigDict(from_attributes=True)
