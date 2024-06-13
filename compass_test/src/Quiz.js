/**
 * Quiz component that displays a series of questions and manages the quiz logic.
 * 
 * This component uses a custom hook `useQuizLogic` to manage the quiz state, including:
 * - `currentQuestion` (number): The index of the current question being displayed.
 * - `selectedAnswers` (array): The answers selected by the user for each question.
 * - `answeredQuestions` (array): A list of question IDs that have been answered.
 * - `handleAnswerOptionClick` (function): Callback function to handle the selection of an answer option.
 * 
 * The Quiz component renders a list of Question components, passing necessary props to each one.
 * 
 * Props passed to Question components:
 * - `data` (object): The question data, including question text and answer options, with an added `id`.
 * - `isCurrentQuestion` (boolean): Indicates if the question is the current active question.
 * - `handleAnswerOptionClick` (function): Function to handle the answer option click event.
 * - `selectedAnswer` (string): The currently selected answer for the question.
 * - `setSelectedAnswer` (function): Function to set the selected answer.
 * - `answeredQuestions` (array): List of answered question IDs.
 * 
 * CSS:
 * - The component uses styles from `HeaderStyles.css` and `QuestionStyles.css`.
 * 
 * @component
 * @example
 * return (
 *   <Quiz />
 * )
 */
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
