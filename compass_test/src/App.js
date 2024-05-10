import React from 'react';
import Header from './Header';
import './Header.css';          // Style for Header
import './css/QuestionStyles.css'; // Style for Question and Quiz
import Question from './Question';
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
