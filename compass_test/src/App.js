import React, { useState } from 'react';
import questions from './questions.json';
import Question from './Question';
import './css/QuestionStyles.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  });
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerOptionClick = (dimension, option) => {
    // Determine the opposite dimension to update the score
    const oppositeDimension = dimension === 'E' ? 'I' : 
                              dimension === 'I' ? 'E' :
                              dimension === 'S' ? 'N' :
                              dimension === 'N' ? 'S' :
                              dimension === 'T' ? 'F' :
                              dimension === 'F' ? 'T' :
                              dimension === 'J' ? 'P' : 'J';

    // Update scores for the chosen and opposite dimensions
    setScores(prevScores => ({
      ...prevScores,
      [dimension]: option === 'A' ? prevScores[dimension] + 1 : prevScores[dimension],
      [oppositeDimension]: option === 'B' ? prevScores[oppositeDimension] + 1 : prevScores[oppositeDimension]
    }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(""); // Reset selected answer for the next question
    } else {
      // Calculate the user's MBTI type based on scores
      const mbtiType = `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`;
      alert(`You have finished the quiz! Your MBTI type is: ${scores.I}`);
    }
  };

  return (
    <div className="app">
      {questions.length > 0 && (
        <Question
          data={questions[currentQuestion]}
          handleAnswerOptionClick={handleAnswerOptionClick}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
        />
      )}
    </div>
  );
}

export default Quiz;
