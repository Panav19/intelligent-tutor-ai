from rag.retriever import get_retriever
from rag.llm import get_llm
from utils.logger import logger

from rag.memory import (
    save_message,
    get_chat_history
)

retriever = get_retriever()

llm = get_llm()

def ask_question(question, session_id):

    logger.info(
        f"Question received: {question}"
    )

    # LOAD CHAT HISTORY

    history = get_chat_history(session_id)

    # FOLLOW-UP QUESTION DETECTION

    follow_up_phrases = [
        "explain more",
        "give more details",
        "give me a detailed answer",
        "elaborate",
        "continue",
        "tell me more",
        "examples"
    ]

    enhanced_question = question

    if any(
        phrase in question.lower()
        for phrase in follow_up_phrases
    ):

        # GET LAST USER QUESTION

        previous_user_questions = [
            msg["message"]
            for msg in history
            if msg["role"] == "user"
        ]

        if len(previous_user_questions) > 0:

            last_question = previous_user_questions[-1]

            enhanced_question = (
                f"{question} about {last_question}"
            )

    # BUILD CONVERSATION CONTEXT

    conversation_context = ""

    # USE LAST 4 MESSAGES ONLY

    recent_history = history[-2:]

    for message in recent_history:

        conversation_context += (
            f"{message['role']}: "
            f"{message['message']}\n"
        )

    # RETRIEVE DOCUMENTS

    docs = retriever.invoke(
        enhanced_question
    )

    logger.info(
        f"Retrieved {len(docs)} chunks"
    )

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    # FINAL PROMPT

    prompt = f"""
You are an intelligent tutor.

Use the conversation history for continuity.

Answer the question primarily using the provided context.

You may slightly elaborate for educational clarity,
but do not invent unrelated information.

If the answer is not present in the context,
say:
"I could not find relevant information in the uploaded material."

Conversation History:
{conversation_context}

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(prompt)

    logger.info(
        "Answer generated successfully"
    )

    # SAVE USER MESSAGE

    save_message(
        session_id,
        "user",
        question
    )

    # SAVE AI RESPONSE

    save_message(
        session_id,
        "assistant",
        response
    )

    return {
        "answer": response,
        "retrieved_chunks": len(docs)
    }