import { useState } from 'react';
import questions from './questions.json';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({
        E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    });
    const [selectedAnswer, setSelectedAnswer] = useState("");

    const handleAnswerOptionClick = (dimension, option) => {
        const oppositeDimension = dimension === 'E' ? 'I' :
                                  dimension === 'I' ? 'E' :
                                  dimension === 'S' ? 'N' :
                                  dimension === 'N' ? 'S' :
                                  dimension === 'T' ? 'F' :
                                  dimension === 'F' ? 'T' :
                                  dimension === 'J' ? 'P' : 'J';

        setScores(prevScores => ({
            ...prevScores,
            [dimension]: option === 'A' ? prevScores[dimension] + 1 : prevScores[dimension],
            [oppositeDimension]: option === 'B' ? prevScores[oppositeDimension] + 1 : prevScores[oppositeDimension]
        }));

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer("");
        } else {
            const mbtiType = `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`;
            alert(`You have finished the quiz! Your MBTI type is: ${mbtiType}`);
        }
    };

    return { currentQuestion, scores, selectedAnswer, handleAnswerOptionClick, setSelectedAnswer };
}

export default Quiz;
