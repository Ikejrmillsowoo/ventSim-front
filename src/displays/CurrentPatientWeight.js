import { useState } from 'react';
const PatientWeight = ({setWeight, weight}) => {
//   const [weight, setWeight] = useState("70");

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
    console.log("Weight changed to:", event.target.value);
  };

  return (
    <div>
      <label htmlFor="patient-weight">Enter Patient Weight (kg):</label>
      <input
        id="patient-weight"
        type="number"
        min="0"
        value={weight}
        onChange={handleWeightChange}
        placeholder="Enter weight"
        style={{ width: "120px", marginLeft: "8px" }}
      />
    </div>
  );
};

export default PatientWeight;

