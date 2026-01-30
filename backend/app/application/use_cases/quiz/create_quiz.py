
from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository
from app.presentation.schemas.quiz import QuizCreate
from app.infrastructure.models.quiz import Quiz, QuizStatus

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class CreateQuiz:
    def __init__(self, repository: QuizRepository):
        self.repository = repository

    async def execute(self, teacher_id: UUID, dto: QuizCreate) -> Quiz:
        quiz = Quiz(
            teacher_id=teacher_id,
            title=dto.title,
            description=dto.description,
            status=QuizStatus.DRAFT
        )
        return await self.repository.create(quiz)
