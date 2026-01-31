
from fastapi import APIRouter, Depends, HTTPException, status
from uuid import UUID
from app.presentation.schemas.quiz import QuizCreate, QuizUpdate, QuizResponse
from app.application.use_cases.quiz.create_quiz import CreateQuiz
from app.application.use_cases.quiz.get_quiz import GetQuiz
from app.application.use_cases.quiz.update_quiz import UpdateQuiz
from app.application.use_cases.quiz.list_quizzes import ListQuizzes
from app.domain.repositories.quiz_repository import QuizRepository
from app.presentation.schemas.question import QuestionCreate, QuestionResponse, QuestionReorderRequest
from app.application.use_cases.question.add_question import AddQuestion
from app.application.use_cases.question.reorder_questions import ReorderQuestionsUseCase
from app.domain.repositories.question_repository import QuestionRepository
from app.core.deps import get_current_user, get_quiz_repository, get_question_repository, get_reorder_questions_use_case

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-BUG-002]

router = APIRouter(prefix="/quizzes", tags=["Quizzes"])

@router.get("", response_model=list[QuizResponse])
async def list_quizzes(
    current_user_id: UUID = Depends(get_current_user),
    repo: QuizRepository = Depends(get_quiz_repository)
):
    use_case = ListQuizzes(repo)
    return await use_case.execute(current_user_id)

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
    # BOLA Check
    if quiz.owner_id != current_user_id:
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
    
    if existing.owner_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update this quiz")

    use_case = UpdateQuiz(repo)
    updated = await use_case.execute(quiz_id, dto)
    return updated

@router.post("/{quiz_id}/questions", response_model=QuestionResponse, status_code=status.HTTP_201_CREATED)
async def add_question(
    quiz_id: UUID,
    dto: QuestionCreate,
    current_user_id: UUID = Depends(get_current_user),
    quiz_repo: QuizRepository = Depends(get_quiz_repository),
    question_repo: QuestionRepository = Depends(get_question_repository)
):
    use_case = AddQuestion(quiz_repo, question_repo)
    try:
        return await use_case.execute(current_user_id, quiz_id, dto)
    except PermissionError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-BE-T01]
@router.patch("/{quiz_id}/reorder", status_code=status.HTTP_204_NO_CONTENT)
async def reorder_questions(
    quiz_id: UUID,
    dto: QuestionReorderRequest,
    current_user_id: UUID = Depends(get_current_user),
    use_case: ReorderQuestionsUseCase = Depends(get_reorder_questions_use_case)
):
    reorder_items = [(item.id, item.sequence) for item in dto.items]
    await use_case.execute(current_user_id, quiz_id, reorder_items)

# [Feature: Quiz Management] [Story: QQ-TEACHER-005] [Ticket: QQ-TEACHER-005-BE-T01]
from app.application.use_cases.quiz.publish_quiz import PublishQuiz

@router.post("/{quiz_id}/publish", response_model=QuizResponse)
async def publish_quiz(
    quiz_id: UUID,
    current_user_id: UUID = Depends(get_current_user),
    repo: QuizRepository = Depends(get_quiz_repository)
):
    use_case = PublishQuiz(repo)
    return await use_case.execute(quiz_id, current_user_id)
