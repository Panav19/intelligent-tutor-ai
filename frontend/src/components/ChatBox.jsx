import React, { useState } from "react";
import API from "../services/api";

function ChatBox() {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const askQuestion = async () => {

        if (!question) return;

        setLoading(true);

        try {

            const response = await API.post(
                "/ask",
                {
                    question: question
                }
            );

            setAnswer(response.data.answer);

        } catch (error) {

            console.error(error);

            setAnswer("Error generating response");
        }

        setLoading(false);
    };

    return (

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
                Ask Intelligent Tutor
            </h2>

            <textarea
                rows="4"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question..."
                className="w-full p-4 rounded-lg bg-slate-700 text-white border border-slate-600"
            />

            <button
                onClick={askQuestion}
                className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold"
            >
                Ask Tutor
            </button>

            <div className="mt-6 bg-slate-700 p-4 rounded-lg min-h-[120px]">

                {loading ? (
                    <p className="text-cyan-300">
                        Generating answer...
                    </p>
                ) : (
                    <p className="whitespace-pre-wrap">
                        {answer}
                    </p>
                )}

            </div>

        </div>
    );
}

export default ChatBox;