
from typing import Protocol, Optional, List
from uuid import UUID
from app.infrastructure.models.quiz import Question

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

class QuestionRepository(Protocol):
    async def add(self, question: Question) -> Question:
        """Add a new question with its options."""
        ...

    async def get_next_sequence(self, quiz_id: UUID) -> int:
        """Calculate the next sequence for a question in a quiz."""
        ...

    # [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-BE-T01]
    async def get_by_quiz_id(self, quiz_id: UUID) -> List[Question]:
        """Get all questions for a specific quiz."""
        ...

    async def get_by_id(self, question_id: UUID) -> Optional[Question]:
        """Get a specific question by ID."""
        ...

    async def delete(self, question_id: UUID) -> bool:
        """Delete a specific question."""
        ...

