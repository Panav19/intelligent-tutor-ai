export function parseQuiz(quizText) {

    const questions = [];

    const cleanedQuiz = quizText

        // REMOVE MARKDOWN

        .replace(/\*\*/g, "")

        .replace(/\r/g, "")

        // REMOVE INTRODUCTION TEXT

        .replace(
            /Here are.*?questions.*?:?/i,
            ""
        );

    // SUPPORTS:
    // Question 1:
    // Question 1
    // Question 1 :

    const blocks = cleanedQuiz.split(
        /Question\s+\d+\s*:?\s*/i
    );

    blocks.shift();

    blocks.forEach((block) => {

        const lines = block

            .split("\n")

            .map((line) => line.trim())

            .filter(Boolean);

        // MUST CONTAIN CORRECT ANSWER

        const hasAnswer = lines.some(
            (line) =>
                line.includes(
                    "Correct Answer"
                )
        );

        if (!hasAnswer) {

            return;
        }

        const question = lines[0];

        const options = {};

        let correctAnswer = "";

        lines.forEach((line) => {

            if (line.startsWith("A.")) {

                options.A =
                    line.substring(2).trim();

            }

            else if (
                line.startsWith("B.")
            ) {

                options.B =
                    line.substring(2).trim();

            }

            else if (
                line.startsWith("C.")
            ) {

                options.C =
                    line.substring(2).trim();

            }

            else if (
                line.startsWith("D.")
            ) {

                options.D =
                    line.substring(2).trim();

            }

            else if (
                line.includes(
                    "Correct Answer"
                )
            ) {

                const match =
                    line.match(
                        /Correct Answer:\s*([A-D])/i
                    );

                if (match) {

                    correctAnswer =
                        match[1];
                }
            }

        });

        // VALID QUESTION

        if (

            question &&

            options.A &&

            options.B &&

            options.C &&

            options.D &&

            correctAnswer

        ) {

            questions.push({

                question,

                options,

                correctAnswer

            });
        }

    });

    return questions;
}