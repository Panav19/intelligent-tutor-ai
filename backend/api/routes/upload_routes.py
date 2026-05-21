from fastapi import APIRouter, UploadFile, File
import shutil

from rag.pdf_loader import load_pdf
from rag.chunking import split_documents
from rag.vector_store import create_vector_store

router = APIRouter()

@router.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    documents = load_pdf(file_path)

    chunks = split_documents(documents)

    create_vector_store(chunks)

    return {
        "message": "PDF uploaded and processed successfully"
    }