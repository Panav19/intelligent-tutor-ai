function AssessmentHistory({
    assessments,
    selectAssessment
}) {

    return (

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg h-full flex flex-col">

            <h2 className="text-xl font-bold mb-4 text-cyan-400">

                Assessment History

            </h2>

            <div className="space-y-3 overflow-y-auto flex-1">

                {

                    assessments.map(

                        (
                            assessment,
                            index
                        ) => (

                            <div
                                key={index}
                                onClick={() =>
                                    selectAssessment(
                                        assessment
                                    )
                                }
                                className="
                                    bg-slate-700
                                    hover:bg-slate-600
                                    p-3
                                    rounded-lg
                                    cursor-pointer
                                    transition
                                "
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

                            </div>

                        )

                    )

                }

            </div>

        </div>

    );

}

export default AssessmentHistory;