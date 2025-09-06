import React from 'react';
import "./componentStyle.css"

/**
 * A simple component to display text.
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} [props.className] - Optional CSS class for styling.
 */
const TextDisplay = ({ label, value }) => {
    const updateLabel = label === "tidalVolume"? "Vt": label === "respiratoryRate"? "RR": label === "inspiratoryPressure"? "Pinsp": label === "peep"? "PEEP": label === "oxygen"? "FiO2": label === "pH"? "pH": label === "pCO2"? "pCO2": label === "pO2"? "pO2": label === "HCO3"? "HCO3": label === "SaO2"? "SaO2": label;
  return (
    <div className="card h-100 mb-3 text-center card-color " >
        <h5 className="card-title" style={{ textTransform: 'uppercase' }}>{updateLabel? updateLabel : ' '}</h5>
        <p className="card-text">{value}</p>
    </div>
  );
};

export default TextDisplay;