import React from 'react';

/**
 * A simple component to display text.
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} [props.className] - Optional CSS class for styling.
 */
const TextDisplay = ({ label, value }) => {
  return (
    <div className="card h-100 mb-3 text-center " >
        <h5 className="card-title" style={{ textTransform: 'uppercase' }}>{label? label : ' '}</h5>
        <p className="card-text">{value}</p>
    </div>
  );
};

export default TextDisplay;