import React from 'react'

function VolumeSlider() {
  return (
    <div>
                <Slider label="Volume" min={0} max={3000} step={1} value={500} onChange={(val) => console.log(val)} />

    </div>
  )
}

export default VolumeSlider