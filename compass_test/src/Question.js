import React from 'react';
import './css/QuestionStyles.css'; // Adjust path based on where your CSS file is located

function Question({ data, handleAnswerOptionClick, selectedAnswer, setSelectedAnswer }) {
  return (
    <div>
      <h1>{data.question}</h1>
      <div>
        {data.answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={answer.text}
              checked={selectedAnswer === answer.text}
              onChange={() => {
                setSelectedAnswer(answer.text);
                handleAnswerOptionClick(answer.isCorrect);
              }}
            />
            {answer.text}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
