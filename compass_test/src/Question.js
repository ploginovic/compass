/**
 * Question component that displays a question with multiple answer options.
 * 
 * This component is designed to handle the display and interaction of quiz questions.
 * It uses the `useEffect` hook to scroll into view when it is the current question.
 * 
 * Props:
 * - `data` (object): The question data, including the question text and answer options.
 * - `isCurrentQuestion` (boolean): Indicates if this question is the currently active question.
 * - `handleAnswerOptionClick` (function): Callback function to handle answer option selection.
 * - `selectedAnswer` (string): The currently selected answer for this question.
 * - `setSelectedAnswer` (function): Function to set the selected answer state.
 * - `answeredQuestions` (array): List of question IDs that have been answered.
 * 
 * The component also handles the following functionalities:
 * - Scrolling into view when the question becomes the current question.
 * - Displaying different styles for answered, current, and inactive questions.
 * - Logging debugging information to the console.
 * 
 * CSS:
 * - The component uses styles from `QuestionStyles.css`. Ensure the path to the CSS file is correct.
 * 
 * const data = {
 *   id: 1,
 *   question: "What is the capital of France?",
 *   answers: [
 *     { text: "Paris", option: "A" },
 *     { text: "London", option: "B" },
 *     { text: "Berlin", option: "C" }
 *   ],
 *   dimension: "geography"
 * };
 * const handleAnswerOptionClick = (dimension, option, id) => {
 *   console.log(dimension, option, id);
 * };
 * const selectedAnswer = "Paris";
 * const setSelectedAnswer = (answer) => {
 *   console.log(answer);
 * };
 * const answeredQuestions = [1];
 * 
 * return (
 *   <Question
 *     data={data}
 *     isCurrentQuestion={true}
 *     handleAnswerOptionClick={handleAnswerOptionClick}
 *     selectedAnswer={selectedAnswer}
 *     setSelectedAnswer={setSelectedAnswer}
 *     answeredQuestions={answeredQuestions}
 *   />
 * );
 */
import React, { useEffect } from 'react';
import './css/QuestionStyles.css'; // Adjust path based on where your CSS file is located

function Question({ data, isCurrentQuestion, handleAnswerOptionClick, selectedAnswer, setSelectedAnswer, answeredQuestions = [] }) {
  console.log('Updated Answered Questions:', answeredQuestions);

  useEffect(() => {
    if (isCurrentQuestion) {
      const element = document.getElementById(`question-${data.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    console.log(`Question ${data.id} - Is Answered:`, answeredQuestions.includes(data.id));
  }, [isCurrentQuestion, data.id, answeredQuestions]);

  const isAnswered = answeredQuestions.includes(data.id);
  const isInactive = !isCurrentQuestion && !isAnswered;

  // Debugging logs
  console.log(`Question ${data.id} - isCurrentQuestion:`, isCurrentQuestion);
  console.log(`Question ${data.id} - isAnswered:`, isAnswered);
  console.log(`Question ${data.id} - isInactive:`, isInactive);

  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isCurrentQuestion ? 'current' : ''} ${isInactive ? 'inactive' : ''}`} id={`question-${data.id}`}>
      <h1>{data.question}</h1>
      <div>
        {data.answers.map((answer, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <input
              type="radio"
              id={`option-${index}-${data.question}`}
              name={`answer-${data.question}`}
              value={answer.text}
              checked={selectedAnswer === answer.text}
              onChange={() => {
                setSelectedAnswer(answer.text);
                handleAnswerOptionClick(data.dimension, answer.text, data.id);
              }}
            />
            <label htmlFor={`option-${index}-${data.question}`}>
              {answer.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
