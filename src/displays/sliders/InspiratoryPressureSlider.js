import { useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setVent } from "../../redux/slices/PatientSlice";

// src/displays/InspiratoryPressureSlider.js
function InspiratoryPressureSlider({ pressure, setPressure }) {
  // const [pressure, setPressure] = useState(20);
  const vent = useSelector((state) => state.patient.vent);
  const dispatch = useDispatch();

  const handlePressureChange = (event) => {
    dispatch(setVent({
      inspiratoryPressure: event.target.value
    }))
    // setPressure(Number(event.target.value));
  };

  return (
    <div>
      <Slider
        label="Pressure"
        min={0}
        max={50}
        step={1}
        value={vent.inspiratoryPressure}
        onChange={handlePressureChange}
      />
    </div>
  );
}

export default InspiratoryPressureSlider;
