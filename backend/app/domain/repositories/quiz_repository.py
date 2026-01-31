
from typing import Protocol, Optional
from uuid import UUID
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class QuizRepository(Protocol):
    async def create(self, quiz: Quiz) -> Quiz:
        """Persist a new quiz"""
        ...
    
    async def get_by_id(self, quiz_id: UUID) -> Optional[Quiz]:
        """Retrieve a quiz by ID"""
        ...
    
    async def update(self, quiz: Quiz) -> Quiz:
        """Update an existing quiz"""
        ...
    
    async def list_by_owner(self, owner_id: UUID) -> list[Quiz]:
        """List all quizzes for an owner"""
        ...
    async def delete(self, quiz_id: UUID) -> bool:
        """Delete a quiz by ID"""
        ...
