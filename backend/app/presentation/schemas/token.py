from pydantic import BaseModel

# [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-BE-T01]

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
