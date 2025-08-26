import React from "react";

function RespiratoryRateSlider() {
  return (
    <div>
      {" "}
      <Slider
        label="Rate"
        min={0}
        max={40}
        step={1}
        value={20}
        onChange={(val) => console.log(val)}
      />
    </div>
  );
}

export default RespiratoryRateSlider;
