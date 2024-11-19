// Pathfinder.js

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Pathfinder = () => {
  const [data, setData] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [boxData, setBoxData] = useState({
    BMBS: 'BMBS',
    N1_1: '',
    N1_2: '',
    N2_1: '',
    durations: {
      dur_N1_1: '',
      dur_N1_2: '',
    },
  });

  useEffect(() => {
    Papa.parse('/PathfinderMaster.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);

        // Extract specialties for the dropdown menu
        const specialtyNames = results.data
          .map((row) => row['Specialty Name'])
          .filter(Boolean);
        const uniqueSpecialties = Array.from(new Set(specialtyNames));
        setSpecialties(uniqueSpecialties);
      },
      error: function (error) {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  useEffect(() => {
    if (selectedSpecialty && data.length > 0) {
      // Find the row corresponding to the selected specialty
      const selectedRow = data.find(
        (row) => row['Specialty Name'] === selectedSpecialty
      );

      if (selectedRow) {
        // Extract the values for the boxes
        const boxValues = {
          BMBS: 'BMBS',
          N1_1: selectedRow['N1_1'] || '',
          N1_2: selectedRow['N1_2'] || '',
          N2_1: selectedRow['N2_1'] || '',
          durations: {
            dur_N1_1: selectedRow['dur_N1_1'] || '',
            dur_N1_2: selectedRow['dur_N1_2'] || '',
          },
        };

        setBoxData(boxValues);
      }
    }
  }, [selectedSpecialty, data]);

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
  };

  // Responsive design: get window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to measure text width
  const getTextWidth = (text, font = '16px Arial') => {
    if (typeof document === 'undefined') return 100; // Default width for server-side rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = font;
    return context.measureText(text).width;
  };

  const arrowHeadLength = 10;

  // Calculate box widths based on label lengths
  const boxWidths = {
    BMBS: getTextWidth(boxData.BMBS) + 20,
    N1_1: boxData.N1_1 ? getTextWidth(boxData.N1_1) + 20 : 0,
    N1_2: boxData.N1_2 ? getTextWidth(boxData.N1_2) + 20 : 0,
    N2_1: getTextWidth(boxData.N2_1) + 20,
  };

  // Adjust N1_1 and N1_2 widths to be the same if both exist
  if (boxData.N1_1 && boxData.N1_2) {
    const maxN1Width = Math.max(boxWidths.N1_1, boxWidths.N1_2);
    boxWidths.N1_1 = maxN1Width;
    boxWidths.N1_2 = maxN1Width;
  }

  // Positions for the boxes (responsive)
  let positions = {};

  if (boxData.N1_2) {
    // If N1_2 exists, use two layers
    positions = {
      BMBS: { x: windowWidth * 0.1, y: 150 },
      N1_1: { x: windowWidth * 0.4, y: 100 },
      N1_2: { x: windowWidth * 0.4, y: 200 },
      N2_1: { x: windowWidth * 0.7, y: 150 },
    };
  } else {
    // Only N1_1 exists, make diagram horizontal
    positions = {
      BMBS: { x: windowWidth * 0.1, y: 150 },
      N1_1: { x: windowWidth * 0.4, y: 150 },
      N2_1: { x: windowWidth * 0.7, y: 150 },
    };
  }

  return (
    <div className="content">
      <div>
        <h2>Pathfinder Page</h2>
        <p>Welcome to the Pathfinder page!</p>

        {/* Dropdown Menu */}
        {specialties.length > 0 && (
          <div className="dropdown-container">
            <label htmlFor="specialty-select">Select a Specialty:</label>
            <select
              id="specialty-select"
              value={selectedSpecialty}
              onChange={handleSpecialtyChange}
            >
              <option value="">--Please choose an option--</option>
              {specialties.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Diagram */}
        {selectedSpecialty && (
          <div className="diagram-container">
            <svg
              width="100%"
              height="300"
              viewBox={`0 0 ${windowWidth} 300`}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
                </marker>
              </defs>

              {/* BMBS Box */}
              <rect
                x={positions.BMBS.x}
                y={positions.BMBS.y - 25}
                width={boxWidths.BMBS}
                height="50"
                fill="#4caf50"
              />
              <text
                x={positions.BMBS.x + boxWidths.BMBS / 2}
                y={positions.BMBS.y}
                fill="#fff"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {boxData.BMBS}
              </text>

              {/* N1_1 Box */}
              {boxData.N1_1 && (
                <>
                  <rect
                    x={positions.N1_1.x}
                    y={positions.N1_1.y - 25}
                    width={boxWidths.N1_1}
                    height="50"
                    fill="#4caf50"
                  />
                  <text
                    x={positions.N1_1.x + boxWidths.N1_1 / 2}
                    y={positions.N1_1.y}
                    fill="#fff"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {boxData.N1_1}
                  </text>
                </>
              )}

              {/* N1_2 Box */}
              {boxData.N1_2 && (
                <>
                  <rect
                    x={positions.N1_2.x}
                    y={positions.N1_2.y - 25}
                    width={boxWidths.N1_2}
                    height="50"
                    fill="#4caf50"
                  />
                  <text
                    x={positions.N1_2.x + boxWidths.N1_2 / 2}
                    y={positions.N1_2.y}
                    fill="#fff"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                  >
                    {boxData.N1_2}
                  </text>
                </>
              )}

              {/* N2_1 Box */}
              <rect
                x={positions.N2_1.x}
                y={positions.N2_1.y - 25}
                width={boxWidths.N2_1}
                height="50"
                fill="#4caf50"
              />
              <text
                x={positions.N2_1.x + boxWidths.N2_1 / 2}
                y={positions.N2_1.y}
                fill="#fff"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {boxData.N2_1}
              </text>

              {/* Arrows */}
              {/* From BMBS to N1_1 */}
              {boxData.N1_1 && (
                <path
                  d={
                    boxData.N1_2
                      ? // If N1_2 exists, adjust arrow to diverge
                        `
                        M ${positions.BMBS.x + boxWidths.BMBS} ${positions.BMBS.y}
                        H ${(positions.BMBS.x + positions.N1_1.x) / 2}
                        V ${positions.N1_1.y}
                        H ${positions.N1_1.x - arrowHeadLength}
                        `
                      : // If only N1_1 exists, keep horizontal line
                        `
                        M ${positions.BMBS.x + boxWidths.BMBS} ${positions.BMBS.y}
                        H ${positions.N1_1.x - arrowHeadLength}
                        `
                  }
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )}

              {/* From BMBS to N1_2 */}
              {boxData.N1_2 && (
                <path
                  d={`
                    M ${positions.BMBS.x + boxWidths.BMBS} ${positions.BMBS.y}
                    H ${(positions.BMBS.x + positions.N1_2.x) / 2}
                    V ${positions.N1_2.y}
                    H ${positions.N1_2.x - arrowHeadLength}
                  `}
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )}

              {/* From N1_1 to N2_1 */}
              {boxData.N1_1 && (
                <path
                  d={
                    boxData.N1_2
                      ? // If N1_2 exists, adjust arrow to converge
                        `
                        M ${positions.N1_1.x + boxWidths.N1_1} ${positions.N1_1.y}
                        H ${(positions.N1_1.x + positions.N2_1.x) / 2}
                        V ${positions.N2_1.y}
                        H ${positions.N2_1.x - arrowHeadLength}
                        `
                      : // If only N1_1 exists, keep horizontal line
                        `
                        M ${positions.N1_1.x + boxWidths.N1_1} ${positions.N1_1.y}
                        H ${positions.N2_1.x - arrowHeadLength}
                        `
                  }
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )}

              {/* From N1_2 to N2_1 */}
              {boxData.N1_2 && (
                <path
                  d={`
                    M ${positions.N1_2.x + boxWidths.N1_2} ${positions.N1_2.y}
                    H ${(positions.N1_2.x + positions.N2_1.x) / 2}
                    V ${positions.N2_1.y}
                    H ${positions.N2_1.x - arrowHeadLength}
                  `}
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )}

              {/* Final arrowhead from convergence point to N2_1 */}
              {boxData.N1_2 && (
                <path
                  d={`
                    M ${(positions.N1_1.x + positions.N2_1.x) / 2} ${positions.N2_1.y}
                    H ${positions.N2_1.x - arrowHeadLength}
                  `}
                  stroke="black"
                  strokeWidth="2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )}
            </svg>
          </div>
        )}

        {/* CSV Data Table */}
        <div>
          <h3>CSV Data:</h3>
          {data.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>

      {/* Inline CSS styles */}
      <style jsx>{`
        .dropdown-container {
          margin-bottom: 20px;
        }
        .dropdown-container label {
          margin-right: 10px;
          font-weight: bold;
        }
        .diagram-container {
          overflow-x: auto;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        @media (max-width: 600px) {
          /* Responsive styles */
          .diagram-container {
            overflow-x: scroll;
          }
        }
      `}</style>
    </div>
  );
};

export default Pathfinder;