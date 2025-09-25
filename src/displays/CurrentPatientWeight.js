import { useState } from 'react';
const PatientWeight = ({setWeight, weight}) => {

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
    // console.log("Weight changed to:", event.target.value);
  };

  return (
    <div>
      <label htmlFor="patient-weight" className='labelHeader'>Enter Patient Weight (kg):</label>
      <input
        id="patient-weight"
        type="number"
        min="0"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Enter weight"
        className='weightInput'
        // style={{ width: "120px", marginLeft: "8px" }}
      />
    </div>
  );
};

export default PatientWeight;

