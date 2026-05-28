from langchain_chroma import Chroma

from rag.embeddings import (
    get_embedding_model
)

# LOAD EMBEDDINGS

embeddings = get_embedding_model()

# LOAD VECTOR STORE

vector_store = Chroma(
    persist_directory="vector_db",
    embedding_function=embeddings
)

# RETRIEVER

retriever = vector_store.as_retriever(
    search_kwargs={"k": 8}
)

def get_retriever():

    return retriever

# DIRECT ACCESS TO VECTOR STORE

def get_vector_store():

    return vector_store