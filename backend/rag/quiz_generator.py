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

Generate EXACTLY {num_questions} multiple-choice questions.

IMPORTANT:
- Use ONLY the provided context.
- Generate EXACTLY {num_questions} questions.
- Every question must contain:
  - Question
  - Four options (A, B, C, D)
  - Correct Answer
- Do NOT generate explanations.
- Do NOT generate introductory text.
- Do NOT generate concluding text.

Difficulty: {difficulty}

Topic:
{topic}

Context:
{context}

Output Format:

Question 1:
<question>

A. <option>
B. <option>
C. <option>
D. <option>

Correct Answer: A

Question 2:
...
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