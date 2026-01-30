from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-BUG-002]

class ListQuizzes:
    def __init__(self, repo: QuizRepository):
        self.repo = repo

    async def execute(self, teacher_id: UUID) -> list[Quiz]:
        return await self.repo.list_by_teacher(teacher_id)
