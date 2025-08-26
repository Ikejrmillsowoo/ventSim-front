import React from 'react'

function PeepSlider() {
  return (
    <div>
        <Slider label="Peep" min={0} max={30} step={1} value={20} onChange={(val) => console.log(val)} />

    </div>
  )
}

export default PeepSlider