import React from 'react';
import '../css/QuestionStyles.css'; // Adjusted path for QuestionStyles.css
import Question from '../Question';
import questions from '../questions.json'; // Import questions
import useQuizLogic from '../QuizLogic'; // Import the custom hook

function Quiz() {
  const {
    currentQuestion,
    selectedAnswers,
    handleAnswerOptionClick,
    handleSelectAnswer
  } = useQuizLogic(); // Destructure values from the custom hook

  return (
    <div className="quiz-container">
      {questions.map((question, index) => (
        <Question
          key={index}
          data={{ ...question, id: index }} // Add an id to each question
          isCurrentQuestion={currentQuestion === index}
          handleAnswerOptionClick={(dimension, option, id) => handleAnswerOptionClick(dimension, option, id)}
          selectedAnswer={selectedAnswers[index]}
          setSelectedAnswer={(answer) => handleSelectAnswer(answer, index)}
        />
      ))}
    </div>
  );
}

export default Quiz;


