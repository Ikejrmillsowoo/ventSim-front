import Slider from "../../components/Slider";

function RespiratoryRateSlider({setRate, rate}) {
  

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
