import React, { useState } from "react";

import API from "../services/api";

function AssessmentPage() {

    const [topic, setTopic] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [numQuestions, setNumQuestions] =
        useState(5);

    const [quiz, setQuiz] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const generateQuiz = async () => {

        // VALIDATE TOPIC

        if (!topic.trim()) {

            setError(
                "Please enter a topic"
            );

            return;
        }

        setError("");

        setLoading(true);

        try {

            const response =
                await API.post(
                    "/generate-quiz",
                    {
                        topic: topic,
                        difficulty: difficulty,
                        num_questions: Number(
                            numQuestions
                        )
                    }
                );

            // HANDLE BACKEND ERROR

            if (
                response.data.quiz?.error
            ) {

                setQuiz(
                    response.data.quiz.error
                );

            } else {

                setQuiz(
                    response.data.quiz
                );
            }

        } catch (error) {

            console.error(error);

            setQuiz(
                "Error generating quiz"
            );
        }

        setLoading(false);
    };

    return (

        <div className="flex gap-6">

            {/* GENERATOR */}

            <div className="flex-1 bg-slate-800 p-6 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold mb-6 text-cyan-400">

                    Assessment Generator

                </h2>

                <div className="space-y-4">

                    {/* TOPIC */}

                    <div>

                        <label className="block mb-2">

                            Topic

                        </label>

                        <input
                            type="text"
                            value={topic}
                            onChange={(e) =>
                                setTopic(
                                    e.target.value
                                )
                            }
                            placeholder="Enter topic..."
                            className="
                                w-full
                                p-3
                                rounded-lg
                                bg-slate-700
                                border
                                border-slate-600
                            "
                        />

                        {error && (

                            <p className="text-red-400 mt-2">

                                {error}

                            </p>

                        )}

                    </div>

                    {/* DIFFICULTY */}

                    <div>

                        <label className="block mb-2">

                            Difficulty

                        </label>

                        <select
                            value={difficulty}
                            onChange={(e) =>
                                setDifficulty(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-3
                                rounded-lg
                                bg-slate-700
                                border
                                border-slate-600
                            "
                        >

                            <option>Easy</option>

                            <option>Medium</option>

                            <option>Hard</option>

                        </select>

                    </div>

                    {/* NUMBER OF QUESTIONS */}

                    <div>

                        <label className="block mb-2">

                            Number of Questions

                        </label>

                        <input
                            type="number"
                            value={numQuestions}
                            onChange={(e) =>
                                setNumQuestions(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                p-3
                                rounded-lg
                                bg-slate-700
                                border
                                border-slate-600
                            "
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        onClick={generateQuiz}
                        disabled={loading}
                        className="
                            bg-cyan-500
                            hover:bg-cyan-600
                            disabled:bg-slate-600
                            px-6
                            py-3
                            rounded-lg
                            font-semibold
                            transition
                        "
                    >

                        {loading
                            ? "Generating..."
                            : "Generate Quiz"}

                    </button>

                </div>

                {/* QUIZ OUTPUT */}

                <div
                    className="
                        mt-8
                        bg-slate-900
                        p-6
                        rounded-lg
                        min-h-[300px]
                        whitespace-pre-wrap
                    "
                >

                    {loading
                        ? "Generating quiz..."
                        : quiz}

                </div>

            </div>

        </div>

    );
}

export default AssessmentPage;