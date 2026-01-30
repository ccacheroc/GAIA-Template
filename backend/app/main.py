
from fastapi import FastAPI
from app.presentation.routers import quiz

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-TEACHER-001-BE-T02]
app = FastAPI(title="Gaia Quiz App")

app.include_router(quiz.router)
