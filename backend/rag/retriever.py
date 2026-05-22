from langchain_chroma import Chroma
from rag.embeddings import get_embedding_model

# LOAD ONCE

embeddings = get_embedding_model()

vector_store = Chroma(
    persist_directory="vector_db",
    embedding_function=embeddings
)

retriever = vector_store.as_retriever(
    search_kwargs={"k": 3}
)

def get_retriever():

    return retriever