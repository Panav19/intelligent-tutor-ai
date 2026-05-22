import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar";
import PDFUpload from "./components/PDFUpload";
import ChatBox from "./components/ChatBox";
import Sidebar from "./components/Sidebar";

function App() {

    const initialSession = uuidv4();

    const [sessions, setSessions] = useState([
        initialSession
    ]);

    const [currentSession, setCurrentSession] =
        useState(initialSession);

    const createNewChat = () => {

        const newSession = uuidv4();

        setSessions((prev) => [
            newSession,
            ...prev
        ]);

        setCurrentSession(newSession);
    };

    const switchSession = (sessionId) => {

        setCurrentSession(sessionId);
    };

    return (

        <div className="min-h-screen bg-slate-900 text-white">

            <Navbar />

            <div className="flex h-[calc(100vh-80px)]">

                <Sidebar
                    sessions={sessions}
                    currentSession={currentSession}
                    createNewChat={createNewChat}
                    switchSession={switchSession}
                />

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                    <PDFUpload />

                    <ChatBox
                        sessionId={currentSession}
                    />

                </div>

            </div>

        </div>
    );
}

export default App;