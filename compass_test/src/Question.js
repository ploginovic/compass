import React from 'react';
import './css/QuestionStyles.css'; // Adjust path based on where your CSS file is located

function Question({ data, isCurrentQuestion, isLastQuestion, handleAnswerOptionClick, selectedAnswer, setSelectedAnswer }) {
  return (
    <div className={`question ${isCurrentQuestion ? 'current' : 'inactive'}`}>
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
              onChange={() => setSelectedAnswer(answer.text)}
            />
            <label htmlFor={`option-${index}-${data.question}`}>
              {answer.text}
            </label>
          </div>
        ))}
      </div>
      {isCurrentQuestion && (
        <button
          onClick={() => {
            const selectedOption = data.answers.find(answer => answer.text === selectedAnswer)?.option;
            if (selectedOption) {
              handleAnswerOptionClick(data.dimension, selectedOption);
            }
          }}
          disabled={!selectedAnswer}
        >
          {isLastQuestion ? 'Calculate Score' : 'Next'}
        </button>
      )}
    </div>
  );
}

export default Question;



