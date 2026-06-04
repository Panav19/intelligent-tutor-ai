function HistoryPanel({

    title,

    children

}) {

    return (

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg h-full flex flex-col">

            <h2 className="text-xl font-bold mb-4 text-cyan-400">

                {title}

            </h2>

            <div className="space-y-3 overflow-y-auto flex-1">

                {children}

            </div>

        </div>

    );

}

export default HistoryPanel;