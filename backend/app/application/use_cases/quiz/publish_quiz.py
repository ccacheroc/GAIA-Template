from uuid import UUID
from fastapi import HTTPException
from app.domain.repositories.quiz_repository import QuizRepository
from app.infrastructure.models.quiz import Quiz, QuizStatus
from app.domain.services.quiz_validator import QuizValidator

class PublishQuiz:
    def __init__(self, quiz_repository: QuizRepository):
        self.quiz_repository = quiz_repository

    async def execute(self, quiz_id: UUID, teacher_id: UUID) -> Quiz:
        quiz = await self.quiz_repository.get_by_id(quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        
        if quiz.teacher_id != teacher_id:
             raise HTTPException(status_code=403, detail="Not authorized to modify this quiz")
             
        # Validate using domain service
        try:
             QuizValidator.validate_for_publish(quiz)
        except ValueError as e:
             raise HTTPException(status_code=400, detail=str(e))
             
        # State transition
        if quiz.status == QuizStatus.PUBLISHED:
            # Already published, acts as idempotent or error depending on requirement.
            # Usually strict state machine would prevent this, but here IDEMPOTENCY is nice.
            return quiz
        
        quiz.status = QuizStatus.PUBLISHED
        updated_quiz = await self.quiz_repository.update(quiz)
        return updated_quiz
