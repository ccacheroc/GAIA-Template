from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GAIA Tasks API",
    description="API for Task Management feature",
    version="0.1.0",
)

# [Feature: Task Management] [Story: TM-USER-001] [Ticket: NONE]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
