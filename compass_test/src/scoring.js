// scoring.js

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
  