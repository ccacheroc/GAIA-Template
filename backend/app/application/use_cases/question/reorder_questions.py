from uuid import UUID
from typing import List, Tuple
from app.domain.repositories.question_repository import QuestionRepository
from app.domain.repositories.quiz_repository import QuizRepository
from fastapi import HTTPException

# [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-BE-T01]

class ReorderQuestionsUseCase:
    def __init__(self, question_repo: QuestionRepository, quiz_repo: QuizRepository):
        self.question_repo = question_repo
        self.quiz_repo = quiz_repo

    async def execute(self, owner_id: UUID, quiz_id: UUID, reorder_items: List[Tuple[UUID, int]]) -> None:
        # 1. Ownership & Existence Check
        quiz = await self.quiz_repo.get_by_id(quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        if quiz.owner_id != owner_id:
            raise HTTPException(status_code=403, detail="Not authorized to edit this quiz")

        # 2. Validation: Ensure all question IDs belong to the quiz
        existing_questions = await self.question_repo.get_by_quiz_id(quiz_id)
        existing_ids = {q.id for q in existing_questions}
        
        reorder_ids = {item[0] for item in reorder_items}
        
        if not reorder_ids.issubset(existing_ids):
            raise HTTPException(
                status_code=400, 
                detail="One or more question IDs do not belong to this quiz"
            )

        # 3. Batch Update
        await self.question_repo.update_all_sequences(quiz_id, reorder_items)
