import React, { useState } from "react";

import API from "../services/api";

function PDFUpload() {

    const [file, setFile] = useState(null);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const handleUpload = async () => {

        if (!file) {

            alert("Please select a PDF");

            return;
        }

        // PREVENT MULTIPLE CLICKS

        if (loading) return;

        setLoading(true);

        setMessage(
            "Uploading PDF and generating embeddings..."
        );

        const formData = new FormData();

        formData.append("file", file);

        try {

            const response = await API.post(
                "/upload-pdf/",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setMessage(
                response.data.message
            );

        } catch (error) {

            console.error(error);

            setMessage(
                "Upload failed"
            );
        }

        setLoading(false);
    };

    return (

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6 text-cyan-400">

                Upload Study Material

            </h2>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(e.target.files[0])
                }
                className="mb-4 block"
            />

            {/* FILE NAME */}

            {file && (

                <p className="mb-4 text-gray-300">

                    Selected File:
                    {" "}
                    {file.name}

                </p>

            )}

            {/* BUTTON */}

            <button
                onClick={handleUpload}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                    loading
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-cyan-500 hover:bg-cyan-600"
                }`}
            >

                {loading
                    ? "Processing..."
                    : "Upload PDF"}

            </button>

            {/* STATUS */}

            <div className="mt-6">

                <p className={`${
                    loading
                        ? "text-yellow-400"
                        : "text-green-400"
                }`}>

                    {message}

                </p>

            </div>

        </div>
    );
}

export default PDFUpload;