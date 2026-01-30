
from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
from app.presentation.schemas.quiz import QuizCreate, QuizUpdate, QuizResponse
from app.application.use_cases.quiz.create_quiz import CreateQuiz
from app.application.use_cases.quiz.get_quiz import GetQuiz
from app.application.use_cases.quiz.update_quiz import UpdateQuiz
from app.domain.repositories.quiz_repository import QuizRepository
from app.core.deps import get_current_user, get_quiz_repository

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

@router.post("", response_model=QuizResponse, status_code=status.HTTP_201_CREATED)
async def create_quiz(
    dto: QuizCreate,
    current_user_id: UUID = Depends(get_current_user),
    repo: QuizRepository = Depends(get_quiz_repository)
):
    use_case = CreateQuiz(repo)
    return await use_case.execute(current_user_id, dto)

@router.get("/{quiz_id}", response_model=QuizResponse)
async def get_quiz(
    quiz_id: UUID,
    current_user_id: UUID = Depends(get_current_user),
    repo: QuizRepository = Depends(get_quiz_repository)
):
    use_case = GetQuiz(repo)
    quiz = await use_case.execute(quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    # BOLA Check
    if quiz.teacher_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to access this quiz")
        
    return quiz

@router.put("/{quiz_id}", response_model=QuizResponse)
async def update_quiz(
    quiz_id: UUID,
    dto: QuizUpdate,
    current_user_id: UUID = Depends(get_current_user),
    repo: QuizRepository = Depends(get_quiz_repository)
):
    # Check existence and ownership
    getter = GetQuiz(repo)
    existing = await getter.execute(quiz_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    if existing.teacher_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this quiz")

    use_case = UpdateQuiz(repo)
    updated = await use_case.execute(quiz_id, dto)
    return updated
