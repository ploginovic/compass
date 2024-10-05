import React, { useState } from 'react';
import specialtiesData from '../data/SpecialtyOverview.json'; // Adjust the path as necessary
import mbtiData from '../data/MBTI_specialties.json'; // Adjust the path as necessary
import generalSurgeryData from '../data/GeneralSurgeryTestRequirements.json'; // Adjust the path as necessary
import '../components/features/Results/SpecialtiesStyles.css'; // Import the CSS file
import LadderDiagram from '../components/features/careerTimeline/CareerTimeline';

const Specialties = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedMBTI, setSelectedMBTI] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview'); // State for tab selection

  const handleSpecialtyClick = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const handleMBTIChange = (event) => {
    setSelectedMBTI(event.target.value);
  };

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

  const renderGeneralSurgeryContent = () => {
    if (!generalSurgeryData) return null;

    const stages = Object.keys(generalSurgeryData);

    switch (selectedTab) {
      case 'overview':
        return (
          <div>
            <h3>Overview</h3>
            {stages.map((stageKey, index) => {
              const stageData = generalSurgeryData[stageKey];
              return (
                <div key={index}>
                  <h4>{stageKey}</h4>
                  {stageData.Duration && (
                    <p>
                      <strong>Duration:</strong> {stageData.Duration}
                    </p>
                  )}
                  {stageData.Overview && (
                    <p>
                      <strong>Overview:</strong> {stageData.Overview}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        );
      case 'detailed':
        return (
          <div>
            <h3>Detailed View</h3>
            {stages.map((stageKey, index) => {
              const stageData = generalSurgeryData[stageKey];
              return (
                <div key={index}>
                  <h4>{stageKey}</h4>
                  {stageData.Duration && (
                    <p>
                      <strong>Duration:</strong> {stageData.Duration}
                    </p>
                  )}
                  {stageData.Requirements && (
                    <>
                      <p>
                        <strong>Requirements:</strong>
                      </p>
                      <ul>
                        {stageData.Requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {stageData.Overview && (
                    <p>
                      <strong>Overview:</strong> {stageData.Overview}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        );
      case 'yearly':
        return (
          <div>
            <h3>Year-by-Year Breakdown</h3>
            {stages.map((stageKey, index) => {
              const stageData = generalSurgeryData[stageKey];
              return (
                <div key={index}>
                  <h4>{stageKey}</h4>
                  {stageData.Years ? (
                    Object.keys(stageData.Years).map((yearKey, idx) => {
                      const yearData = stageData.Years[yearKey];
                      return (
                        <div key={idx} className="year-section">
                          <h5>
                            {yearKey} - {yearData.Stage || 'Stage'}
                          </h5>
                          {yearData.Curriculum && (
                            <>
                              <p>
                                <strong>Curriculum:</strong>
                              </p>
                              <ul>
                                {yearData.Curriculum.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          {yearData['Clinical Experience'] && (
                            <>
                              <p>
                                <strong>Clinical Experience:</strong>
                              </p>
                              <ul>
                                {yearData['Clinical Experience'].map(
                                  (exp, i) => (
                                    <li key={i}>{exp}</li>
                                  )
                                )}
                              </ul>
                            </>
                          )}
                          {yearData.Requirements && (
                            <>
                              <p>
                                <strong>Requirements:</strong>
                              </p>
                              <ul>
                                {yearData.Requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          {yearData.Exams && (
                            <>
                              <p>
                                <strong>Exams:</strong>
                              </p>
                              <ul>
                                {yearData.Exams.map((exam, i) => (
                                  <li key={i}>{exam}</li>
                                ))}
                              </ul>
                            </>
                          )}
                          {yearData['Additional Opportunities'] && (
                            <>
                              <p>
                                <strong>Additional Opportunities:</strong>
                              </p>
                              <ul>
                                {yearData['Additional Opportunities'].map(
                                  (opp, i) => (
                                    <li key={i}>{opp}</li>
                                  )
                                )}
                              </ul>
                            </>
                          )}
                          {yearData['Professional Development'] && (
                            <>
                              <p>
                                <strong>Professional Development:</strong>
                              </p>
                              <ul>
                                {yearData['Professional Development'].map(
                                  (pd, i) => (
                                    <li key={i}>{pd}</li>
                                  )
                                )}
                              </ul>
                            </>
                          )}
                          {yearData['Preparation for Consultancy'] && (
                            <>
                              <p>
                                <strong>Preparation for Consultancy:</strong>
                              </p>
                              <ul>
                                {yearData['Preparation for Consultancy'].map(
                                  (prep, i) => (
                                    <li key={i}>{prep}</li>
                                  )
                                )}
                              </ul>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p>No detailed year-by-year data available.</p>
                  )}
                </div>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="content">
      <div className="specialties-container">
        <h2>Specialties Page</h2>
        <p>
          Welcome to the Specialties page! Click on a specialty to see more
          details.
        </p>

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

        {/* General Surgery Section */}
        <div className="general-surgery-section">
          <h2>General Surgery Career Pathway</h2>
          <div className="tabs-container">
            <div className="tabs">
              <button
                onClick={() => setSelectedTab('overview')}
                className={selectedTab === 'overview' ? 'active' : ''}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedTab('detailed')}
                className={selectedTab === 'detailed' ? 'active' : ''}
              >
                Detailed View
              </button>
              <button
                onClick={() => setSelectedTab('yearly')}
                className={selectedTab === 'yearly' ? 'active' : ''}
              >
                Year-by-Year Breakdown
              </button>
            </div>
            <div className="tab-content">
              {renderGeneralSurgeryContent()}
            </div>
          </div>
        </div>

        <LadderDiagram />
      </div>
    </div>
  );
};

export default Specialties;