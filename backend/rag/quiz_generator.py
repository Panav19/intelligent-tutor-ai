from rag.retriever import get_retriever
from rag.llm import get_llm

from database.mongo import quiz_collection

from datetime import datetime

retriever = get_retriever()

llm = get_llm()

def generate_quiz(
    topic,
    difficulty,
    num_questions
):

    docs = retriever.invoke(topic)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an expert college examiner.

Generate a {difficulty} level multiple-choice quiz on:

Topic:
{topic}

Context:
{context}

Requirements:
- Generate exactly {num_questions} MCQs
- Each question must have 4 options
- Clearly indicate the correct answer
- Make questions suitable for college students

Format:

1. Question

A.
B.
C.
D.

Correct Answer:
"""

    quiz = llm.invoke(prompt)

    quiz_doc = {

        "topic": topic,

        "difficulty": difficulty,

        "num_questions": num_questions,

        "quiz": quiz,

        "created_at": datetime.utcnow()
    }

    quiz_collection.insert_one(
        quiz_doc
    )

    return quiz