import React, { useState } from "react";
import API from "../services/api";

function PDFUpload() {

    const [file, setFile] = useState(null);

    const [message, setMessage] = useState("");

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await API.post(
                "/upload-pdf/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            setMessage(response.data.message);

        } catch (error) {

            console.error(error);

            setMessage("Upload failed");
        }
    };

    return (
        <div>

            <h2>Upload PDF</h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={handleUpload}>
                Upload
            </button>

            <p>{message}</p>

        </div>
    );
}

export default PDFUpload;