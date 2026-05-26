function WorkspaceNavbar({
    activeView,
    setActiveView
}) {

    const tabs = [
        "upload",
        "tutor",
        "assignments"
    ];

    return (

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg flex gap-4">

            {tabs.map((tab) => (

                <button
                    key={tab}
                    onClick={() =>
                        setActiveView(tab)
                    }
                    className={`px-5 py-2 rounded-lg font-semibold capitalize transition ${
                        activeView === tab
                            ? "bg-cyan-500 text-white"
                            : "bg-slate-700 hover:bg-slate-600"
                    }`}
                >

                    {tab}

                </button>

            ))}

        </div>
    );
}

export default WorkspaceNavbar;