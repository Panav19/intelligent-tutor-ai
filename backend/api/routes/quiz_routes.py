from fastapi import APIRouter
from pydantic import BaseModel

from rag.quiz_generator import (
    generate_quiz
)

router = APIRouter()

class QuizRequest(BaseModel):

    topic: str
    difficulty: str
    num_questions: int

@router.post("/generate-quiz")
async def create_quiz(
    request: QuizRequest
):

    quiz = generate_quiz(
        request.topic,
        request.difficulty,
        request.num_questions
    )

    return {
        "quiz": quiz
    }