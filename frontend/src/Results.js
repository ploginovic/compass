import React from 'react';
import { useLocation } from 'react-router-dom';
import specialtiesData from './SpecialtyOverview.json'; // Path to the specialties data
import mbtiData from './MBTI_specialties.json'; // Path to the MBTI-specialties mapping data
import './css/App.css'; // Ensure you import your global styles

const Results = () => {
  const location = useLocation();
  const finalScores = location.state?.finalScores;

  if (!finalScores) {
    return <p>No results available.</p>;
  }

  const { personalityType, scores } = finalScores;

  // Helper function to display the specialty details
  const renderSpecialtyDetails = (specialty) => (
    <div className="specialty-box" key={specialty.name}>
      <h3>{specialty.name}</h3>
      <p><strong>Current Curriculum:</strong> <a href={specialty.additional_info.current_curriculum.link}>{specialty.additional_info.current_curriculum.title}</a></p>
      <p><strong>Core Training Options:</strong> {Array.isArray(specialty.additional_info.core_training_options) ? specialty.additional_info.core_training_options.join(', ') : 'N/A'}</p>
      <p><strong>Indicative Length of Training:</strong> {specialty.additional_info.indicative_length_of_training || 'N/A'}</p>
      <p><strong>Exams:</strong> {specialty.additional_info.exams || 'N/A'}</p>
      <p><strong>Approved Sub-Specialties:</strong> {Array.isArray(specialty.additional_info.approved_sub_specialties) ? specialty.additional_info.approved_sub_specialties.join(', ') : 'N/A'}</p>
      <p><strong>Approved Dual CCT Pairings:</strong> {Array.isArray(specialty.additional_info.approved_dual_CCT_pairings) ? specialty.additional_info.approved_dual_CCT_pairings.join(', ') : 'N/A'}</p>
      {specialty.additional_info.competition_ratio && (
        <p><strong>Competition Ratio:</strong> {JSON.stringify(specialty.additional_info.competition_ratio)}</p>
      )}
    </div>
  );

  // Get specialties based on the user's MBTI type
  const specialtiesForPersonality = mbtiData[personalityType]?.specialties || [];

  return (
    <div className="content"> {/* Ensure all content is within the 'content' container */}
      <h1>Your MBTI Personality Type: {personalityType}</h1>

      <h2>Score Breakdown:</h2>
      <ul>
        <li>Extroversion (E): {scores.E}</li>
        <li>Introversion (I): {scores.I}</li>
        <li>Sensing (S): {scores.S}</li>
        <li>Intuition (N): {scores.N}</li>
        <li>Thinking (T): {scores.T}</li>
        <li>Feeling (F): {scores.F}</li>
        <li>Judging (J): {scores.J}</li>
        <li>Perceiving (P): {scores.P}</li>
      </ul>

      <h2>Suitable Specialties for {personalityType}:</h2>
      {specialtiesForPersonality.length > 0 ? (
        specialtiesForPersonality.map((specialtyName, index) => {
          const specialty = specialtiesData.specialties.find(s => s.name === specialtyName);
          return specialty && renderSpecialtyDetails(specialty);
        })
      ) : (
        <p>No specialties available for this personality type.</p>
      )}
    </div>
  );
};

export default Results;
