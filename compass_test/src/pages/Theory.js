import React from 'react';
import '../css/TheoryStyles.css'; // Make sure to create this CSS file

const Theory = () => {
  return (
    <div className="theory-container">
      <h2>Theory of Personality Types</h2>
      <p>Welcome to the Theory page! Here, we explore the various theories and research behind personality types and how they can influence career paths in the medical field.</p>
      
      <section>
        <h3>Introduction to Personality Theory</h3>
        <p>Personality theory is a branch of psychology that studies personality and individual differences. Its areas of focus include:</p>
        <ul>
          <li>The construction of a coherent picture of the individual and their major psychological processes</li>
          <li>Investigation of individual psychological differences</li>
          <li>Investigation of human nature and psychological similarities between individuals</li>
        </ul>
      </section>

      <section>
        <h3>MBTI and Medical Careers</h3>
        <p>The Myers-Briggs Type Indicator (MBTI) is a popular tool used to categorize individuals into one of 16 personality types. Understanding your MBTI type can help identify suitable career paths, particularly in the medical field where different roles require different strengths and skills.</p>
        <blockquote>
          "The good physician treats the disease; the great physician treats the patient who has the disease." - William Osler
        </blockquote>
      </section>

      <section>
        <h3>Research and Findings</h3>
        <p>Numerous studies have been conducted to explore the relationship between personality types and career success in the medical field. Key findings include:</p>
        <ol>
          <li>Certain personality types tend to excel in specific medical specialties.</li>
          <li>Understanding your personality type can help improve patient care and job satisfaction.</li>
          <li>Personal growth and professional development can be guided by insights gained from personality assessments.</li>
        </ol>
      </section>

      <section>
        <h3>Conclusion</h3>
        <p>Personality theory provides valuable insights into how individuals can best fit into different medical careers. By understanding your personality type, you can make more informed decisions about your career path and find greater fulfillment in your work.</p>
      </section>
    </div>
  );
};

export default Theory;
