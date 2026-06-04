import HistoryCard from "./HistoryCard";
import HistoryPanel from "./HistoryPanel";

function AssessmentHistory({
    assessments,
    selectAssessment
}) {

    return (

        <HistoryPanel

            title="Assessment History"

        >

            {

                assessments.map(

                    (
                        assessment,
                        index
                    ) => (

                        <HistoryCard

                            key={index}

                            onClick={() =>

                                selectAssessment(

                                    assessment

                                )

                            }

                        >

                            <p className="font-semibold">

                                {

                                    assessment.topic

                                }

                            </p>

                            <p className="text-sm text-gray-300">

                                {

                                    assessment.difficulty

                                }

                            </p>

                            <p className="text-sm text-green-300">

                                {

                                    assessment.score

                                }

                                /

                                {

                                    assessment.total

                                }

                                {" "}
                                (

                                {

                                    assessment.percentage

                                }

                                %)

                            </p>

                        </HistoryCard>

                    )

                )

            }

        </HistoryPanel>

    );

}

export default AssessmentHistory;