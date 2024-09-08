import React, { useState } from 'react';
import specialtiesData from '../SpecialtyOverview.json'; // Adjust the path as necessary
import mbtiData from '../MBTI_specialties.json'; // Adjust the path as necessary
import '../css/SpecialtiesStyles.css'; // Import the CSS file
import LadderDiagram from '../careerTimeline';

const Specialties = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedMBTI, setSelectedMBTI] = useState('');

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const handleMBTIChange = (event) => {
    setSelectedMBTI(event.target.value);
  };

  const renderSpecialtyDetails = (specialty) => (
    <div className="specialty-details" key={specialty.name}>
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

  return (
    <div className="specialties-container">
      <h2>Specialties Page</h2>
      <p>Welcome to the Specialties page! Click on a specialty to see more details.</p>

      {selectedSpecialty && renderSpecialtyDetails(selectedSpecialty)}

      <ul>
        {specialtiesData.specialties
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((specialty, index) => (
            <li key={index}>
              <button onClick={() => handleSpecialtyClick(specialty)}>
                {specialty.name}
              </button>
            </li>
          ))}
      </ul>

      <h2>MBTI Personalities</h2>
      <select
        value={selectedMBTI}
        onChange={handleMBTIChange}
        className="mbti-selector"
      >
        <option value="">Select MBTI Personality</option>
        {Object.keys(mbtiData).map((mbtiType, index) => (
          <option value={mbtiType} key={index}>
            {mbtiType}
          </option>
        ))}
      </select>

      {selectedMBTI && (
        <div className="mbti-section">
          <h3>{mbtiData[selectedMBTI].type}</h3>
          {mbtiData[selectedMBTI].specialties.map((specialtyName, index) => {
            const specialty = specialtiesData.specialties.find(
              (s) => s.name === specialtyName
            );
            return specialty && renderSpecialtyDetails(specialty);
          })}
        </div>
      )}

      <LadderDiagram />
    </div>
  );
};

export default Specialties;
