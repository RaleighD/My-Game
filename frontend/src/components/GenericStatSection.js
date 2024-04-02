import React, { useState, useEffect } from 'react';
import './GenericStatSection.css'; // Import the CSS file

const GenericStatsSection = ({ stats, title }) => {
  // State to manage the visibility of the stats table and the legends
  const [isStatsVisible, setIsStatsVisible] = useState(true);
  const [isLegendsVisible, setIsLegendsVisible] = useState(false);
  const [legends, setLegends] = useState({});

  useEffect(() => {
    if (stats.length > 0) {
      let newLegends = Object.keys(stats[0])
        .filter(key => !["_id", "__v", "id", "userID", "createdAt", "updatedAt"].includes(key))
        .reduce((acc, key) => {
          const formattedText = formatText(key);
          const letters = extractUppercaseLetters(formattedText);
          acc[letters] = formattedText; // Map the capital letters to the full formatted text
          return acc;
        }, {});
      setLegends(newLegends);
    }
  }, [stats]);

  const formatText = (text) => {
    return text.replace(/_/g, ' ')
               .split(' ')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
  };

  const extractUppercaseLetters = (str) => {
    if (!str) return '';
    const matches = str.match(/[A-Z]/g);
    return matches ? matches.join('') : '';
  };

  const toggleStatsVisibility = () => {
    setIsStatsVisible(!isStatsVisible);
  };

  const toggleLegendsVisibility = () => {
    setIsLegendsVisible(!isLegendsVisible);
  };

  if (stats.length === 0) {
    return (
      <div className={`${title.toLowerCase()}-stats-section stats-section`}>
        <h2>{title} Yearly Stats</h2>
        <p>No {title.toLowerCase()} stats available</p>
      </div>
    );
  }

  return (
    <div className={`${title.toLowerCase()}-stats-section stats-section`}>
      <h2>{title} Yearly Stats</h2>
      <button onClick={toggleStatsVisibility} className="toggle-visibility-btn">
        {isStatsVisible ? 'Hide' : 'Show'} Stats
      </button>
      {isStatsVisible && (
        <table>
          <thead>
            <tr>
              {Object.keys(stats[0]).map(key => 
                !["_id", "__v", "id", "userID", "createdAt", "updatedAt"].includes(key) && (
                  <th key={key}>
                    {extractUppercaseLetters(formatText(key))}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={stat._id || index}>
                {Object.entries(stat).map(([key, value]) => {
                  if (!["_id", "__v", "id", "userID", "createdAt", "updatedAt"].includes(key)) {
                    return <td key={key}>{value}</td>;
                  }
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={toggleLegendsVisibility} className="toggle-visibility-btn">
        {isLegendsVisible ? 'Hide' : 'Show'} Legend
      </button>
      {isLegendsVisible && (
        <div className="legends">
          <h3>Legend:</h3>
          <ul>
            {Object.entries(legends).map(([letters, meaning]) => (
              <li key={letters}>{letters}: {meaning}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GenericStatsSection;
