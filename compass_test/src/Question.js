import React, { useEffect } from 'react';
import './css/QuestionStyles.css'; // Adjust path based on where your CSS file is located

function Question({ data, isCurrentQuestion, handleAnswerOptionClick, selectedAnswer, setSelectedAnswer }) {
  
  useEffect(() => {
    if (isCurrentQuestion) {
      const element = document.getElementById(`question-${data.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isCurrentQuestion, data.id]);

  return (
    <div className={`question ${isCurrentQuestion ? 'current' : 'inactive'}`} id={`question-${data.id}`}>
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
                handleAnswerOptionClick(data.dimension, answer.option, data.id);
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
