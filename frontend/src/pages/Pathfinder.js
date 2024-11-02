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
        console.log('Parsing complete:', results);
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

        {/* Container for the boxes and arrows */}
        {selectedSpecialty && (
          <div className="path-container">
            {/* BMBS box */}
            <div className="box">{boxData.BMBS}</div>

            {/* Arrow and duration to N1_1/N1_2 */}
            <div className="arrow-container">
              <div className="arrow">→</div>
              {boxData.durations.dur_N1_1 && (
                <div className="duration">{boxData.durations.dur_N1_1}</div>
              )}
            </div>

            {/* N1_1 and N1_2 vertically stacked */}
            <div className="stacked-boxes">
              {boxData.N1_1 && <div className="box">{boxData.N1_1}</div>}
              {boxData.N1_2 && <div className="box">{boxData.N1_2}</div>}
            </div>

            {/* Arrows from N1_1 and N1_2 to N2_1 */}
            <div className="arrow-to-n2">
              {boxData.N1_1 && <div className="vertical-arrow">↓</div>}
              {boxData.N1_2 && <div className="vertical-arrow">↓</div>}
            </div>

            {/* Arrow to N2_1 */}
            <div className="arrow-container">
              <div className="arrow">→</div>
            </div>

            {/* N2_1 box */}
            <div className="box">{boxData.N2_1}</div>
          </div>
        )}

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
        .path-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          position: relative;
        }
        .box {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          min-width: 100px;
          text-align: center;
          margin: 5px;
          position: relative;
        }
        .arrow-container {
          display: flex;
          align-items: center;
          position: relative;
        }
        .arrow {
          font-size: 24px;
          margin: 0 5px;
        }
        .duration {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2196f3;
          color: white;
          padding: 2px 5px;
          border-radius: 3px;
          font-size: 12px;
          white-space: nowrap;
        }
        .stacked-boxes {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .vertical-arrow {
          font-size: 24px;
          margin: -5px 0;
        }
        .arrow-to-n2 {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Pathfinder;