import React, { useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";

function SupportPressureSlider({ supportPressure, setSupportPressure }) {
 const vent = useSelector((state) => state.patient.vent);
  const dispatch = useDispatch();


  const handleSupportPressureChange = (event) => {
  
    setSupportPressure(Number(event.target.value));
  };
  return (
    <div>
      <Slider
        label="PS"
        min={0}
        max={50}
        step={1}
        value={supportPressure}
        onChange={handleSupportPressureChange}
      />
    </div>
  );
}

export default SupportPressureSlider;
