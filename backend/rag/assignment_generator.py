from rag.retriever import get_retriever
from rag.llm import get_llm

from database.mongo import assignment_collection

from datetime import datetime

retriever = get_retriever()

llm = get_llm()

def generate_assignment(
    topic,
    difficulty,
    num_questions
):

    docs = retriever.invoke(topic)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an expert college faculty member.

Generate a {difficulty} level assignment on:

Topic:
{topic}

Use the provided context.

Context:
{context}

Requirements:
- Generate exactly {num_questions} questions
- Questions should be educational
- Include conceptual and analytical questions
- Number all questions properly
- Make questions suitable for college students
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