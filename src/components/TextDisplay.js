import React from "react";
import "./componentStyle.css";

/**
 * A simple component to display text.
 * @param {object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} [props.className] - Optional CSS class for styling.
 */
const TextDisplay = ({ label, value }) => {
  const updateLabel =
    label === "tidalVolume"
      ? "Vt"
      : label === "respiratoryRate"
      ? "RR"
      : label === "inspiratoryPressure"
      ? "Pinsp"
      : label === "peep"
      ? "PEEP"
      : label === "oxygen"
      ? "FiO2"
      : label === "pH"
      ? "pH"
      : label === "paCO2"
      ? "CO2"
      : label === "paO2"
      ? "PaO2"
      : label === "hco3"
      ? "HCO3"
      : label === "saO2"
      ? "SpO2"
      : label === "mode"
      ? "Mode"
      : label;
  return (
    <div className="card h-100 mb-3 text-center" id="card-color">
      <h5 className="card-title cardTitleText">
        {updateLabel ? updateLabel : " "}
      </h5>
      <p className="card-text">{value}</p>
    </div>
  );
};

export default TextDisplay;
