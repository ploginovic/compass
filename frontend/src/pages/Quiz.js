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
 * Source for MBTI speciality connection is:
 * Data adapted from: McCaulley, M.H. The Myers Longitudinal Medical Study (Monograph II).
Gainesville, Fla: Center for Applications of Psychological Type; 1977.
 * 
 * @component
 * @example
 * return (
 *   <Quiz />
 * )
 */
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
 * Source for MBTI speciality connection is:
 * Data adapted from: McCaulley, M.H. The Myers Longitudinal Medical Study (Monograph II).
Gainesville, Fla: Center for Applications of Psychological Type; 1977.
 * 
 * @component
 * @example
 * return (
 *   <Quiz />
 * )
 */
import React from 'react';
import '../css/HeaderStyles.css'; // Adjusted path for HeaderStyles.css
import '../css/QuestionStyles.css'; // Adjusted path for QuestionStyles.css
import Question from '../Question';
import questions from '../questions.json'; // Import questions
import useQuizLogic from '../QuizLogic'; // Import the custom hook

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
    toggleDeveloperMode  // Import toggle function for developer mode
  } = useQuizLogic();

  // Calculate total progress as a percentage
  const totalQuestions = developerMode ? 4 : questions.length; // Limit to 4 questions in developer mode
  const answeredCount = selectedAnswers.filter(answer => answer !== undefined).length; // Count of answered questions
  const progress = (answeredCount / totalQuestions) * 100; // Calculate progress as a percentage

  // Get the questions to display on the current page
  const startIndex = page * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);

  return (
    <div className="app">
      <div className="quiz-container">
        {/* Refresh button */}
        <button className="refresh-button" onClick={resetQuiz}>Refresh</button>

        {/* Developer Mode Toggle Button */}
        <button className="developer-mode-button" onClick={toggleDeveloperMode}>
          {developerMode ? 'Disable Developer Mode' : 'Enable Developer Mode'}
        </button>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Render current page of questions */}
        <div className="questions">
          {currentQuestions.map((question, index) => (
            <Question
              key={index + startIndex} // Use the actual question index for the key
              data={{ ...question, id: index + startIndex }} // Pass the correct question ID
              isCurrentQuestion={currentQuestion === index + startIndex}
              handleAnswerOptionClick={(dimension, option, id) => handleAnswerOptionClick(dimension, option, id)}
              selectedAnswer={selectedAnswers[index + startIndex]}
              setSelectedAnswer={(answer) => handleSelectAnswer(answer, index + startIndex)}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="pagination">
          {page > 0 && <button onClick={goToPreviousPage}>Previous</button>}
          {(page + 1) * questionsPerPage < totalQuestions && <button onClick={goToNextPage}>Next</button>}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
