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

        print(
            f"Assignment Similarity Score: {score}"
        )

        # LOWER SCORE = BETTER MATCH

        if score < 1.0:

            relevant_docs.append(doc)

    # NO RELEVANT CONTENT

    if len(relevant_docs) == 0:
    
        raise ValueError(
            "Topic not found in uploaded PDFs"
        )

    context = "\n\n".join(
        [
            doc.page_content
            for doc in relevant_docs
        ]
    )

    # DIFFICULTY RULES

    if difficulty == "Easy":

        difficulty_instruction = """
        - Generate straightforward theory questions.
        - Focus on definitions and basic concepts.
        - Avoid analytical questions.
        """

    elif difficulty == "Medium":

        difficulty_instruction = """
        - Generate conceptual and application-oriented questions.
        - Include some analytical thinking.
        """

    else:  # Hard

        difficulty_instruction = """
        - Generate analytical and discussion-based questions.
        - Include comparisons between concepts.
        - Include evaluations and critical thinking.
        - Include problem-solving scenarios.
        - Avoid simple definition-based questions.
        """

    prompt = f"""
You are an expert college faculty member.

Generate EXACTLY {num_questions}
assignment questions ONLY from the
provided context.

STRICT RULES:

- Generate EXACTLY {num_questions} questions
- Output ONLY questions
- Do NOT generate answers
- Do NOT generate explanations
- Do NOT generate sample solutions
- Do NOT generate marks
- Do NOT generate MCQs
- Every question must test a DIFFERENT concept
- Do NOT repeat the same concept using different wording
- Cover as many subtopics from the context as possible

Difficulty Level:
{difficulty}

Difficulty Rules:
{difficulty_instruction}

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
        ).sort(
            "created_at",
            -1
        )
    )

    return assignments