from rag.retriever import (
    get_vector_store
)
from rag.llm import get_llm

from database.mongo import quiz_collection

from datetime import datetime

vector_store = get_vector_store()

llm = get_llm()

def generate_quiz(
    topic,
    difficulty,
    num_questions
):

    results = vector_store.similarity_search_with_score(
        topic,
        k=8
    )

    relevant_docs = []

    for doc, score in results:

        print(f"Similarity Score: {score}")

        # LOWER SCORE = BETTER MATCH

        if score < 1.0:

            relevant_docs.append(doc)

    # NO RELEVANT CONTENT FOUND

    if len(relevant_docs) == 0:

        return {
            "error": "Topic not found in uploaded PDFs"
        }

    context = "\n\n".join(
        [doc.page_content for doc in relevant_docs]
    )

    prompt = f"""
You are an expert college examiner.

Generate EXACTLY {num_questions} multiple-choice questions (MCQs) ONLY from the provided context.

STRICT RULES:
- Generate EXACTLY {num_questions} questions
- Do NOT generate fewer questions
- Do NOT generate more questions
- Every question MUST contain:
    - Question statement
    - 4 options (A, B, C, D)
    - Correct answer
- Do NOT include explanations
- Do NOT include introductions
- Do NOT include conclusions
- Output ONLY the quiz

Topic:
{topic}

Context:
{context}

Required Format:

1. Question text

A. Option
B. Option
C. Option
D. Option

Correct Answer: A

2. Question text

A. Option
B. Option
C. Option
D. Option

Correct Answer: B
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