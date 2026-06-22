from fastapi import APIRouter

from pydantic import BaseModel

from rag.assessment_generator import (

    save_assessment,

    get_all_assessments

)

router = APIRouter()


class AssessmentRequest(

    BaseModel

):

    topic: str

    difficulty: str

    score: int

    total: int


@router.post(
    "/save-assessment"
)
async def create_assessment(

    request:

    AssessmentRequest

):

    save_assessment(

        request.topic,

        request.difficulty,

        request.score,

        request.total

    )

    return {

        "success": True,

        "data": "Assessment saved"

    }


@router.get(
    "/assessments"
)
async def assessments():

    return {

        "success": True,

        "data":

        get_all_assessments()

    }