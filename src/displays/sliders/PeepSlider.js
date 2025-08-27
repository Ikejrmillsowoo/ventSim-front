import { useState } from 'react'
import Slider from '../../components/Slider'

function PeepSlider({peep, setPeep}) {
  // const [peep, setPeep] = useState(5);

  const handlePeepChange = (event) => {
    setPeep(Number(event.target.value));
  };
  return (
    <div>
        <Slider label="Peep" min={0} max={30} step={1} value={peep} onChange={handlePeepChange} />

    </div>
  )
}

export default PeepSlider