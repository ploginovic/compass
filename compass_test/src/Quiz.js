import React from 'react';
import Header from './Header';
import './css/HeaderStyles.css'; // Style for Header
import './css/QuestionStyles.css'; // Style for Question and Quiz
import Question from './Question';
import questions from './questions.json'; // Import questions
import useQuizLogic from './QuizLogic'; // Import the custom hook

function Quiz() {
  const {
    currentQuestion,
    selectedAnswers,
    answeredQuestions,
    handleAnswerOptionClick
  } = useQuizLogic(); // Destructure values from the custom hook

  console.log('Answered Questions:', answeredQuestions);


  return (
    <div className="app">
      <div className="quiz-container">
        {questions.map((question, index) => (
          <Question
            key={index}
            data={{ ...question, id: index }} // Add an id to each question
            isCurrentQuestion={currentQuestion === index}
            handleAnswerOptionClick={(dimension, option, id) => handleAnswerOptionClick(dimension, option, id)}
            selectedAnswer={selectedAnswers[index]}
            setSelectedAnswer={(answer) => handleAnswerOptionClick(question.dimension, answer, index)} // Use handleAnswerOptionClick for selecting answer
            answeredQuestions={answeredQuestions} // Pass answeredQuestions
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;
