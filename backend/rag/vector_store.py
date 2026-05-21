from langchain_chroma import Chroma
from rag.embeddings import get_embedding_model

def create_vector_store(chunks):

    embeddings = get_embedding_model()

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="vector_db"
    )

    return vector_store