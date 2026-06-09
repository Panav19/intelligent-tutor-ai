import React, { useState, useEffect } from "react";

import GeneratorLayout from "./GeneratorLayout";
import AssessmentHistory from "./AssessmentHistory";

import API from "../services/api";

import {
    parseQuiz
} from "../utils/quizParser";

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

    const [parsedQuiz, setParsedQuiz] =
        useState([]);

    const [answers, setAnswers] =
        useState({});

    const [score, setScore] =
        useState(null);

    const [submitted, setSubmitted] =
        useState(false);

    const [assessmentHistory, setAssessmentHistory] =
        useState([]);

    const [selectedAssessment, setSelectedAssessment] =
        useState(null);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const response =

                await API.get(

                    "/assessments"

                );

            if (

                response.data.success

            ) {

                setAssessmentHistory(

                    response.data.data

                );

            }

        }

        catch (error) {

            console.error(

                error

            );

        }

    };

    const generateQuiz = async () => {

        // VALIDATE TOPIC

        if (!topic.trim()) {

            setError(
                "Please enter a topic"
            );

            return;
        }

        setError("");

        // CLEAR PREVIOUS QUIZ

        setParsedQuiz([]);

        setQuiz("");

        setAnswers({});

        setScore(null);

        setSubmitted(false);

        setSelectedAssessment(null);

        setLoading(true);

        try {

            const response =
                await API.post(
                    "/generate-quiz",
                    {
                        topic,
                        difficulty,
                        num_questions:
                            Number(
                                numQuestions
                            )
                    }
                );

            // HANDLE BACKEND ERROR

            if (

                response.data.success

            ) {

                const generatedQuiz =

                    response.data.data;

                setQuiz(
                    generatedQuiz
                );

                const parsed =

                    parseQuiz(
                        generatedQuiz
                    );

                setParsedQuiz(
                    parsed
                );

            }

            else {

                setQuiz(
                    response.data.message
                );

                setParsedQuiz([]);

            }

        } catch (error) {

            console.error(error);

            setQuiz(
                "Error generating quiz"
            );

            setParsedQuiz([]);
        }

        setLoading(false);
    };

    const submitQuiz = async () => {

        let correct = 0;

        parsedQuiz.forEach(
            (
                question,
                index
            ) => {

                if (

                    answers[index] ===
                    question.correctAnswer

                ) {

                    correct++;
                }

            }
        );

        const percentage =
            Math.round(
                (
                    correct /
                    parsedQuiz.length
                ) * 100
            );

        setScore({

            correct,

            total:
                parsedQuiz.length,

            percentage

        });

        setSubmitted(true);

        try {

            await API.post(

                "/save-assessment",

                {

                    topic,

                    difficulty,

                    score: correct,

                    total:

                    parsedQuiz.length

                }

            );

        }

        catch (error) {

            console.error(error);

        }

        loadHistory();

    };

    return (

        <GeneratorLayout

            history={

                <AssessmentHistory

                    assessments={
                        assessmentHistory
                    }

                    selectAssessment={(assessment) => {

                        setSelectedAssessment(
                            assessment
                        );

                    }}

                />

            }

        >

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

                            <option>
                                Easy
                            </option>

                            <option>
                                Medium
                            </option>

                            <option>
                                Hard
                            </option>

                        </select>

                    </div>

                    {/* NUMBER OF QUESTIONS */}

                    <div>

                        <label className="block mb-2">

                            Number of Questions

                        </label>

                        <input
                            type="number"
                            min="1"
                            max="20"
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

                    {/* GENERATE BUTTON */}

                    <button
                        onClick={
                            generateQuiz
                        }
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

                {/* ERROR */}

                {
                    quiz &&
                    parsedQuiz.length === 0 &&
                    !loading && (

                        <div
                            className="
                                mt-8
                                bg-red-500/10
                                border
                                border-red-500
                                text-red-300
                                p-4
                                rounded-lg
                            "
                        >

                            {quiz}

                        </div>

                    )
                }

                {/* PARSED QUIZ */}

                {
                    parsedQuiz.length > 0 && (

                        <div className="mt-8">

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                    mb-4
                                "
                            >

                                Quiz Questions

                            </h3>

                            {

                                parsedQuiz.map(
                                    (
                                        q,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                bg-slate-700
                                                p-5
                                                rounded-lg
                                                mb-4
                                            "
                                        >

                                            <p
                                                className="
                                                    font-semibold
                                                    mb-3
                                                "
                                            >

                                                {index + 1}.
                                                {" "}
                                                {q.question}

                                            </p>

                                            <div className="space-y-2">

                                                {

                                                    Object.entries(
                                                        q.options
                                                    ).map(
                                                        (
                                                            [
                                                                key,
                                                                value
                                                            ]
                                                        ) => (

                                                            <label
                                                                key={key}
                                                                className={`

                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    p-2
                                                                    rounded

                                                                    ${

                                                                        submitted &&

                                                                        key === q.correctAnswer

                                                                            ? "bg-green-700"

                                                                            : submitted &&

                                                                            answers[index] === key

                                                                            ? "bg-red-700"

                                                                            : ""

                                                                    }

                                                                `}
                                                            >

                                                                <input
                                                                    type="radio"
                                                                    name={`question-${index}`}
                                                                    checked={
                                                                        answers[index] ===
                                                                        key
                                                                    }
                                                                    disabled={submitted}
                                                                    onChange={() =>
                                                                        setAnswers(
                                                                            (
                                                                                prev
                                                                            ) => ({
                                                                                ...prev,
                                                                                [index]: key
                                                                            })
                                                                        )
                                                                    }
                                                                />

                                                                <span>

                                                                    {key}.
                                                                    {" "}
                                                                    {value}

                                                                </span>

                                                            </label>

                                                        )
                                                    )

                                                }

                                            </div>

                                            {
                                                submitted && (

                                                    <div className="mt-4">

                                                        <p className="text-red-300">

                                                            Your Answer:

                                                            {" "}

                                                            {

                                                                answers[index] ||
                                                                "Not Answered"

                                                            }

                                                        </p>

                                                        <p className="text-green-300">

                                                            Correct Answer:

                                                            {" "}

                                                            {q.correctAnswer}

                                                        </p>

                                                    </div>

                                                )
                                            }

                                        </div>

                                    )
                                )

                            }

                            {/* SUBMIT */}

                            {
                                !submitted && (

                                    <button
                                        onClick={submitQuiz}
                                        className="
                                            mt-4
                                            bg-green-500
                                            hover:bg-green-600
                                            px-6
                                            py-3
                                            rounded-lg
                                            font-semibold
                                        "
                                    >

                                        Submit Quiz

                                    </button>

                                )
                            }

                        </div>

                    )
                }

                {/* RESULT */}

                {
                    score && (

                        <div
                            className="
                                mt-8
                                bg-slate-900
                                p-5
                                rounded-lg
                            "
                        >

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                    text-green-400
                                    mb-3
                                "
                            >

                                Quiz Result

                            </h3>

                            <p>

                                Score:

                                {" "}

                                {score.correct}

                                /

                                {score.total}

                            </p>

                            <p>

                                Percentage:

                                {" "}

                                {score.percentage}%

                            </p>

                        </div>

                    )
                }

                {/* SELECTED ASSESSMENT */}

                {
                    selectedAssessment && (

                        <div
                            className="
                                mt-8
                                bg-slate-900
                                p-5
                                rounded-lg
                            "
                        >

                            <h3
                                className="
                                    text-xl
                                    font-bold
                                    text-cyan-400
                                    mb-3
                                "
                            >

                                Selected Assessment

                            </h3>

                            <p>

                                Topic:

                                {" "}

                                {selectedAssessment.topic}

                            </p>

                            <p>

                                Difficulty:

                                {" "}

                                {selectedAssessment.difficulty}

                            </p>

                            <p>

                                Score:

                                {" "}

                                {selectedAssessment.score}

                                /

                                {selectedAssessment.total}

                            </p>

                            <p>

                                Percentage:

                                {" "}

                                {selectedAssessment.percentage}%

                            </p>

                        </div>

                    )
                }

            </div>

        </GeneratorLayout>

    );
}

export default AssessmentPage;