// Empty page for now, just an idea
// Collating all competition ratios across the years is an easy win 
// And will be a useful resource to have on our website for people to explore
// Almost like a thing people refer to MedMap for
// But super easy to do
import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import competitionData from '../data/competitionData.json'; // Adjust the path if necessary
import { MultiSelect } from 'react-multi-select-component';
import '../css/SpecialityCompetitionChart.css'; // Import the CSS file

const SpecialityCompetitionChart = () => {
  // Create options for the MultiSelect component
  const specialtyOptions = Object.keys(competitionData).map((specialty) => ({
    label: specialty,
    value: specialty,
  }));

  // Set initial selected specialties
  const [selectedSpecialties, setSelectedSpecialties] = useState([specialtyOptions[0]]);

  // Prepare data for all selected specialties
  const data = selectedSpecialties.map((specialtyOption) => {
    const specialty = specialtyOption.value;
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
        '%{text}<extra></extra>',
      marker: { size: 8 },
    };
  });

  // Find the maximum competition ratio among the selected specialties
  let maxY = 12;
  selectedSpecialties.forEach((specialtyOption) => {
    const specialty = specialtyOption.value;
    const specialtyData = competitionData[specialty];
    const competitionRatios = Object.keys(specialtyData).map(
      (year) => specialtyData[year]['Competition ratio']
    );
    const specialtyMax = Math.max(...competitionRatios);
    if (specialtyMax > maxY) {
      maxY = specialtyMax;
    }
  });

  // Handle the case when no specialties are selected
  if (selectedSpecialties.length === 0) {
    return (
      <div className="content">
        <div className="chart-container">
          <div className="dropdown-container">
            <label htmlFor="specialty-select">Select Specialties:</label>
            <div className="multiselect-wrapper">
              <MultiSelect
                options={specialtyOptions}
                value={selectedSpecialties}
                onChange={setSelectedSpecialties}
                labelledBy="Select"
                hasSelectAll={false}
                overrideStrings={{
                  selectSomeItems: "Select Specialties",
                  allItemsAreSelected: "All Specialties Selected",
                  selectAll: "Select All",
                  search: "Search",
                }}
              />
            </div>
          </div>
          <div>Please select at least one specialty to display the chart.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="chart-container">
        <div className="dropdown-container">
          <label htmlFor="specialty-select">Select Specialties:</label>
          <div className="multiselect-wrapper">
            <MultiSelect
              options={specialtyOptions}
              value={selectedSpecialties}
              onChange={setSelectedSpecialties}
              labelledBy="Select"
              hasSelectAll={false}
              overrideStrings={{
                selectSomeItems: "Select Specialties",
                allItemsAreSelected: "All Specialties Selected",
                selectAll: "Select All",
                search: "Search",
              }}
            />
          </div>
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
            plot_bgcolor: 'var(--background-color)',
            paper_bgcolor: 'var(--background-color)',
            font: {
              color: 'var(--text-color)',
            },
          }}
          style={{ width: '100%', height: '600px' }}
          useResizeHandler={true}
          className="responsive-plot"
          config={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default SpecialityCompetitionChart;


/// Night 
/// All the other considerations:
///  - on calls  
///  - difficulty rating
//// – Be aware of bias propagation 