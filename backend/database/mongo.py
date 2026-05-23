from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["intelligent_tutor"]

chat_collection = db["chat_history"]

session_collection = db["sessions"]