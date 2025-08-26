import React from 'react'
import RespiratoryRateSlider from '../sliders/RespiratoryRateSlider'
import InspiratoryPressureSlider from '../sliders/InspiratoryPressureSlider'
import OxygenSlider from '../sliders/OxygenSlider'
import SupportPressureSlider from '../sliders/SupportPressureSlider'
import PeepSlider from '../sliders/PeepSlider'

function VentilatorSettings() {
  return (
    <div>
        <h2>Ventilator Settings</h2>
        <RespiratoryRateSlider />
        <InspiratoryPressureSlider />
        <OxygenSlider />
        <SupportPressureSlider />
        <VolumeSlider />
        <PeepSlider />
    </div>
  )
}

export default VentilatorSettings