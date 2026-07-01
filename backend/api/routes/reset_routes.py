from fastapi import APIRouter
import shutil
import os

from database.mongo import chat_collection
from database.mongo import session_collection

from utils.logger import logger

router = APIRouter()

@router.delete("/reset-knowledge-base")
async def reset_knowledge_base():

    uploads_path = "uploads"

    # DELETE PDF FILES ONLY

    if os.path.exists(uploads_path):

        shutil.rmtree(uploads_path)

    logger.info(
        "Uploads directory cleared"
    )

    os.makedirs(uploads_path, exist_ok=True)

    # CLEAR CHAT HISTORY

    chat_collection.delete_many({})

    logger.info(
        "Chat history cleared"
    )

    # CLEAR SESSION HISTORY

    session_collection.delete_many({})

    logger.info(
        "Session history cleared"
    )

    return {

        "success": True,

        "data":

        "Knowledge base reset successfully"

    }