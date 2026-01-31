from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository

# [Feature: User Authentication] [Story: AUTH-TEACHER-003] [Ticket: AUTH-TEACHER-003-BE-T02]

class DeleteQuiz:
    def __init__(self, repository: QuizRepository):
        self.repository = repository

    async def execute(self, quiz_id: UUID, current_user_id: UUID) -> bool:
        quiz = await self.repository.get_by_id(quiz_id)
        if not quiz:
            return False
        
        if quiz.owner_id != current_user_id:
            raise PermissionError("Not authorized to delete this quiz")
            
        await self.repository.delete(quiz_id)
        return True
