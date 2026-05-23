from database.mongo import session_collection

from datetime import datetime

def create_session(session_id, title="New Chat"):

    existing = session_collection.find_one({
        "session_id": session_id
    })

    if existing:
        return

    session_collection.insert_one({
        "session_id": session_id,
        "title": title,
        "created_at": datetime.utcnow()
    })

def get_all_sessions():

    sessions = list(
        session_collection.find(
            {},
            {"_id": 0}
        ).sort("created_at", -1)
    )

    return sessions