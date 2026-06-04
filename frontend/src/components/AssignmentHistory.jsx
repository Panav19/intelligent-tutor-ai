import HistoryCard from "./HistoryCard";
import HistoryPanel from "./HistoryPanel";

function AssignmentHistory({
    assignments,
    selectAssignment
}) {

    return (

        <HistoryPanel

            title="Assignment History"

        >

            {

                assignments.map(
                    (assignment, index) => (

                    <HistoryCard

                        key={index}

                        onClick={() =>

                            selectAssignment(

                                assignment

                            )

                        }

                    >

                        <p className="font-semibold">

                            {assignment.topic}

                        </p>

                        <p className="text-sm text-gray-300">

                            {assignment.difficulty}

                        </p>

                    </HistoryCard>

                ))

            }

        </HistoryPanel>

    );
}

export default AssignmentHistory;