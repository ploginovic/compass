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
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); // State for the selected specialty
  const [chosenSpecialty, setChosenSpecialty] = useState(null); // State for the specialty chosen for the ladder
  const [loading, setLoading] = useState(false); // State for loading bar
  const [showPanel3, setShowPanel3] = useState(false); // State to control visibility of Panel 3

  const finalScores = location.state?.finalScores;

  if (!finalScores) {
    return <p>No results available.</p>;
  }

  const { personalityType, scores } = finalScores;

  // Get specialties based on the user's MBTI type
  const specialtiesForPersonality = mbtiData[personalityType]?.specialties || [];

  // Get the first specialty name
  const firstSpecialtyName = specialtiesForPersonality[0] || 'GP';

  // Initialize chosenSpecialty with firstSpecialtyName if not set
  if (!chosenSpecialty) {
    setChosenSpecialty(firstSpecialtyName);
  }

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

  const handleChooseSpecialty = () => {
    if (selectedSpecialty) {
      setChosenSpecialty(selectedSpecialty.name);
      setLoading(true);

      // Simulate a 2-second loading time
      setTimeout(() => {
        setLoading(false);
        setShowPanel3(true);
      }, 2000);
    }
  };

  return (
    <div className="results-container">
      <div className="panel">
        <div className="panel-header">
          <div className="panel-number">1</div>
          <h2>Your MBTI Personality Type: {personalityType}</h2>
        </div>
        <div className="panel-content">
          <h3>Score Breakdown:</h3>
          {renderSpectrumBar('Extroversion (E)', 'Introversion (I)', scores.E, scores.I)}
          {renderSpectrumBar('Sensing (S)', 'Intuition (N)', scores.S, scores.N)}
          {renderSpectrumBar('Thinking (T)', 'Feeling (F)', scores.T, scores.F)}
          {renderSpectrumBar('Judging (J)', 'Perceiving (P)', scores.J, scores.P)}
          {/* Removed the Next button */}
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-number">2</div>
          <h2>Suggested Specialties for {personalityType}</h2>
        </div>
        <div className="panel-content specialties-panel">
          <div className="specialties-list">
            {specialtiesForPersonality.length > 0 ? (
              specialtiesForPersonality.map((specialtyName, index) => {
                const specialty = specialtiesData.specialties.find(
                  (s) => s.name === specialtyName
                );
                return (
                  <div
                    key={specialtyName}
                    className={`specialty-item ${selectedSpecialty && selectedSpecialty.name === specialtyName ? 'selected' : ''}`}
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    <span className="specialty-number">{index + 1}</span>
                    <span className="specialty-name">{specialtyName}</span>
                  </div>
                );
              })
            ) : (
              <p>No specialties available for this personality type.</p>
            )}
          </div>
          {selectedSpecialty && (
            <div className="specialty-details-panel">
              {renderSpecialtyDetails(selectedSpecialty)}
            </div>
          )}
        </div>
        <div className="choose-specialty-button-container">
          <button className="choose-specialty-button" onClick={handleChooseSpecialty}>
            Choose Specialty
          </button>
        </div>
        {loading && (
          <div className="loading-bar-container">
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        )}
      </div>

      {showPanel3 && (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-number">3</div>
            <h2>Pathway to Your Desired Specialty</h2>
          </div>
          <div className="panel-content">
            <LadderDiagram endSpecialtyName={chosenSpecialty} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;