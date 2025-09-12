import { useEffect, useState } from "react";
import Slider from "../../components/Slider";

function RespiratoryRateSlider({setRate, rate}) {
  console.log("Rate in RespiratoryRateSlider:", rate);
  const [value, setValue] = useState(rate);  
  useEffect(() => {
    setValue(rate);
  }, [rate]);
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
        value={value}
        onChange={handleRateChange}
      />
    </div>
  );
}

export default RespiratoryRateSlider;
