export function parseQuiz(quizText) {

    const questions = [];

    const cleanedQuiz = quizText
        .replace(/\*\*/g, "")
        .replace(/\r/g, "");

    const blocks =
        cleanedQuiz.split(/Question\s+\d+:/);

    blocks.shift();

    blocks.forEach((block) => {

        const lines = block
            .split("\n")
            .map(line => line.trim())
            .filter(Boolean);

        if (lines.length < 6) return;

        const question = lines[0];

        const options = {};

        let correctAnswer = "";

        lines.forEach((line) => {

            if (line.startsWith("A.")) {

                options.A =
                    line.substring(2).trim();

            } else if (
                line.startsWith("B.")
            ) {

                options.B =
                    line.substring(2).trim();

            } else if (
                line.startsWith("C.")
            ) {

                options.C =
                    line.substring(2).trim();

            } else if (
                line.startsWith("D.")
            ) {

                options.D =
                    line.substring(2).trim();

            } else if (
                line.includes(
                    "Correct Answer:"
                )
            ) {

                correctAnswer =
                    line.split(":")[1]
                        .trim();
            }

        });

        questions.push({

            question,

            options,

            correctAnswer

        });

    });

    return questions;
}