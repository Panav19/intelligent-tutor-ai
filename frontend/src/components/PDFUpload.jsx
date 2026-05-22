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

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
                Upload Study Material
            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
            />

            <br />

            <button
                onClick={handleUpload}
                className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
            >
                Upload PDF
            </button>

            <p className="mt-4 text-green-400">
                {message}
            </p>

        </div>
    );
}

export default PDFUpload;