import React, { useEffect } from 'react';
import './QuestionStyles.css'; // Adjust path based on where your CSS file is located

function Question({
  data,
  isCurrentQuestion,
  handleAnswerOptionClick,
  selectedAnswer,
  setSelectedAnswer,
}) {
  useEffect(() => {
    if (isCurrentQuestion) {
      const element = document.getElementById(`question-${data.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isCurrentQuestion, data.id]);

  return (
    <div
      className={`question ${isCurrentQuestion ? 'current' : 'inactive'}`}
      id={`question-${data.id}`}
    >
      <h1>{data.question}</h1>
      <div className="likert-scale">
        {[-3, -2, -1, 0, 1, 2, 3].map((value, index) => (
          <div key={value} className="likert-option">
            <input
              type="radio"
              id={`option-${value}-${data.id}`}
              name={`answer-${data.id}`}
              value={value}
              checked={selectedAnswer === value}
              onChange={() => {
                setSelectedAnswer(value);
                handleAnswerOptionClick(data.dimension, value, data.id);
              }}
            />
            <label
              htmlFor={`option-${value}-${data.id}`}
              className={`likert-circle likert-circle-${index}`}
            ></label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Question;
