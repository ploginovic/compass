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
/**
 * scoring.js
 * 
 * This module provides functions to handle scoring logic for a quiz.
 * 
 * Functions:
 * - `getOppositeDimension(dimension)`: Returns the opposite MBTI dimension for a given dimension.
 * - `updateScores(scores, dimension, option)`: Updates the scores based on the selected answer option.
 * - `calculateScores(scores)`: Returns the scores object.
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
 * Returns the scores object.
 * 
 * @param {object} scores - The current scores.
 * @returns {object} - The scores object.
 */
export const calculateScores = (scores) => {
  return scores;
};
