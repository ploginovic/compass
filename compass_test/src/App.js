import React, { useState } from 'react';
import questions from './questions.json';
import Question from './Question';
import './css/QuestionStyles.css'

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(""); // Reset selected answer for the next question
    } else {
      alert(`You have finished the quiz! Your score is: ${score + (isCorrect ? 1 : 0)}`);
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
