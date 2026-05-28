function AssignmentHistory({
    assignments,
    selectAssignment
}) {

    return (

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg h-full flex flex-col">

            <h2 className="text-xl font-bold mb-4 text-cyan-400">

                Assignment History

            </h2>

            <div className="space-y-3 overflow-y-auto flex-1">

                {assignments.map(
                    (assignment, index) => (

                    <div
                        key={index}
                        onClick={() =>
                            selectAssignment(
                                assignment
                            )
                        }
                        className="bg-slate-700 hover:bg-slate-600 p-3 rounded-lg cursor-pointer transition"
                    >

                        <p className="font-semibold">

                            {assignment.topic}

                        </p>

                        <p className="text-sm text-gray-300">

                            {assignment.difficulty}

                        </p>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AssignmentHistory;