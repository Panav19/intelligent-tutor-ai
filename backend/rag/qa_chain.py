from rag.retriever import get_retriever
from rag.llm import get_llm

def ask_question(question):

    retriever = get_retriever()

    llm = get_llm()

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

    return {
        "answer": response,
        "retrieved_chunks": len(docs)
    }