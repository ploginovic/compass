// Results.js

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import specialtiesData from '../../../data/SpecialtyOverview.json'; // Adjust the path as necessary
import mbtiData from '../../../data/MBTI_specialties.json'; // Adjust the path as necessary
import mbtiDescriptions from '../../../data/MBTI_descriptions.json'; // Import MBTI descriptions
import personalitySpecialtyDescriptions from '../../../data/PersonalitySpecialtyDescriptions.json'; // Import the new JSON file
import LadderDiagram from '../careerTimeline/CareerTimeline'; // Import the LadderDiagram component
import '../../../css/App.css'; // Global styles
import './Results.css'; // Import your specialties styles

const Results = () => {
  const location = useLocation();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null); // State for the selected specialty
  const [chosenSpecialty, setChosenSpecialty] = useState(null); // State for the specialty chosen for the ladder
  const [loading, setLoading] = useState(false); // State for loading bar
  const [showPanel3, setShowPanel3] = useState(false); // State to control visibility of Panel 3
  const [showCompareOverlay, setShowCompareOverlay] = useState(false); // State for compare overlay
  const [compareSpecialty1, setCompareSpecialty1] = useState(null); // State for first specialty in comparison
  const [compareSpecialty2, setCompareSpecialty2] = useState(null); // State for second specialty in comparison

  const finalScores = location.state?.finalScores;

  // Get specialties based on the user's MBTI type
  const personalityType = finalScores?.personalityType || '';
  const scores = finalScores?.scores || {};

  const personalityDescription = mbtiDescriptions[personalityType] || 'Description not available.';

  const specialtiesForPersonality = mbtiData[personalityType]?.specialties || [];

  // Get the first specialty name
  const firstSpecialtyName = specialtiesForPersonality[0] || 'GP';

  // Initialize chosenSpecialty with firstSpecialtyName if not set
  const initialChosenSpecialty = chosenSpecialty || firstSpecialtyName;

  // Get list of specialties not in specialtiesForPersonality
  const specialtiesNotListed = specialtiesData.specialties
    .map((specialty) => specialty.name)
    .filter((name) => !specialtiesForPersonality.includes(name));

  // Combine all specialties for dropdowns
  const allSpecialties = specialtiesData.specialties.map((specialty) => specialty.name);

  // Prepopulate compareSpecialty1 and compareSpecialty2
  useEffect(() => {
    if (!compareSpecialty1 && specialtiesForPersonality.length > 0) {
      const specialty = specialtiesData.specialties.find(
        (s) => s.name === specialtiesForPersonality[0]
      );
      setCompareSpecialty1(specialty);
    }
    if (!compareSpecialty2 && specialtiesForPersonality.length > 1) {
      const specialty = specialtiesData.specialties.find(
        (s) => s.name === specialtiesForPersonality[1]
      );
      setCompareSpecialty2(specialty);
    }
  }, [compareSpecialty1, compareSpecialty2, specialtiesForPersonality]);

  if (!finalScores) {
    return <p>No results available.</p>;
  }

  // Helper function to display the specialty details
  const renderSpecialtyDetails = (specialty) => {
    // Fetch the personalized description
    const specialtyName = specialty.name;
    const personalitySpecialtyDescription =
      personalitySpecialtyDescriptions[personalityType]?.[specialtyName] ||
      'No description available for this specialty and personality combination.';

    return (
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
        {/* Updated section for 'Why This Specialty Fits Your Personality' */}
        <div className="why-specialty">
          <h4>Why This Specialty Fits Your Personality</h4>
          <p>{personalitySpecialtyDescription}</p>
        </div>
      </div>
    );
  };

  // Function to render the spectrum bars with actual scores next to labels
  const renderSpectrumBar = (label1, label2, score1, score2) => {
    const maxScore = 5; // Assuming maximum score per trait is 5
    const difference = score1 - score2; // Range from -5 to +5
    const percentage = ((difference + maxScore) / (2 * maxScore)) * 100; // Convert to percentage for positioning

    return (
      <div className="content">
        <div className="spectrum-bar">
          <div className="spectrum-labels">
            <span>
              {label1}: {score1}
            </span>
            <span>
              {label2}: {score2}
            </span>
          </div>
          <div className="spectrum-container">
            <div className="spectrum-bar-center"></div>
            <div
              className="spectrum-indicator"
              style={{ left: `${percentage}%` }}
            ></div>
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
      setShowPanel3(false);

      // Simulate a 2-second loading time
      setTimeout(() => {
        setLoading(false);
        setShowPanel3(true);
      }, 2000);
    }
  };

  const handleDropdownChange = (e) => {
    const specialtyName = e.target.value;
    if (specialtyName) {
      const specialty = specialtiesData.specialties.find(
        (s) => s.name === specialtyName
      );
      setSelectedSpecialty(specialty);
    }
  };

  const handleCompareSpecialtyChange = (e, specialtyNumber) => {
    const specialtyName = e.target.value;
    if (specialtyName) {
      const specialty = specialtiesData.specialties.find(
        (s) => s.name === specialtyName
      );
      if (specialtyNumber === 1) {
        setCompareSpecialty1(specialty);
      } else if (specialtyNumber === 2) {
        setCompareSpecialty2(specialty);
      }
    } else {
      if (specialtyNumber === 1) {
        setCompareSpecialty1(null);
      } else if (specialtyNumber === 2) {
        setCompareSpecialty2(null);
      }
    }
  };

  // Function to render the comparison table
  const renderComparisonTable = () => {
    const dataKeys = [
      'Current Curriculum',
      'Core Training Options',
      'Indicative Length of Training',
      'Exams',
      'Approved Sub-Specialties',
      'Approved Dual CCT Pairings',
      'Competition Ratio',
    ];

    const specialtyData = (specialty) => ({
      'Current Curriculum': (
        <a href={specialty.additional_info.current_curriculum.link}>
          {specialty.additional_info.current_curriculum.title}
        </a>
      ),
      'Core Training Options': Array.isArray(
        specialty.additional_info.core_training_options
      )
        ? specialty.additional_info.core_training_options.join(', ')
        : 'N/A',
      'Indicative Length of Training':
        specialty.additional_info.indicative_length_of_training || 'N/A',
      'Exams': specialty.additional_info.exams || 'N/A',
      'Approved Sub-Specialties': Array.isArray(
        specialty.additional_info.approved_sub_specialties
      )
        ? specialty.additional_info.approved_sub_specialties.join(', ')
        : 'N/A',
      'Approved Dual CCT Pairings': Array.isArray(
        specialty.additional_info.approved_dual_CCT_pairings
      )
        ? specialty.additional_info.approved_dual_CCT_pairings.join(', ')
        : 'N/A',
      'Competition Ratio': specialty.additional_info.competition_ratio
        ? JSON.stringify(specialty.additional_info.competition_ratio)
        : 'N/A',
    });

    const specialty1Data = compareSpecialty1
      ? specialtyData(compareSpecialty1)
      : {};
    const specialty2Data = compareSpecialty2
      ? specialtyData(compareSpecialty2)
      : {};

    return (
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>{compareSpecialty1?.name || 'Select Specialty'}</th>
            <th>{compareSpecialty2?.name || 'Select Specialty'}</th>
          </tr>
        </thead>
        <tbody>
          {dataKeys.map((key) => (
            <tr key={key}>
              <td className="compare-feature">{key}</td>
              <td className="compare-value">
                {specialty1Data[key] || 'N/A'}
              </td>
              <td className="compare-value">
                {specialty2Data[key] || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="results-container">
      {/* Panel 1 */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-number">1</div>
          <h2>Your MBTI Personality Type: {personalityType}</h2>
        </div>
        <div className="panel-content">
          <h3>Personality Type Description</h3>
          <p className="personality-description">{personalityDescription}</p>

          <h3>Score Breakdown:</h3>
          {renderSpectrumBar('Extroversion (E)', 'Introversion (I)', scores.E, scores.I)}
          {renderSpectrumBar('Sensing (S)', 'Intuition (N)', scores.S, scores.N)}
          {renderSpectrumBar('Thinking (T)', 'Feeling (F)', scores.T, scores.F)}
          {renderSpectrumBar('Judging (J)', 'Perceiving (P)', scores.J, scores.P)}
        </div>
      </div>

      {/* Panel 2 */}
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
                    className={`specialty-item ${
                      selectedSpecialty && selectedSpecialty.name === specialtyName
                        ? 'selected'
                        : ''
                    }`}
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
            {/* Dropdown for specialties not listed above */}
            <div className="specialty-dropdown">
              <label htmlFor="other-specialty">
                Choose Specialty Not Listed Above:
              </label>
              <select id="other-specialty" onChange={handleDropdownChange}>
                <option value="">Select a Specialty</option>
                {specialtiesNotListed.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedSpecialty && (
            <div className="specialty-details-panel">
              {renderSpecialtyDetails(selectedSpecialty)}
            </div>
          )}
        </div>
        <div className="compare-choose-buttons">
          <button
            className="compare-specialties-button"
            onClick={() => setShowCompareOverlay(true)}
          >
            Compare Specialties
          </button>
          <button
            className="choose-specialty-button"
            onClick={handleChooseSpecialty}
            disabled={!selectedSpecialty}
          >
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

      {/* Panel 3 */}
      {showPanel3 && (
        <div className="panel">
          <div className="panel-header">
            <div className="panel-number">3</div>
            <h2>Pathway to Your Desired Specialty</h2>
          </div>
          <div className="panel-content">
            <LadderDiagram endSpecialtyName={chosenSpecialty || initialChosenSpecialty} />
          </div>
        </div>
      )}

      {/* Compare Overlay */}
      {showCompareOverlay && (
        <div className="compare-overlay">
          <div className="compare-overlay-content">
            <button
              className="close-overlay-button"
              onClick={() => setShowCompareOverlay(false)}
            >
              &times;
            </button>
            <h2 className="compare-overlay-title">Compare Specialties</h2>
            <div className="compare-columns">
              <div className="compare-column">
                <select
                  value={compareSpecialty1 ? compareSpecialty1.name : ''}
                  onChange={(e) => handleCompareSpecialtyChange(e, 1)}
                >
                  {allSpecialties.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="compare-column">
                <select
                  value={compareSpecialty2 ? compareSpecialty2.name : ''}
                  onChange={(e) => handleCompareSpecialtyChange(e, 2)}
                >
                  {allSpecialties.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {renderComparisonTable()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;