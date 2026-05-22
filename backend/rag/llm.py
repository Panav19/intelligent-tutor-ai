from langchain_ollama import OllamaLLM

# GLOBAL LLM

llm = OllamaLLM(
    model="llama3"
)

def get_llm():

    return llm