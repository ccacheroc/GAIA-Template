
from typing import Optional
from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class GetQuiz:
    def __init__(self, repository: QuizRepository):
        self.repository = repository

    async def execute(self, quiz_id: UUID) -> Optional[Quiz]:
        return await self.repository.get_by_id(quiz_id)
