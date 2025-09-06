import React, { useEffect, useState } from "react";
import TextDisplay from "../../components/TextDisplay";
/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function ABGDisplay({ abgData, className }) {
  const formatValue = (label, value) => {
    if (label === "pH") {
      if (typeof value === "number") {
        return value.toFixed(2);
      }
      // If value is a string that can be converted to a number, format it
      if (!isNaN(Number(value)) && value !== "") {
        return Number(value).toFixed(2);
      }
      return value;
    }

    // For other numeric values, round to 2 decimals if possible
    if (typeof value === "number") {
      return Math.round(value).toString().padStart(2, '0');
    }
    if (!isNaN(Number(value)) && value !== "") {
      return Math.round(Number(value)).toString().padStart(2, '0');
    }
    return value;
  };

  return (
    <div className={`border rounded p-3 bg-dark text-light ${className || ""}`}>
      <h2 className="text-center">ABG Results</h2>
      <div className="ventParams ">
        {Object.entries(abgData).map(([label, value]) => (
          <div key={label} className="d-flex justify-content-between py-1 item">
            {/* <span>{key}</span>
          <span>{String(value)}</span> */}
            <TextDisplay label={label} value={formatValue(label, value)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ABGDisplay;
