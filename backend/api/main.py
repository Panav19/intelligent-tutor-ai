from fastapi import FastAPI
from api.routes.upload_routes import router as upload_router
from api.routes.qa_routes import router as qa_router

app = FastAPI()

app.include_router(upload_router)
app.include_router(qa_router)

@app.get("/")
def home():
    return {
        "message": "Intelligent Tutor Backend Running"
    }