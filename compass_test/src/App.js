import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import questions from './questions.json';
import Question from './Question';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      alert( score);
    }
  };

  return (
    <div className="app">
      {questions.length > 0 && questions[currentQuestion] ? (
        <Question
          data={questions[currentQuestion]}
          handleAnswerOptionClick={handleAnswerOptionClick}
        />
      ) : (
        <div>Loading questions or no questions available.</div>
      )}
    </div>
  );
  
}

export default Quiz;