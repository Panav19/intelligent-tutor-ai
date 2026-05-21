from fastapi import APIRouter
from pydantic import BaseModel

from rag.qa_chain import ask_question

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str

@router.post("/ask")
async def ask(request: QuestionRequest):

    response = ask_question(request.question)

    return response