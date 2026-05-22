import React, {
    useState,
    useRef,
    useEffect
} from "react";

import API from "../services/api";

function ChatBox() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    // SESSION ID

    const sessionId = "student-session-1";

    // LOAD CHAT HISTORY

    useEffect(() => {

        loadChatHistory();

    }, []);

    const loadChatHistory = async () => {

        try {

            const response = await API.get(
                `/chat-history/${sessionId}`
            );

            setMessages(
                response.data.messages.map((msg) => ({
                    type:
                        msg.role === "user"
                            ? "user"
                            : "ai",
                    text: msg.message
                }))
            );

        } catch (error) {

            console.error(error);
        }
    };

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages]);

    const askQuestion = async () => {

        if (!question.trim()) return;

        const userMessage = {
            type: "user",
            text: question
        };

        setMessages((prev) => [
            ...prev,
            userMessage
        ]);

        const currentQuestion = question;

        setQuestion("");

        setLoading(true);

        try {

            const response = await API.post(
                "/ask",
                {
                    question: currentQuestion,
                    session_id: sessionId
                }
            );

            const aiMessage = {
                type: "ai",
                text: response.data.answer
            };

            setMessages((prev) => [
                ...prev,
                aiMessage
            ]);

        } catch (error) {

            console.error(error);

            const errorMessage = {
                type: "ai",
                text: "Error generating response"
            };

            setMessages((prev) => [
                ...prev,
                errorMessage
            ]);
        }

        setLoading(false);
    };

    const handleKeyPress = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            askQuestion();
        }
    };

    return (

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg">

            <h2 className="text-xl font-semibold mb-4">
                Intelligent Tutor Chat
            </h2>

            <div className="h-[500px] overflow-y-auto bg-slate-900 rounded-lg p-4 space-y-4">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`flex ${
                            msg.type === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >

                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl whitespace-pre-wrap ${
                                msg.type === "user"
                                    ? "bg-cyan-500 text-white"
                                    : "bg-slate-700 text-gray-100"
                            }`}
                        >

                            {msg.text}

                        </div>

                    </div>
                ))}

                {loading && (

                    <div className="flex justify-start">

                        <div className="bg-slate-700 px-4 py-3 rounded-2xl">

                            Thinking...

                        </div>

                    </div>
                )}

                <div ref={chatEndRef} />

            </div>

            <div className="mt-4 flex gap-3">

                <textarea
                    rows="2"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask your tutor anything..."
                    className="flex-1 p-4 rounded-lg bg-slate-700 text-white border border-slate-600 resize-none"
                />

                <button
                    onClick={askQuestion}
                    className="bg-cyan-500 hover:bg-cyan-600 px-6 rounded-lg font-semibold"
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatBox;