// Results.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import specialtiesData from './SpecialtyOverview.json'; // Path to the specialties data
import mbtiData from './MBTI_specialties.json'; // Path to the MBTI-specialties mapping data
import LadderDiagram from './careerTimeline'; // Import the LadderDiagram component
import './css/App.css'; // Global styles
import './css/SpecialtiesStyles.css'; // Import your specialties styles

const Results = () => {
  const location = useLocation();
  const finalScores = location.state?.finalScores;

  if (!finalScores) {
    return <p>No results available.</p>;
  }

  const { personalityType, scores } = finalScores;

  // Get specialties based on the user's MBTI type
  const specialtiesForPersonality =
    mbtiData[personalityType]?.specialties || [];

  // Get the first specialty name
  const firstSpecialtyName = specialtiesForPersonality[0] || 'GP';

  // Helper function to display the specialty details
  const renderSpecialtyDetails = (specialty) => (
    <div className="specialty-details" key={specialty.name}>
      <h3>{specialty.name}</h3>
      <p>
        <strong>Current Curriculum:</strong>{' '}
        <a href={specialty.additional_info.current_curriculum.link}>
          {specialty.additional_info.current_curriculum.title}
        </a>
      </p>
      <p>
        <strong>Core Training Options:</strong>{' '}
        {Array.isArray(specialty.additional_info.core_training_options)
          ? specialty.additional_info.core_training_options.join(', ')
          : 'N/A'}
      </p>
      <p>
        <strong>Indicative Length of Training:</strong>{' '}
        {specialty.additional_info.indicative_length_of_training || 'N/A'}
      </p>
      <p>
        <strong>Exams:</strong> {specialty.additional_info.exams || 'N/A'}
      </p>
      <p>
        <strong>Approved Sub-Specialties:</strong>{' '}
        {Array.isArray(specialty.additional_info.approved_sub_specialties)
          ? specialty.additional_info.approved_sub_specialties.join(', ')
          : 'N/A'}
      </p>
      <p>
        <strong>Approved Dual CCT Pairings:</strong>{' '}
        {Array.isArray(specialty.additional_info.approved_dual_CCT_pairings)
          ? specialty.additional_info.approved_dual_CCT_pairings.join(', ')
          : 'N/A'}
      </p>
      {specialty.additional_info.competition_ratio && (
        <p>
          <strong>Competition Ratio:</strong>{' '}
          {JSON.stringify(specialty.additional_info.competition_ratio)}
        </p>
      )}
    </div>
  );

  return (
    <div className="specialties-container">
      <h2>Your MBTI Personality Type: {personalityType}</h2>

      <h3>Score Breakdown:</h3>
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

      <h3>Suitable Specialties for {personalityType}:</h3>
      {specialtiesForPersonality.length > 0 ? (
        specialtiesForPersonality.map((specialtyName) => {
          const specialty = specialtiesData.specialties.find(
            (s) => s.name === specialtyName
          );
          return specialty && renderSpecialtyDetails(specialty);
        })
      ) : (
        <p>No specialties available for this personality type.</p>
      )}

      {/* Add the LadderDiagram component at the bottom */}
      <LadderDiagram endSpecialtyName={firstSpecialtyName} />
    </div>
  );
};

export default Results;