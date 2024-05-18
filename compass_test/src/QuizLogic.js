import { useState, useEffect } from 'react';
import questions from './questions.json'; // Import questions
import { updateScores, calculateMBTI } from './scoring';

const useQuizLogic = () => {
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedCurrentQuestion = localStorage.getItem('currentQuestion');
    return savedCurrentQuestion !== null ? JSON.parse(savedCurrentQuestion) : 0;
  });
  const [scores, setScores] = useState(() => {
    const savedScores = localStorage.getItem('scores');
    return savedScores !== null ? JSON.parse(savedScores) : {
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0
    };
  });
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedSelectedAnswers = localStorage.getItem('selectedAnswers');
    return savedSelectedAnswers !== null ? JSON.parse(savedSelectedAnswers) : [];
  });

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
  }, [selectedAnswers]);

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0
    });
    setSelectedAnswers([]);
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('scores');
    localStorage.removeItem('selectedAnswers');
  };

  const handleAnswerOptionClick = (dimension, option, index) => {
    setScores(prevScores => updateScores(prevScores, dimension, option));
    const nextQuestion = index + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Calculate the user's MBTI type based on scores
      const mbtiType = calculateMBTI(scores);
      alert(`You have finished the quiz! Your MBTI type is: ${mbtiType}`);
      resetQuiz();
    }
  };

  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  return {
    currentQuestion,
    scores,
    selectedAnswers,
    handleAnswerOptionClick,
    handleSelectAnswer
  };
}

export default useQuizLogic;


