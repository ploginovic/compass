// Empty page for now, just an idea
// Collating all competition ratios across the years is an easy win 
// And will be a useful resource to have on our website for people to explore
// Almost like a thing people refer to MedMap for
// But super easy to do
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import competitionData from '../data/competitionData.json'; // Adjust the path if necessary
//import './SpecialityCompetitionChart.css'; // Optional CSS for styling


const SpecialityCompetitionChart = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState(Object.keys(competitionData)[0]);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  const specialtyData = competitionData[selectedSpecialty];
  const years = Object.keys(specialtyData).sort();
  const applications = years.map((year) => specialtyData[year]['Applications']);
  const posts = years.map((year) => specialtyData[year]['Posts']);
  const competitionRatios = years.map((year) => specialtyData[year]['Competition ratio']);

  // Create labels that include applications and posts
  const labels = years.map(
    (year, index) => `Applications: ${applications[index]}, Posts: ${posts[index]}`
  );

  return (
    <div className="content">
      <div className="chart-container">
        <div className="dropdown-container">
          <label htmlFor="specialty-select">Select Specialty:</label>
          <select id="specialty-select" value={selectedSpecialty} onChange={handleSpecialtyChange}>
            {Object.keys(competitionData).map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <Plot
          data={[
            {
              x: years,
              y: competitionRatios,
              type: 'scatter',
              mode: 'lines+markers+text',
              name: 'Competition Ratio',
              text: labels,
              textposition: 'top center',
              marker: { color: 'blue' },
            },
          ]}
          layout={{
            title: `Competition Ratios for ${selectedSpecialty}`,
            xaxis: { title: 'Year' },
            yaxis: { title: 'Competition Ratio' },
            legend: { orientation: 'h', x: 0, y: -0.2 },
            margin: { t: 50, b: 100 },
          }}
          style={{ width: '100%', height: '600px' }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default SpecialityCompetitionChart;
