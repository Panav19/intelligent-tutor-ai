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

        <div>

            <h2>Ask Tutor</h2>

            <textarea
                rows="4"
                cols="50"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any question..."
            />

            <br />

            <button onClick={askQuestion}>
                Ask
            </button>

            <div style={{ marginTop: "20px" }}>

                {loading ? (
                    <p>Generating answer...</p>
                ) : (
                    <p>{answer}</p>
                )}

            </div>

        </div>
    );
}

export default ChatBox;