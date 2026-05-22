from rag.retriever import get_retriever
from rag.llm import get_llm
from rag.memory import save_message

retriever = get_retriever()

llm = get_llm()

def ask_question(question, session_id):

    docs = retriever.invoke(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an intelligent tutor.

Answer the question using ONLY the provided context.

Context:
{context}

Question:
{question}

Answer:
"""

    response = llm.invoke(prompt)

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