from fastapi import APIRouter
from pydantic import BaseModel

from rag.assignment_generator import (
    generate_assignment,
    get_all_assignments
)

router = APIRouter()

class AssignmentRequest(BaseModel):

    topic: str
    difficulty: str
    num_questions: int

@router.post("/generate-assignment")
async def create_assignment(
    request: AssignmentRequest
):
    
    try:

        assignment = generate_assignment(
            request.topic,
            request.difficulty,
            request.num_questions
        )

        return {

            "success": True,

            "data": assignment

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

            "Failed to generate assignment"

        }

@router.get("/assignments")
async def assignments():

    return {

        "success": True,

        "data":

        get_all_assignments()

    }