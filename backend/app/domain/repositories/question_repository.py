
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
