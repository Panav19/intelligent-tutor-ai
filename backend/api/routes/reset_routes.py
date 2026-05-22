from fastapi import APIRouter
import shutil
import os

router = APIRouter()

@router.delete("/reset-knowledge-base")
async def reset_knowledge_base():

    uploads_path = "uploads"
    vector_db_path = "vector_db"

    # Delete uploads
    if os.path.exists(uploads_path):
        shutil.rmtree(uploads_path)

    # Delete vector database
    if os.path.exists(vector_db_path):
        shutil.rmtree(vector_db_path)

    # Recreate folders
    os.makedirs(uploads_path, exist_ok=True)
    os.makedirs(vector_db_path, exist_ok=True)

    return {
        "message": "Knowledge base reset successfully"
    }