import React, { useEffect, useState } from 'react'
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
import defautlSettings from "../../defaultSettings.json"

// Main ventilator settings component
function VentilatorSettings({setAbgData, setVentForm, ventForm}) {
    // Local state for each ventilator parameter, initialized from ventForm or default values
    const [rate, setRate] = useState(ventForm.respiratoryRate || 16);
    const [pressure, setPressure] = useState(ventForm.inspiratoryPressure || 10);
    const [oxygen, setOxygen] = useState(ventForm.fio2 || 21);
    const [supportPressure, setSupportPressure] = useState(ventForm.supportPressure || 0);
    const [volume, setVolume] = useState(ventForm.tidalVolume || 500);
    const [peep, setPeep] = useState(ventForm.peep || 5); 
    const [feedback, setFeedback] = useState(); // Stores feedback from API
    const [status, setStatus] = useState();     // Stores status from API

    // Update parent ventForm whenever any local parameter changes
    useEffect(() => {
        setVentForm({   
            mode: ventForm.mode,
            tidalVolume: volume,
            respiratoryRate: rate,
            peep: peep,
            fio2: oxygen,
            inspiratoryPressure: pressure,
            supportPressure: supportPressure
        });
    }, [rate, pressure, oxygen, supportPressure, volume, peep]);

    // Handles form submission: sends settings to backend and updates feedback/status
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form behavior
        console.log({ rate, pressure, oxygen, supportPressure, volume, peep }); // Debug log
        try {
            // Send POST request to backend API
            const response = await postVentilatorSettings({ rate, pressure, oxygen, supportPressure, volume, peep });
            console.log(response); // Debug log of API response
            setFeedback(response.feedback); // Update feedback from API
            setStatus(response.status);     // Update status from API
            setAbgData(response.abg);       // Update ABG data in parent
        } catch (error) {
            // Handle errors gracefully
            setFeedback("Error submitting settings");
            setStatus("Error");
            console.error(error); // Debug log of error
        }
    };

    // Render sliders for each parameter, submit button, and feedback display
    return (
        <div>
            <h2>Ventilator Settings</h2>
            {/* Sliders for each ventilator parameter */}
            <RespiratoryRateSlider setRate={setRate} rate={rate} />
            <InspiratoryPressureSlider pressure={pressure} setPressure={setPressure} />
            <OxygenSlider oxygen={oxygen} setOxygen={setOxygen} />
            <SupportPressureSlider supportPressure={supportPressure} setSupportPressure={setSupportPressure}/>
            <VolumeSlider volume={volume} setVolume={setVolume} />
            <PeepSlider peep={peep} setPeep={setPeep} />
            {/* Button to submit changes */}
            <Button onClick={handleSubmit}>Submit Changes</Button>
            {/* Display feedback and status from API */}
            <FeedBack feedback={feedback} status={status} />
        </div>
    )
}

export default VentilatorSettings