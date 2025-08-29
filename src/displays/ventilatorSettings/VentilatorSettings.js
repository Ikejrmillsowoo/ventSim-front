import React, { useState } from 'react'
import RespiratoryRateSlider from '../sliders/RespiratoryRateSlider'
import InspiratoryPressureSlider from '../sliders/InspiratoryPressureSlider'
import OxygenSlider from '../sliders/OxygenSlider'
import SupportPressureSlider from '../sliders/SupportPressureSlider'
import PeepSlider from '../sliders/PeepSlider'
import VolumeSlider from '../sliders/VolumeSlider'
import Button from '../../components/Button'
import postVentilatorSettings from '../../fetch/Fetch'
import FeedBack from '../FeedBack'
import ABGDisplay from '../abgDisplay/ABGDisplay'

function VentilatorSettings() {
    const [rate, setRate] = useState(20);
    const [pressure, setPressure] = useState(20);
    const [oxygen, setOxygen] = useState(21);
    const [supportPressure, setSupportPressure] = useState(10);
    const [volume, setVolume] = useState(500);
    const [peep, setPeep] = useState(5); 
    const [feedback, setFeedback] = useState();
    const [status, setStatus] = useState();
    const [abgDisplay, setAbgDisplay] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ rate, pressure, oxygen, supportPressure, volume, peep });
        try {
            const response = await postVentilatorSettings({ rate, pressure, oxygen, supportPressure, volume, peep });
            // Optionally handle response or show success message
            console.log(response);
            setFeedback(response.feedback);
            setStatus(response.status);
            setAbgDisplay(response.abg);
        } catch (error) {
            // Optionally handle error or show error message
            setFeedback("Error submitting settings");
            setStatus("Error");
            
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
        <FeedBack feedback={feedback} status={status} />
        <ABGDisplay data={abgDisplay} />
    </div>
  )
}

export default VentilatorSettings