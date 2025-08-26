import React from 'react'

function OxygenSlider() {
  return (
    <div>
    <Slider label="O2" min={21} max={100} step={1} value={21} onChange={(val) => console.log(val)} />

    </div>
  )
}

export default OxygenSlider