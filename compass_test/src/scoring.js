/**
 * scoring.js
 * 
 * This module provides functions to handle scoring logic for a quiz, particularly for calculating MBTI (Myers-Briggs Type Indicator) types.
 * 
 * Functions:
 * - `getOppositeDimension(dimension)`: Returns the opposite MBTI dimension for a given dimension.
 * - `updateScores(scores, dimension, option)`: Updates the scores based on the selected answer option.
 * - `calculateMBTI(scores)`: Calculates the MBTI type based on the scores.
 * 
 * @module scoring
 */

/**
 * Returns the opposite MBTI dimension for a given dimension.
 * 
 * @param {string} dimension - The MBTI dimension ('E', 'I', 'S', 'N', 'T', 'F', 'J', 'P').
 * @returns {string} - The opposite MBTI dimension.
 * @example
 * getOppositeDimension('E'); // Returns 'I'
 */

export const getOppositeDimension = (dimension) => {
    return dimension === 'E' ? 'I' : 
           dimension === 'I' ? 'E' :
           dimension === 'S' ? 'N' :
           dimension === 'N' ? 'S' :
           dimension === 'T' ? 'F' :
           dimension === 'F' ? 'T' :
           dimension === 'J' ? 'P' : 'J';
  };
  
  export const updateScores = (scores, dimension, option) => {
    const oppositeDimension = getOppositeDimension(dimension);
  
    return {
      ...scores,
      [dimension]: option === 'A' ? scores[dimension] + 1 : scores[dimension],
      [oppositeDimension]: option === 'B' ? scores[oppositeDimension] + 1 : scores[oppositeDimension]
    };
  };
  
  export const calculateMBTI = (scores) => {
    return `${scores.E >= scores.I ? 'E' : 'I'}${scores.S >= scores.N ? 'S' : 'N'}${scores.T >= scores.F ? 'T' : 'F'}${scores.J >= scores.P ? 'J' : 'P'}`;
  };
  