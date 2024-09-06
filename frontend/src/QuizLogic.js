import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import questions from './questions.json';
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
  
  const [page, setPage] = useState(0);  // New state to handle pagination
  const questionsPerPage = 7;  // Define how many questions per page
  
  const navigate = useNavigate();  // Initialize the useNavigate hook

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    console.log('Selected Answers:', selectedAnswers); 
  }, [selectedAnswers]);

  useEffect(() => {
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    console.log('Answered Questions:', answeredQuestions); 
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
    setPage(0);  // Reset the page to 0
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
      const finalScores = calculateScores(scores);
      console.log("Final Scores:", finalScores);

      // Navigate to results page and pass finalScores in the state
      navigate('/results', { state: { finalScores } });
      
      resetQuiz();
    }

    // If it's the 7th question on the current page, move to the next page
    if ((index + 1) % questionsPerPage === 0) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSelectAnswer = (answer, index) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const goToNextPage = () => {
    if ((page + 1) * questionsPerPage < questions.length) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return {
    currentQuestion,
    scores,
    selectedAnswers,
    answeredQuestions,
    handleAnswerOptionClick,
    handleSelectAnswer,
    resetQuiz,
    page,  // Expose page state
    goToNextPage,  // Expose function to move to the next page
    goToPreviousPage,  // Expose function to move to the previous page
    questionsPerPage  // Expose questions per page
  };
};

export default useQuizLogic;
