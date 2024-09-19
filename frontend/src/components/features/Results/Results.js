// Results.js

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import specialtiesData from '../../../data/SpecialtyOverview.json'; // Path to the specialties data
import mbtiData from '../../../data/MBTI_specialties.json'; // Path to the MBTI-specialties mapping data
import LadderDiagram from '../careerTimeline/CareerTimeline'; // Import the LadderDiagram component
import '../../../css/App.css'; // Global styles
import './Results.css'; // Import your specialties styles

const Results = () => {
  const location = useLocation();
  const [expandedPanel, setExpandedPanel] = useState(null); // State for tracking expanded panels
  const finalScores = location.state?.finalScores;

  if (!finalScores) {
    return <p>No results available.</p>;
  }

  const { personalityType, scores } = finalScores;

  // Get specialties based on the user's MBTI type
  const specialtiesForPersonality = mbtiData[personalityType]?.specialties || [];

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
      <div className='content'>
        <div className="spectrum-bar">
          <div className="spectrum-labels">
            <span>{label1}: {score1}</span>
            <span>{label2}: {score2}</span>
          </div>
          <div className="spectrum-container">
            <div className="spectrum-bar-center"></div>
            <div className="spectrum-indicator" style={{ left: `${percentage}%` }}></div>
          </div>
          <div className="spectrum-scale">
            <span>-{maxScore}</span>
            <span>0</span>
            <span>+{maxScore}</span>
          </div>
        </div>
      </div>
    );
  };

  // Function to handle panel expansion
  const togglePanel = (panel) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  return (
    <div className="results-container">
      <div className="panel">
        <div className="panel-header" onClick={() => togglePanel('traits')}>
          <h2>Your MBTI Personality Type: {personalityType}</h2>
        </div>
        {expandedPanel === 'traits' && (
          <div className="panel-content">
            <h3>Score Breakdown:</h3>
            {renderSpectrumBar('Extroversion (E)', 'Introversion (I)', scores.E, scores.I)}
            {renderSpectrumBar('Sensing (S)', 'Intuition (N)', scores.S, scores.N)}
            {renderSpectrumBar('Thinking (T)', 'Feeling (F)', scores.T, scores.F)}
            {renderSpectrumBar('Judging (J)', 'Perceiving (P)', scores.J, scores.P)}
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-header" onClick={() => togglePanel('specialties')}>
          <h2>Suggested Specialties for {personalityType}</h2>
        </div>
        {expandedPanel === 'specialties' && (
          <div className="panel-content">
            <div className="specialties-grid">
              {specialtiesForPersonality.length > 0 ? (
                specialtiesForPersonality.map((specialtyName) => {
                  const specialty = specialtiesData.specialties.find(
                    (s) => s.name === specialtyName
                  );
                  return (
                    <div key={specialtyName} className="specialty-item">
                      <button className="specialty-button" onClick={() => togglePanel(specialtyName)}>
                        {specialtyName}
                      </button>
                      {expandedPanel === specialtyName && specialty && renderSpecialtyDetails(specialty)}
                    </div>
                  );
                })
              ) : (
                <p>No specialties available for this personality type.</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="panel">
        <div className="panel-header" onClick={() => togglePanel('pathway')}>
          <h2>Pathway to Your Desired Specialty</h2>
        </div>
        {expandedPanel === 'pathway' && (
          <div className="panel-content">
            <LadderDiagram endSpecialtyName={firstSpecialtyName} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
