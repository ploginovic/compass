import React, { useState } from 'react';
import specialtiesData from '../SpecialtyOverview.json'; // Adjust the path as necessary

const Specialties = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div>
      <h2>Specialties Page</h2>
      <p>Welcome to the Specialties page! Click on a specialty to see more details.</p>
      
      {selectedSpecialty && (
        <div style={boxStyle}>
          <h3>{selectedSpecialty.name}</h3>
          <p><strong>Current Curriculum:</strong> <a href={selectedSpecialty.additional_info.current_curriculum.link}>{selectedSpecialty.additional_info.current_curriculum.title}</a></p>
          <p><strong>Core Training Options:</strong> {Array.isArray(selectedSpecialty.additional_info.core_training_options) ? selectedSpecialty.additional_info.core_training_options.join(', ') : 'N/A'}</p>
          <p><strong>Indicative Length of Training:</strong> {selectedSpecialty.additional_info.indicative_length_of_training || 'N/A'}</p>
          <p><strong>Exams:</strong> {selectedSpecialty.additional_info.exams || 'N/A'}</p>
          <p><strong>Approved Sub-Specialties:</strong> {Array.isArray(selectedSpecialty.additional_info.approved_sub_specialties) ? selectedSpecialty.additional_info.approved_sub_specialties.join(', ') : 'N/A'}</p>
          <p><strong>Approved Dual CCT Pairings:</strong> {Array.isArray(selectedSpecialty.additional_info.approved_dual_CCT_pairings) ? selectedSpecialty.additional_info.approved_dual_CCT_pairings.join(', ') : 'N/A'}</p>
          {selectedSpecialty.additional_info.competition_ratio && (
            <p><strong>Competition Ratio:</strong> {JSON.stringify(selectedSpecialty.additional_info.competition_ratio)}</p>
          )}
        </div>
      )}

      <ul>
        {specialtiesData.specialties.sort((a, b) => a.name.localeCompare(b.name)).map((specialty, index) => (
          <li key={index}>
            <button onClick={() => handleSpecialtyClick(specialty)}>
              {specialty.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Specialties;