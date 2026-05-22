from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes.upload_routes import router as upload_router
from api.routes.qa_routes import router as qa_router

app = FastAPI()

# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)
app.include_router(qa_router)

@app.get("/")
def home():
    return {
        "message": "Intelligent Tutor Backend Running"
    }