
from uuid import UUID
from app.domain.repositories.quiz_repository import QuizRepository
from app.domain.repositories.question_repository import QuestionRepository
from app.infrastructure.models.quiz import Question, Option
from app.presentation.schemas.question import QuestionCreate

# [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-BE-T02]

class AddQuestion:
    def __init__(self, quiz_repo: QuizRepository, question_repo: QuestionRepository):
        self.quiz_repo = quiz_repo
        self.question_repo = question_repo

    async def execute(self, teacher_id: UUID, quiz_id: UUID, data: QuestionCreate) -> Question:
        # 1. BOLA Check: Verify ownership
        quiz = await self.quiz_repo.get_by_id(quiz_id)
        if not quiz or quiz.teacher_id != teacher_id:
            raise PermissionError("Teacher does not own this quiz or quiz not found.")

        # 2. Get next sequence
        next_seq = await self.question_repo.get_next_sequence(quiz_id)

        # 3. Create Model
        question = Question(
            quiz_id=quiz_id,
            type=data.type,
            content=data.content,
            sequence=next_seq,
            options=[
                Option(content=opt.content, is_correct=opt.is_correct)
                for opt in data.options
            ]
        )

        # 4. Save
        return await self.question_repo.add(question)
