import React, { useState, useEffect } from "react";

import AssignmentHistory from "./AssignmentHistory";

import API from "../services/api";

function AssignmentGenerator() {

    const [topic, setTopic] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("Medium");

    const [numQuestions, setNumQuestions] =
        useState(5);

    const [assignment, setAssignment] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [assignmentHistory, setAssignmentHistory] =
        useState([]);

    const [selectedAssignment, setSelectedAssignment] =
        useState(null);

    const [error, setError] =
        useState("");

    useEffect(() => {

        loadAssignments();

    }, []);

    const loadAssignments = async () => {

        try {

            const response = await API.get(
                "/assignments"
            );

            setAssignmentHistory(
                response.data.assignments
            );

        } catch (error) {

            console.error(error);
        }
    };

    const generateAssignment = async () => {

        // VALIDATE TOPIC

        if (!topic.trim()) {

            setError("Please enter a topic");

            return;
        }

        setError("");

        // CLEAR PREVIOUS SELECTION

        setSelectedAssignment(null);

        setLoading(true);

        try {

            const response = await API.post(
                "/generate-assignment",
                {
                    topic: topic,
                    difficulty: difficulty,
                    num_questions: Number(numQuestions)
                }
            );

            // HANDLE BACKEND ERROR RESPONSE

            if (
                response.data.assignment.error
            ) {

                setAssignment(
                    response.data.assignment.error
                );

            } else {

                setAssignment(
                    response.data.assignment
                );

                loadAssignments();
            }

        } catch (error) {

            console.error(error);

            setAssignment(
                "Error generating assignment"
            );
        }

        setLoading(false);
    };

    return (

        <div className="flex gap-6 items-stretch">

            {/* GENERATOR */}

            <div className="flex-1 bg-slate-800 p-6 rounded-xl shadow-lg">

                <h2 className="text-2xl font-bold mb-6 text-cyan-400">

                    Assignment Generator

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
                                setTopic(e.target.value)
                            }
                            placeholder="Enter topic..."
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
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
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
                        >

                            <option>Easy</option>

                            <option>Medium</option>

                            <option>Hard</option>

                        </select>

                    </div>

                    {/* QUESTION COUNT */}

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
                            className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        onClick={generateAssignment}
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
                            : "Generate Assignment"}

                    </button>

                </div>

                {/* OUTPUT */}

                <div className="mt-8 bg-slate-900 p-6 rounded-lg min-h-[300px] whitespace-pre-wrap">

                    {loading
                        ? "Generating assignment..."
                        : selectedAssignment
                        ? selectedAssignment.assignment
                        : assignment}

                </div>

            </div>

            {/* HISTORY */}

            <div className="
                w-80
                flex
            ">

                <AssignmentHistory
                    assignments={assignmentHistory}
                    selectAssignment={
                        setSelectedAssignment
                    }
                />

            </div>

        </div>
    );
}

export default AssignmentGenerator;