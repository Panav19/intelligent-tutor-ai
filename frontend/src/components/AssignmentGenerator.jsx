import React, { useState } from "react";
import { useEffect } from "react";

import AssignmentHistory from "./AssignmentHistory";

import API from "../services/api";

function AssignmentGenerator() {

    const [topic, setTopic] = useState("");

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

        if (!topic.trim()) return;

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

            setAssignment(
                response.data.assignment
            );

            loadAssignments();

        } catch (error) {

            console.error(error);

            setAssignment(
                "Error generating assignment"
            );
        }

        setLoading(false);
    };

    return (

        <div className="grid grid-cols-3 gap-6">

            {/* GENERATOR */}

            <div className="col-span-2 bg-slate-800 p-6 rounded-xl shadow-lg">

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
                        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold"
                    >

                        Generate Assignment

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

            <AssignmentHistory
                assignments={assignmentHistory}
                selectAssignment={
                    setSelectedAssignment
                }
            />

        </div>
    );
}

export default AssignmentGenerator;