from rag.retriever import (
    get_vector_store
)
from rag.llm import get_llm

from database.mongo import assignment_collection

from datetime import datetime

vector_store = get_vector_store()

llm = get_llm()

def generate_assignment(
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

        print(f"Assignment Similarity Score: {score}")

        if score < 1.0:

            relevant_docs.append(doc)

    # NO RELEVANT CONTENT

    if len(relevant_docs) == 0:

        return {
            "error": "Topic not found in uploaded PDFs"
        }

    context = "\n\n".join(
        [doc.page_content for doc in relevant_docs]
    )

    prompt = f"""
You are an expert college faculty member.

Generate EXACTLY {num_questions} assignment questions ONLY from the provided context.

STRICT RULES:
- Generate EXACTLY {num_questions} questions
- Do NOT generate fewer questions
- Do NOT generate more questions
- Questions must be descriptive theory questions
- Do NOT generate MCQs
- Do NOT include answers
- Do NOT include explanations
- Do NOT include marks
- Do NOT include introductions
- Do NOT include conclusions
- Number all questions properly
- Questions must match {difficulty} difficulty level
- Questions must be suitable for college students

Topic:
{topic}

Context:
{context}

Required Format:

1. Question text

2. Question text

3. Question text
"""

    assignment = llm.invoke(prompt)

    assignment_doc = {
        "topic": topic,
        "difficulty": difficulty,
        "num_questions": num_questions,
        "assignment": assignment,
        "created_at": datetime.utcnow()
    }

    assignment_collection.insert_one(
        assignment_doc
    )

    return assignment

def get_all_assignments():

    assignments = list(
        assignment_collection.find(
            {},
            {"_id": 0}
        ).sort("created_at", -1)
    )

    return assignments