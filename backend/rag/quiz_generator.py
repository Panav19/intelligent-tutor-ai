from rag.retriever import (
    get_vector_store
)
from rag.llm import get_llm

from database.mongo import quiz_collection

from datetime import datetime

from utils.logger import logger

vector_store = get_vector_store()

llm = get_llm()

def generate_quiz(
    topic,
    difficulty,
    num_questions
):

    results = vector_store.similarity_search_with_score(
        topic,
        k=5
    )

    relevant_docs = []

    for doc, score in results:

        logger.info(
            f"Quiz retrieval similarity score: {score:.4f}"
        )

        # LOWER SCORE = BETTER MATCH

        if score < 1.0:

            relevant_docs.append(doc)

    # NO RELEVANT CONTENT FOUND

    if len(relevant_docs) == 0:

        logger.error(
            f"No relevant documents found for topic '{topic}'"
        )
    
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
        - Focus on definitions, terminology,
          and basic concepts.
        - Ask direct factual questions.
        - Avoid analytical or scenario-based questions.
        """

    elif difficulty == "Medium":

        difficulty_instruction = """
        - Focus on conceptual understanding.
        - Include application-based questions.
        - Test relationships between concepts.
        """

    else:  # Hard

        difficulty_instruction = """
        - Focus on analytical reasoning.
        - Include scenario-based questions.
        - Include comparisons between concepts.
        - Include problem-solving questions.
        - Require deeper conceptual reasoning.
        - Avoid simple definition-based questions.
        """

    prompt = f"""
You are an expert college examiner.

Generate EXACTLY {num_questions}
multiple-choice questions.

IMPORTANT:

- Use ONLY the provided context.
- Generate EXACTLY {num_questions} questions.
- Every question must test a DIFFERENT concept.
- Do NOT repeat the same concept using different wording.
- Cover as many subtopics from the context as possible.
- Questions must be unique and non-redundant.
- Avoid duplicate questions.
- Avoid duplicate correct answers whenever possible.

Difficulty Level:
{difficulty}

Difficulty Rules:
{difficulty_instruction}

Every question must contain:

- Question
- Four options (A, B, C, D)
- Correct Answer

Do NOT generate explanations.
Do NOT generate introductory text.
Do NOT generate concluding text.

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
<question>

A. <option>
B. <option>
C. <option>
D. <option>

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

    logger.info(
        f"Quiz generated successfully for topic '{topic}'"
    )

    return quiz