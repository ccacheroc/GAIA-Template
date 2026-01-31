from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.presentation.routers import quiz, auth
from app.infrastructure.models import user, quiz as quiz_model # Register models

# [Feature: Quiz Management] [Story: QQ-TEACHER-001] [Ticket: QQ-BUG-001]
app = FastAPI(title="Gaia Quiz App")

# Configure CORS
origins = [
    "http://localhost:5188",
    "http://127.0.0.1:5188",
    "http://0.0.0.0:5188",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(quiz.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
