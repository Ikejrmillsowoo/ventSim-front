import React, { useState } from "react";
import Slider from "../../components/Slider";

function RespiratoryRateSlider() {
  const [rate, setRate] = useState(20);

  const handleRateChange = (event) => {
    setRate(Number(event.target.value));
  };
  return (
    <div>
      {" "}
      <Slider
        label="Rate"
        min={0}
        max={40}
        step={1}
        value={rate}
        onChange={handleRateChange}
      />
    </div>
  );
}

export default RespiratoryRateSlider;
