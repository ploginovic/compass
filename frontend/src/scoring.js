/**
 * scoring.js
 * 
 * This module provides functions to handle scoring logic for a quiz, particularly for calculating MBTI (Myers-Briggs Type Indicator) types.
 * 
 * Functions:
 * - `getOppositeDimension(dimension)`: Returns the opposite MBTI dimension for a given dimension.
 * - `updateScores(scores, dimension, option)`: Updates the scores based on the selected answer option.
 * - `calculateMBTI(scores)`: Calculates the MBTI type based on the scores.
 * - `calculateScores(scores)`: Returns both the breakdown of scores and the calculated MBTI type.
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

/**
 * Updates the scores based on the selected answer option.
 * 
 * @param {object} scores - The current scores.
 * @param {string} dimension - The MBTI dimension being updated.
 * @param {number} option - The selected answer option (Likert scale value from -3 to 3).
 * @returns {object} - The updated scores.
 */
export const updateScores = (scores, dimension, option) => {
  return {
    ...scores,
    [dimension]: scores[dimension] + option
  };
};

/**
 * Calculates the MBTI type based on the scores.
 * 
 * @param {object} scores - The current scores for each dimension.
 * @returns {string} - The four-letter MBTI type.
 * @example
 * const scores = { E: 5, I: 2, S: 1, N: 3, T: 4, F: 1, J: 6, P: 2 };
 * calculateMBTI(scores); // Returns 'ENTJ'
 */
export const calculateMBTI = (scores) => {
  const personalityType = 
    (scores['E'] >= scores['I'] ? 'E' : 'I') +  // Extroversion vs Introversion
    (scores['S'] >= scores['N'] ? 'S' : 'N') +  // Sensing vs Intuition
    (scores['T'] >= scores['F'] ? 'T' : 'F') +  // Thinking vs Feeling
    (scores['J'] >= scores['P'] ? 'J' : 'P');   // Judging vs Perceiving

  return personalityType;
};

/**
 * Returns the scores object and calculates the MBTI type.
 * 
 * @param {object} scores - The current scores for each dimension.
 * @returns {object} - An object containing both the score breakdown and the calculated MBTI type.
 * @example
 * const scores = { E: 5, I: 2, S: 1, N: 3, T: 4, F: 1, J: 6, P: 2 };
 * calculateScores(scores); 
 * // Returns { scores: { E: 5, I: 2, S: 1, N: 3, T: 4, F: 1, J: 6, P: 2 }, personalityType: 'ENTJ' }
 */
export const calculateScores = (scores) => {
  const personalityType = calculateMBTI(scores);  // Get the four-letter MBTI type

  return {
    scores,  // Return the full breakdown of scores
    personalityType  // Return the calculated MBTI type
  };
};
