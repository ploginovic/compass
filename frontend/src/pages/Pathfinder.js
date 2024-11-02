import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

const Pathfinder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse(window.location.origin + '/data/PathfinderMaster.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log('Parsing complete:', results);
        setData(results.data);
      },
      error: function(error) {
        console.error('Error parsing CSV:', error);
      },
    });
  }, []);

  return (
    <div className="content">
      <div>
        <h2>Pathfinder Page</h2>
        <p>Welcome to the Pathfinder page!</p>
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
    </div>
  );
};

export default Pathfinder;