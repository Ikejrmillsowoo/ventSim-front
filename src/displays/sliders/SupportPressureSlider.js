import React from 'react'
import Slider from '../../components/Slider'

function SupportPressureSlider() {
  return (
    <div>
      <Slider label="PS" min={0} max={50} step={1} value={20} onChange={(val) => console.log(val)} />

    </div>
  )
}

export default SupportPressureSlider