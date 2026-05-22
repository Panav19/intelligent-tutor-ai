from fastapi import APIRouter
from pydantic import BaseModel

from rag.qa_chain import ask_question
from rag.memory import get_chat_history

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str
    session_id: str

@router.post("/ask")
async def ask(request: QuestionRequest):

    response = ask_question(
        request.question,
        request.session_id
    )

    return response

@router.get("/chat-history/{session_id}")
async def chat_history(session_id: str):

    history = get_chat_history(session_id)

    return {
        "messages": history
    }