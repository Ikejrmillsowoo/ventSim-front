import React, { useState } from 'react'
import Slider from '../../components/Slider'

function VolumeSlider({volume, setVolume}) {
  const [volume, setVolume] = useState(500);

  const handleVolumeChange = (event) => {
    setVolume(Number(event.target.value));
  };
  return (
    <div>
       <Slider label="Volume" min={0} max={3000} step={50} value={volume} onChange={handleVolumeChange} />

    </div>
  )
}

export default VolumeSlider