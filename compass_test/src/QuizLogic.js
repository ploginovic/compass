/**
 * Custom hook `useQuizLogic` that manages the state and logic for a quiz application.
 * 
 * This hook handles:
 * - Current question index (`currentQuestion`)
 * - User's scores for each dimension (`scores`)
 * - Selected answers for each question (`selectedAnswers`)
 * - List of answered questions (`answeredQuestions`)
 * 
 * State Persistence:
 * - The state is saved to and retrieved from localStorage to persist across sessions.
 * 
 * Functions:
 * - `resetQuiz`: Resets the quiz state and clears localStorage.
 * - `handleAnswerOptionClick`: Updates scores, selected answers, and answered questions when an answer option is selected.
 * 
 * Dependencies:
 * - `questions` from './questions.json': Array of quiz questions.
 * - `updateScores` and `calculateMBTI` from './scoring': Functions to update scores and calculate MBTI type.
 * 
 * @returns {object} - The current state and functions to manage the quiz logic.
 * @property {number} currentQuestion - The index of the current question.
 * @property {object} scores - The user's scores for each dimension.
 * @property {array} selectedAnswers - The selected answers for each question.
 * @property {array} answeredQuestions - The list of answered question IDs.
 * @property {function} handleAnswerOptionClick - Function to handle answer option selection.
 * @property {function} resetQuiz - Function to reset the quiz state.
 * 
 * @example
 * const {
 *   currentQuestion,
 *   scores,
 *   selectedAnswers,
 *   answeredQuestions,
 *   handleAnswerOptionClick
 * } = useQuizLogic();
 */
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
      newAnswers[index] = option; // or however you store the selected answer
      return newAnswers;
    });
    setAnsweredQuestions(prev => {
      const newAnswered = [...prev];
      if (!newAnswered.includes(index)) {
        newAnswered.push(index);
      }
      console.log('Updated Answered Questions:', newAnswered);
      return newAnswered;
    });

    const nextQuestion = index + 1;
    console.log('Updated Answered Questions:', answeredQuestions);
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Calculate the user's MBTI type based on scores
      const mbtiType = calculateMBTI(scores);
      alert(`You have finished the quiz! Your MBTI type is: ${mbtiType}`);
      resetQuiz();
    }
  };

  return {
    currentQuestion,
    scores,
    selectedAnswers,
    answeredQuestions,
    handleAnswerOptionClick
  };
}

export default useQuizLogic;
