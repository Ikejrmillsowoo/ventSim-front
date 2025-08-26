import { useState } from "react";
import Slider from "../../components/Slider"

// src/displays/InspiratoryPressureSlider.js
function InspiratoryPressureSlider({ }) {
  const [pressure, setPressure] = useState(20);

  const handlePressureChange = (event) => {
    setPressure(Number(event.target.value));
  };

  return (
    <div>
        <Slider label="Pressure" min={0} max={50} step={1} value={pressure} onChange={handlePressureChange} />
    </div>
  )
}

export default InspiratoryPressureSlider