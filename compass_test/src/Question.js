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
