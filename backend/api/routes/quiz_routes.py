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
    
    try:

        quiz = generate_quiz(
            request.topic,
            request.difficulty,
            request.num_questions
        )

        return {

            "success": True,

            "data": quiz

        }
    
    except ValueError as e:

        return {

            "success": False,

            "message": str(e)

        }
    
    except Exception:

        return {

            "success": False,

            "message":

            "Failed to generate quiz"

        }