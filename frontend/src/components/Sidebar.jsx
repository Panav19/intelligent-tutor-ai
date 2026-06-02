function Sidebar({

    sessions,
    currentSession,
    createNewChat,
    switchSession,

    activeView,
    setActiveView

}) {

    const workspaceTabs = [

        {
            id: "tutor",
            label: "Tutor"
        },

        {
            id: "upload",
            label: "Upload PDFs"
        },

        {
            id: "assignments",
            label: "Assignments"
        },

        {
            id: "assessments",
            label: "Assessments"
        }

    ];

    return (

        <div className="w-72 bg-slate-800 p-4 flex flex-col gap-6 overflow-y-auto">

            {/* NEW CHAT */}

            <button
                onClick={createNewChat}
                className="bg-cyan-500 hover:bg-cyan-600 px-4 py-3 rounded-lg font-semibold transition"
            >

                + New Chat

            </button>

            {/* WORKSPACE */}

            <div>

                <h2 className="text-lg font-bold mb-3 text-cyan-400">

                    Workspace

                </h2>

                <div className="space-y-2">

                    {workspaceTabs.map((tab) => (

                        <button
                            key={tab.id}
                            onClick={() =>
                                setActiveView(tab.id)
                            }
                            className={`w-full text-left px-4 py-3 rounded-lg transition ${
                                activeView === tab.id
                                    ? "bg-cyan-500 text-white"
                                    : "bg-slate-700 hover:bg-slate-600"
                            }`}
                        >

                            {tab.label}

                        </button>

                    ))}

                </div>

            </div>

            {/* CHAT SESSIONS */}

            <div>

                <h2 className="text-lg font-bold mb-3 text-cyan-400">

                    Conversations

                </h2>

                <div className="space-y-2">

                    {sessions.map((session) => (

                        <button
                            key={session.session_id}
                            onClick={() =>
                                switchSession(
                                    session.session_id
                                )
                            }
                            className={`w-full text-left px-4 py-3 rounded-lg transition ${
                                currentSession ===
                                session.session_id
                                    ? "bg-cyan-500 text-white"
                                    : "bg-slate-700 hover:bg-slate-600"
                            }`}
                        >

                            {session.title}

                        </button>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Sidebar;