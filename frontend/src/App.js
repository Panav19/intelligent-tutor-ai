import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar";
import PDFUpload from "./components/PDFUpload";
import ChatBox from "./components/ChatBox";
import Sidebar from "./components/Sidebar";
import AssignmentGenerator from "./components/AssignmentGenerator";
import AssessmentPage from "./components/AssessmentPage";

import API from "./services/api";

function App() {

    const [sessions, setSessions] = useState([]);

    const [currentSession, setCurrentSession] =
        useState(

            localStorage.getItem(
                "currentSession"
            ) || ""

        );

    const [activeView, setActiveView] =
        useState(

            localStorage.getItem(
                "activeView"
            ) || "tutor"

        );

    // LOAD SESSIONS

    useEffect(() => {

        loadSessions();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        localStorage.setItem(
            "activeView",
            activeView
        );

    }, [activeView]);

    useEffect(() => {

        localStorage.setItem(
            "currentSession",
            currentSession
        );

    }, [currentSession]);

    const loadSessions = async () => {

        try {

            const response = await API.get("/sessions");

            const loadedSessions =
                response.data.sessions;

            setSessions(loadedSessions);

            if (loadedSessions.length > 0) {

                const savedSession =
                    localStorage.getItem(
                        "currentSession"
                    );

                // CHECK IF SAVED SESSION EXISTS

                const sessionExists =
                    loadedSessions.some(
                        (session) =>
                            session.session_id ===
                            savedSession
                    );

                if (savedSession && sessionExists) {

                    setCurrentSession(
                        savedSession
                    );

                } else {

                    // FALLBACK TO LATEST SESSION

                    setCurrentSession(
                        loadedSessions[0].session_id
                    );
                }

            } else {

                createNewChat();
            }

        } catch (error) {

            console.error(error);
        }
    };

    const createNewChat = () => {

        const newSession = {
            session_id: uuidv4(),
            title: `Chat ${
                sessions.length + 1
            }`
        };

        setSessions((prev) => [
            newSession,
            ...prev
        ]);

        setCurrentSession(
            newSession.session_id
        );
    };

    const switchSession = (sessionId) => {

        setCurrentSession(sessionId);

        setActiveView("tutor");
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

                    activeView={activeView}
                    setActiveView={setActiveView}
                />

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">

                    {/* UPLOAD VIEW */}

                    {activeView === "upload" && (

                        <PDFUpload />

                    )}

                    {/* ASSIGNMENTS VIEW */}

                    {activeView === "assignments" && (

                        <AssignmentGenerator />

                    )}

                    {/* TUTOR VIEW */}

                    {activeView === "tutor" && currentSession && (

                        <ChatBox
                            sessionId={currentSession}
                        />

                    )}

                    {/* ASSESSMENT VIEW */}

                    {activeView === "assessments" && (
                        <AssessmentPage />
                    )}

                </div>

            </div>

        </div>
    );
}

export default App;