from typing import Optional
from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository
from app.presentation.schemas.quiz import QuizUpdate
from app.infrastructure.models.quiz import Quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

class UpdateQuiz:
    def __init__(self, repository: QuizRepository):
        self.repository = repository

    async def execute(self, quiz_id: UUID, current_user_id: UUID, dto: QuizUpdate) -> Optional[Quiz]:
        quiz = await self.repository.get_by_id(quiz_id)
        if not quiz:
            return None
        
        # [Feature: User Authentication] [Story: AUTH-TEACHER-003] [Ticket: AUTH-TEACHER-003-BE-T02]
        if quiz.owner_id != current_user_id:
            raise PermissionError("Not authorized to update this quiz")
        
        if dto.title is not None:
            quiz.title = dto.title
        if dto.description is not None:
            quiz.description = dto.description
            
        return await self.repository.update(quiz)

