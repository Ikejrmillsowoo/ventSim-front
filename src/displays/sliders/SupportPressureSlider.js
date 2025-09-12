import React, { useState } from "react";
import Slider from "../../components/Slider";

function SupportPressureSlider({ supportPressure, setSupportPressure }) {
  // const [supportPersure, setSupportPressure] = useState(10);

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
