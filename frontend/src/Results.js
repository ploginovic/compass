// This is the page where the results will be shown 
import './css/QuestionStyles.css';

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate hook

  const { finalScores } = location.state || {}; // Access the scores from state

  // If finalScores is missing, show a fallback message
  if (!finalScores) {
    return <div>No results available. Please take the quiz first.</div>;
  }

  // Handle the "Go Back" button click
  const goBackToQuiz = () => {
    navigate('/quiz'); // Navigate back to the quiz page (root route in this case)
  };

  return (
    <div className="results-page">
      <h1>Your Personality Type Scores</h1>
      <ul>
        {Object.keys(finalScores).map((dimension) => (
          <li key={dimension}>
            {dimension}: {finalScores[dimension]}
          </li>
        ))}
      </ul>
      {/* Add a button to go back to the quiz */}
      <button onClick={goBackToQuiz} className="go-back-button">
        Go Back to Quiz
      </button>
    </div>
  );
};

export default Results;

