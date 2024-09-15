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

  // Function to render the spectrum bars with actual scores next to labels
  const renderSpectrumBar = (label1, label2, score1, score2) => {
    const maxScore = 5; // Assuming maximum score per trait is 5
    const difference = score1 - score2; // Range from -5 to +5
    const percentage = ((difference + maxScore) / (2 * maxScore)) * 100; // Convert to percentage for positioning

    return (
      <div style={{ marginBottom: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
          }}
        >
          <span>
            {label1}: {score1}
          </span>
          <span>
            {label2}: {score2}
          </span>
        </div>
        <div
          style={{
            position: 'relative',
            height: '20px',
            background: '#e0e0e0',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '2px',
              height: '100%',
              background: '#000',
              transform: 'translateX(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${percentage}%`,
              top: 0,
              width: '10px',
              height: '20px',
              background: '#007bff',
              borderRadius: '5px',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '5px',
          }}
        >
          <span>-{maxScore}</span>
          <span>0</span>
          <span>+{maxScore}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="specialties-container">
      <h2>Your MBTI Personality Type: {personalityType}</h2>

      <h3>Score Breakdown:</h3>
      {renderSpectrumBar(
        'Extroversion (E)',
        'Introversion (I)',
        scores.E,
        scores.I
      )}
      {renderSpectrumBar(
        'Sensing (S)',
        'Intuition (N)',
        scores.S,
        scores.N
      )}
      {renderSpectrumBar(
        'Thinking (T)',
        'Feeling (F)',
        scores.T,
        scores.F
      )}
      {renderSpectrumBar(
        'Judging (J)',
        'Perceiving (P)',
        scores.J,
        scores.P
      )}

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