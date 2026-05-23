function Sidebar({
    sessions,
    currentSession,
    createNewChat,
    switchSession
}) {

    return (

        <div className="w-72 bg-slate-950 border-r border-slate-800 p-4">

            <button
                onClick={createNewChat}
                className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold mb-6"
            >
                + New Chat
            </button>

            <div className="space-y-2">

                {sessions.map((session) => (

                    <div
                        key={session.session_id}
                        onClick={() => switchSession(session.session_id)}
                        className={`p-3 rounded-lg cursor-pointer transition ${
                            currentSession === session.session_id
                                ? "bg-slate-700"
                                : "bg-slate-800 hover:bg-slate-700"
                        }`}
                    >

                        {session.title}

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Sidebar;