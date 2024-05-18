import React from 'react';
import Header from './Header';
import './Header.css';          // Style for Header
import './css/QuestionStyles.css'; // Style for Question and Quiz
import Question from './Question';
<<<<<<< HEAD
import Header from './Header';
import './css/QuestionStyles.css';
import { updateScores, calculateMBTI } from './scoring';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
  });
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerOptionClick = (dimension, option, index) => {
    setScores(prevScores => updateScores(prevScores, dimension, option));
    const nextQuestion = index + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Calculate the user's MBTI type based on scores
      const mbtiType = calculateMBTI(scores);
      alert(`You have finished the quiz! Your MBTI type is: ${mbtiType}`);
    }
  };

  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  return (
    <div className="app">
      <Header />
      <div className="quiz-container">
        {questions.map((question, index) => (
          <Question
            key={index}
            data={question}
            isCurrentQuestion={currentQuestion === index}
            handleAnswerOptionClick={(dimension, option) => handleAnswerOptionClick(dimension, option, index)}
            selectedAnswer={selectedAnswers[index]}
            setSelectedAnswer={(answer) => handleSelectAnswer(answer, index)}
            isLastQuestion={index === questions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;
=======
import Quiz from './QuizLogic';  // Custom hook from QuizLogic

function App() {
    const { currentQuestion, selectedAnswer, handleAnswerOptionClick, setSelectedAnswer } = Quiz();

    return (
        <div className="app">
            <Header />
            {/* Conditional rendering can be placed here if needed */}
            <Question
                data={questions[currentQuestion]}
                handleAnswerOptionClick={handleAnswerOptionClick}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
            />
            {/* You can add other components here that were part of the original App */}
        </div>
    );
}

export default App;
>>>>>>> 604ac5a977145b2992e1be27c8e3db095373797e
