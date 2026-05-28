from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os

from rag.pdf_loader import load_pdf
from rag.chunking import split_documents
from rag.vector_store import create_vector_store

router = APIRouter()

@router.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # CREATE UPLOADS FOLDER IF MISSING

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    documents = load_pdf(file_path)

    chunks = split_documents(documents)

    create_vector_store(chunks)

    return {
        "message": "PDF uploaded and processed successfully"
    }