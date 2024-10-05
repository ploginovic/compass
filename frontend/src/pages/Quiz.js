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
 * - The component uses styles from `QuestionStyles.css`.
 * 
 * @component
 * @example
 * return (
 *   <Quiz />
 * )
 */

import React, { useState } from 'react';
import '../components/features/Quiz/QuestionStyles.css'; // Adjusted path for QuestionStyles.css
import Question from '../components/features/Quiz/Question';
import questions from '../components/features/Quiz/questions.json'; // Import questions
import useQuizLogic from '../components/features/Quiz/QuizLogic'; // Import the custom hook
import useHeaderVisibility from '../hooks/useHeaderVisibility'; // Import custom hook for header visibility

function Quiz() {
  const {
    currentQuestion,
    selectedAnswers,
    handleAnswerOptionClick,
    handleSelectAnswer,
    resetQuiz,
    page,
    goToNextPage,
    goToPreviousPage,
    questionsPerPage,
    developerMode,
    toggleDeveloperMode,
  } = useQuizLogic();

  const totalQuestions = developerMode ? 4 : questions.length;
  const answeredCount = selectedAnswers.filter(
    (answer) => answer !== undefined
  ).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const startIndex = page * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  // Use the custom hook to track header visibility
  const isHeaderVisible = useHeaderVisibility();
  const isProgressFixed = !isHeaderVisible; // Fix the progress bar when the header is hidden

  return (
    <div className="app">
      <div className="quiz-container">
        {/* Refresh button */}
        <button className="refresh-button" onClick={resetQuiz}>
          Refresh
        </button>

        {/* Developer Mode Toggle Button */}
        <button
          className="developer-mode-button"
          onClick={toggleDeveloperMode}
        >
          {developerMode ? 'Disable Developer Mode' : 'Enable Developer Mode'}
        </button>

        {/* Progress Bar */}
        <div className={`progress-bar-container ${isProgressFixed ? 'fixed' : ''}`}>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Render current page of questions */}
        <div className="questions">
          {currentQuestions.map((question, index) => (
            <Question
              key={index + startIndex}
              data={{ ...question, id: index + startIndex }}
              isCurrentQuestion={currentQuestion === index + startIndex}
              handleAnswerOptionClick={(dimension, option, id) =>
                handleAnswerOptionClick(dimension, option, id)
              }
              selectedAnswer={selectedAnswers[index + startIndex]}
              setSelectedAnswer={(answer) =>
                handleSelectAnswer(answer, index + startIndex)
              }
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="pagination">
          {page > 0 && (
            <button onClick={goToPreviousPage}>Previous</button>
          )}
          {(page + 1) * questionsPerPage < totalQuestions && (
            <button onClick={goToNextPage}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
