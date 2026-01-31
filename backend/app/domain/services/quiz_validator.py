from typing import List
from app.infrastructure.models.quiz import Quiz, Question, Option

class QuizValidator:
    @staticmethod
    def validate_for_publish(quiz: Quiz) -> None:
        """
        Validates if a quiz is ready to be published.
        Raises ValueError if validation fails.
        """
        if not quiz.title:
            raise ValueError("Quiz must have a title.")
            
        if not quiz.questions or len(quiz.questions) == 0:
            raise ValueError("Quiz must have at least one question to be published.")
            
        for question in quiz.questions:
            QuizValidator._validate_question(question)
            
    @staticmethod
    def _validate_question(question: Question) -> None:
        if not question.options or len(question.options) == 0:
             raise ValueError(f"Question '{question.content}' must have options.")
             
        has_correct = any(opt.is_correct for opt in question.options)
        if not has_correct:
            raise ValueError(f"Question '{question.content}' must have at least one correct answer.")
