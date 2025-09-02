import React from 'react';

/**
 * A simple component to display text.
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} [props.className] - Optional CSS class for styling.
 */
const TextDisplay = ({ text, key, value, className }) => {
    console.log("Rendering TextDisplay with key:", key, "and value:", value);
  return (
    <div className="" >
        <h5 className="card-title">Key goes here</h5>
        <p className="card-text">{value}</p>
    </div>
  );
};

export default TextDisplay;