import React from 'react'
import RespiratoryRateSlider from '../sliders/RespiratoryRateSlider'
import InspiratoryPressureSlider from '../sliders/InspiratoryPressureSlider'
import OxygenSlider from '../sliders/OxygenSlider'
import SupportPressureSlider from '../sliders/SupportPressureSlider'
import PeepSlider from '../sliders/PeepSlider'
import VolumeSlider from '../sliders/VolumeSlider'

function VentilatorSettings() {
    const [rate, setRate] = React.useState(20);
    const [pressure, setPressure] = React.useState(20);
    const [oxygen, setOxygen] = React.useState(21);
    const [supportPressure, setSupportPressure] = React.useState(10);
    const [volume, setVolume] = React.useState(500);
    const [peep, setPeep] = React.useState(5); 
  return (
    <div>
        <h2>Ventilator Settings</h2>
        <RespiratoryRateSlider setRate={setRate} rate={rate} />
        <InspiratoryPressureSlider pressure={pressure} setPressure={setPressure} />
        <OxygenSlider oxygen={oxygen} setOxygen={setOxygen} />
        <SupportPressureSlider supportPressure={supportPressure}  setSupportPressure={setSupportPressure}/>
        <VolumeSlider volume={volume} setVolume={setVolume} />
        <PeepSlider peep={peep} setPeep={setPeep} />
    </div>
  )
}

export default VentilatorSettings