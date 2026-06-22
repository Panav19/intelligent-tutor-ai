import React, { useState } from "react";

import API from "../services/api";

function PDFUpload() {

    const [file, setFile] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleUpload = async () => {

        if (!file) {

            setError("Please select a PDF file");

            return;
        }

        setError("");

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
                response.data.data
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

        <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">

            <h2 className="text-3xl font-bold mb-6 text-cyan-400">

                Upload Study Material

            </h2>

            <div className="border-2 border-dashed border-cyan-500 rounded-2xl p-10 text-center bg-slate-900">

                <label
                    htmlFor="pdfUpload"
                    className="border-2 border-dashed border-cyan-500 rounded-2xl p-10 bg-slate-900 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition"
                >

                    <div className="text-6xl mb-4">

                        📄

                    </div>

                    <p className="text-xl font-semibold text-cyan-300">

                        Click to Select PDF

                    </p>

                    <p className="text-gray-400 mt-2">

                        Upload study material for your AI tutor

                    </p>

                </label>

                <input
                    type="file"
                    accept=".pdf"
                    id="pdfUpload"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                    className="hidden"
                />

            {/* FILE NAME */}

                {file && (

                    <div className="mt-6 bg-slate-900 p-4 rounded-xl border border-slate-700">

                        <p className="text-cyan-400 font-semibold">

                            Selected File:

                        </p>

                        <p className="text-gray-300 mt-2">

                            {file.name}

                        </p>

                    </div>

                )}

                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`mt-6 px-8 py-3 rounded-xl font-semibold transition ${
                        loading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                >

                    {loading
                        ? "Processing..."
                        : "Upload PDF"}

                </button>

                {error && (

                    <p className="text-red-400 mt-4">

                        {error}

                    </p>

                )}

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

        </div>
    );
}

export default PDFUpload;