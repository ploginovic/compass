import React from 'react';

function Question({ data, handleAnswerOptionClick }) {
  return (
    <div>
      <h1>{data.question}</h1>
      {data.answers.map((answer, index) => (
        <button onClick={() => handleAnswerOptionClick(answer.isCorrect)} key={index}>
          {answer.text}
        </button>
      ))}
    </div>
  );
}

export default Question;
