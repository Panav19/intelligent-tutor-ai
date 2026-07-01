from database.mongo import chat_collection

from utils.logger import logger

def save_message(session_id, role, message):

    chat_collection.insert_one({
        "session_id": session_id,
        "role": role,
        "message": message
    })

    logger.info(
        f"Saved {role} message for session {session_id}"
    )

def get_chat_history(session_id):

    messages = list(
        chat_collection.find(
            {"session_id": session_id},
            {"_id": 0}
        )
    )

    return messages