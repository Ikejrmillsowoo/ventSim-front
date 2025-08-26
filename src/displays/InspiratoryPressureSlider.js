import Slider from "../components/Slider"

// src/displays/InspiratoryPressureSlider.js
function InspiratoryPressureSlider({ }) {

  return (
    <div>
        <Slider label="Pressure" min={0} max={50} step={1} value={20} onChange={(val) => console.log(val)} />
    </div>
  )
}

export default InspiratoryPressureSlider