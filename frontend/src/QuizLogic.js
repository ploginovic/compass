import { useState, useEffect } from 'react';
import questions from './questions.json'; // Import questions
import { updateScores, calculateScores } from './scoring';

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
  const [answeredQuestions, setAnsweredQuestions] = useState(() => {
    const savedAnsweredQuestions = localStorage.getItem('answeredQuestions');
    return savedAnsweredQuestions !== null ? JSON.parse(savedAnsweredQuestions) : [];
  });

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    console.log('Selected Answers:', selectedAnswers); // Log selected answers
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    console.log('Answered Questions:', answeredQuestions); // Log answered questions
  }, [answeredQuestions]);

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
    setAnsweredQuestions([]);
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('scores');
    localStorage.removeItem('selectedAnswers');
    localStorage.removeItem('answeredQuestions');
  };

  const handleAnswerOptionClick = (dimension, option, index) => {
    setScores(prevScores => updateScores(prevScores, dimension, option));
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = option;
      return newAnswers;
    });
    setAnsweredQuestions(prev => {
      const newAnswered = [...prev];
      if (!newAnswered.includes(index)) {
        newAnswered.push(index);
      }
      return newAnswered;
    });

    const nextQuestion = index + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Display the user's scores
      const finalScores = calculateScores(scores);
      alert(`You have finished the quiz! Your scores are: ${JSON.stringify(finalScores)}`);
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
    answeredQuestions,
    handleAnswerOptionClick,
    handleSelectAnswer,
    resetQuiz
  };
}

export default useQuizLogic;

