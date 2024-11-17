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
      const selectedRow = data.find(
        (row) => row['Specialty Name'] === selectedSpecialty
      );

      if (selectedRow) {
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

        {selectedSpecialty && (
          <div className="flowchart-container">
            <div className="flowchart">
              {/* Horizontal flowchart */}
              <div className="row">
                {/* BMBS */}
                <div className="box">{boxData.BMBS}</div>
                <div className="arrow-right"></div>

                {/* Parallel branches */}
                <div className="parallel-branches">
                  <div className="branch">
                    <div className="box">{boxData.N1_1 || 'None'}</div>
                    <div className="arrow-down"></div>
                  </div>
                  <div className="branch">
                    <div className="box">{boxData.N1_2 || 'N/A'}</div>
                    <div className="arrow-down"></div>
                  </div>
                </div>

                {/* Convergence */}
                <div className="arrow-converge"></div>
                <div className="box">{boxData.N2_1 || 'End'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .dropdown-container {
          margin-bottom: 20px;
        }
        .dropdown-container label {
          margin-right: 10px;
          font-weight: bold;
        }
        .flowchart-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-top: 20px;
        }
        .flowchart {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .row {
          display: flex;
          align-items: center;
        }
        .parallel-branches {
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          margin: 0 20px;
          position: relative;
        }
        .branch {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .box {
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          font-weight: bold;
          min-width: 150px;
          text-align: center;
          margin: 10px;
        }
        .arrow-right {
          width: 50px;
          height: 2px;
          background-color: black;
          position: relative;
          margin: 0 10px;
        }
        .arrow-right::after {
          content: '';
          position: absolute;
          top: -5px;
          right: -10px;
          border-width: 5px;
          border-style: solid;
          border-color: transparent transparent transparent black;
        }
        .arrow-down {
          width: 2px;
          height: 50px;
          background-color: black;
          margin: 10px 0;
          position: relative;
        }
        .arrow-down::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: black transparent transparent transparent;
        }
        .arrow-converge {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 20px 30px 0 30px;
          border-color: black transparent transparent transparent;
          margin-top: -10px;
        }
      `}</style>
    </div>
  );
};

export default Pathfinder;