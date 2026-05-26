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

    assignment = generate_assignment(
        request.topic,
        request.difficulty,
        request.num_questions
    )

    return {
        "assignment": assignment
    }

@router.get("/assignments")
async def assignments():

    return {
        "assignments": get_all_assignments()
    }