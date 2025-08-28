import React, { useState } from 'react'
import RespiratoryRateSlider from '../sliders/RespiratoryRateSlider'
import InspiratoryPressureSlider from '../sliders/InspiratoryPressureSlider'
import OxygenSlider from '../sliders/OxygenSlider'
import SupportPressureSlider from '../sliders/SupportPressureSlider'
import PeepSlider from '../sliders/PeepSlider'
import VolumeSlider from '../sliders/VolumeSlider'
import Button from '../../components/Button'
import postVentilatorSettings from '../../fetch/Fetch'

function VentilatorSettings() {
    const [rate, setRate] = useState(20);
    const [pressure, setPressure] = useState(20);
    const [oxygen, setOxygen] = useState(21);
    const [supportPressure, setSupportPressure] = useState(10);
    const [volume, setVolume] = useState(500);
    const [peep, setPeep] = useState(5); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ rate, pressure, oxygen, supportPressure, volume, peep });
        try {
            const response = await postVentilatorSettings({ rate, pressure, oxygen, supportPressure, volume, peep });
            // Optionally handle response or show success message
            console.log(response);
        } catch (error) {
            // Optionally handle error or show error message
            console.error(error);
        }
    };

  return (
    <div>
        <h2>Ventilator Settings</h2>
        <RespiratoryRateSlider setRate={setRate} rate={rate} />
        <InspiratoryPressureSlider pressure={pressure} setPressure={setPressure} />
        <OxygenSlider oxygen={oxygen} setOxygen={setOxygen} />
        <SupportPressureSlider supportPressure={supportPressure} setSupportPressure={setSupportPressure}/>
        <VolumeSlider volume={volume} setVolume={setVolume} />
        <PeepSlider peep={peep} setPeep={setPeep} />
        <Button onClick={handleSubmit}>Submit Changes</Button>
    </div>
  )
}

export default VentilatorSettings