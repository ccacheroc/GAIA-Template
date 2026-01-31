from uuid import UUID
from app.domain.repositories.question_repository import QuestionRepository
from app.domain.repositories.quiz_repository import QuizRepository

# [Feature: Quiz Management] [Story: QQ-BUG-001] [Ticket: QQ-BUG-001-BE-T01]

class DeleteQuestion:
    def __init__(self, quiz_repo: QuizRepository, question_repo: QuestionRepository):
        self.quiz_repo = quiz_repo
        self.question_repo = question_repo

    async def execute(self, current_user_id: UUID, question_id: UUID) -> bool:
        question = await self.question_repo.get_by_id(question_id)
        if not question:
            return False
            
        # BOLA Check: Check if current user owns the quiz this question belongs to
        quiz = await self.quiz_repo.get_by_id(question.quiz_id)
        if not quiz or quiz.owner_id != current_user_id:
            raise PermissionError("Not authorized to delete this question")
            
        return await self.question_repo.delete(question_id)
