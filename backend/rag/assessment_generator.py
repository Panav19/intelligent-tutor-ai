from database.mongo import assessment_collection

from datetime import datetime


def save_assessment(
    topic,
    difficulty,
    score,
    total
):

    percentage = round(
        (score / total) * 100
    )

    assessment_doc = {

        "topic": topic,

        "difficulty": difficulty,

        "score": score,

        "total": total,

        "percentage": percentage,

        "created_at": datetime.utcnow()

    }

    assessment_collection.insert_one(
        assessment_doc
    )


def get_all_assessments():

    assessments = list(

        assessment_collection.find(

            {},

            {"_id": 0}

        ).sort(

            "created_at",

            -1

        )

    )

    return assessments