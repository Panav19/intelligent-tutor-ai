from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os

from rag.pdf_loader import load_pdf
from rag.chunking import split_documents
from rag.vector_store import create_vector_store
from utils.logger import logger

router = APIRouter()

@router.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    try:
        # CREATE UPLOADS FOLDER IF MISSING

        os.makedirs("uploads", exist_ok=True)

        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info(
            f"Uploaded PDF: {file.filename}"
        )

        documents = load_pdf(file_path)

        chunks = split_documents(documents)

        logger.info(
            f"Created {len(chunks)} chunks"
        )

        create_vector_store(chunks)

        logger.info(
            "Vector store updated successfully"
        )

        return {
            "success": True,
            "data": "PDF uploaded and processed successfully"
        }

    except Exception as e:

        logger.exception(
            f"Failed to process PDF '{file.filename}'"
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to process PDF"
        )