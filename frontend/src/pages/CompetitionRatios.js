// Empty page for now, just an idea
// Collating all competition ratios across the years is an easy win 
// And will be a useful resource to have on our website for people to explore
// Almost like a thing people refer to MedMap for
// But super easy to do
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import competitionData from '../data/competitionData.json'; // Adjust the path if necessary

const SpecialityCompetitionChart = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState([Object.keys(competitionData)[0]]);

  const handleSpecialtyChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    setSelectedSpecialties(selected);
  };

  // Prepare data for all selected specialties
  const data = selectedSpecialties.map((specialty) => {
    const specialtyData = competitionData[specialty];
    const years = Object.keys(specialtyData).sort();
    const applications = years.map((year) => specialtyData[year]['Applications']);
    const posts = years.map((year) => specialtyData[year]['Posts']);
    const competitionRatios = years.map((year) => specialtyData[year]['Competition ratio']);

    // Create labels that include applications and posts
    const labels = years.map(
      (year, index) => `Applications: ${applications[index]}, Posts: ${posts[index]}`
    );

    return {
      x: years,
      y: competitionRatios,
      type: 'scatter',
      mode: 'lines+markers',
      name: specialty,
      text: labels,
      textposition: 'top center',
      hovertemplate:
        `<b>${specialty}</b><br>` +
        'Year: %{x}<br>' +
        'Competition Ratio: %{y}<br>' +
        'Applications: %{text}<extra></extra>',
      marker: { size: 8 },
    };
  });

  // Find the maximum competition ratio among the selected specialties
  let maxY = 12;
  selectedSpecialties.forEach((specialty) => {
    const specialtyData = competitionData[specialty];
    const competitionRatios = Object.keys(specialtyData).map(
      (year) => specialtyData[year]['Competition ratio']
    );
    const specialtyMax = Math.max(...competitionRatios);
    if (specialtyMax > maxY) {
      maxY = specialtyMax;
    }
  });

  return (
    <div className="content">
      <div className="chart-container">
        <div className="dropdown-container">
          <label htmlFor="specialty-select">Select Specialties:</label>
          <select
            id="specialty-select"
            multiple
            value={selectedSpecialties}
            onChange={handleSpecialtyChange}
            size="10" // Adjust the size as needed
          >
            {Object.keys(competitionData).map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <Plot
          data={data}
          layout={{
            title: `Competition Ratios for Selected Specialties`,
            xaxis: { title: 'Year' },
            yaxis: {
              title: 'Competition Ratio',
              range: [1, maxY],
              autorange: false,
            },
            legend: { orientation: 'h', x: 0, y: -0.2 },
            margin: { t: 50, b: 100 },
            hovermode: 'closest',
          }}
          style={{ width: '100%', height: '600px' }}
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default SpecialityCompetitionChart;
