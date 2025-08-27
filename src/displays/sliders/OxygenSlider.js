import React, { useState } from 'react'
import Slider from '../../components/Slider'

function OxygenSlider({oxygen, setOxygen}) {
  // const [oxygen, setOxygen] = useState(21);
  
    const handleOxygenChange = (event) => {
      setOxygen(Number(event.target.value));
    };
  return (
    <div>
    <Slider label="O2" min={21} max={100} step={1} value={oxygen} onChange={handleOxygenChange} />

    </div>
  )
}

export default OxygenSlider