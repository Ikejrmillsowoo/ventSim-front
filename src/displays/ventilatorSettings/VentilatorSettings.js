import React, { useEffect, useState } from "react";
import RespiratoryRateSlider from "../sliders/RespiratoryRateSlider";
import InspiratoryPressureSlider from "../sliders/InspiratoryPressureSlider";
import OxygenSlider from "../sliders/OxygenSlider";
import PeepSlider from "../sliders/PeepSlider";
import VolumeSlider from "../sliders/VolumeSlider";
import Button from "../../components/Button";
import postVentilatorSettings from "../../fetch/Fetch";

// Main ventilator settings component
function VentilatorSettings({
  stateId,
  setAbgData,
  setVentForm,
  ventForm,
  setFeedback,
  setStatus,
  condition,
  rate,
  pressure,
  oxygen,
  volume,
  peep,
  ventilatorMode,
  setRate,
  setPressure,
  mode,
  setOxygen,
  setVolume,
  setPeep,
  weight,
}) {
  useEffect(() => {
    setVentForm({
      mode: ventilatorMode,
      tidalVolume: volume,
      respiratoryRate: rate,
      peep: peep,
      fio2: oxygen,
      inspiratoryPressure: pressure,
      // supportPressure: supportPressure
    });
  }, [rate, pressure, oxygen, peep, volume, ventilatorMode]);

  // console.log("VentForm in VentilatorSettings changing:", ventForm);
  // Handles form submission: sends settings to backend and updates feedback/status
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form behavior
    console.log({ rate, pressure, oxygen, volume, peep , ventilatorMode}); // Debug log
    try {
      // Send POST request to backend API
      const response = await postVentilatorSettings({
        stateId,
        rate,
        pressure,
        oxygen,
        volume,
        peep,
        condition,
        ventilatorMode,
        weight,
      });
      console.log(response); // Debug log of API response
      setFeedback(response.feedback); // Update feedback from API
      setStatus(response.status); // Update status from API
      setAbgData(response.abg); // Update ABG data in parent
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
      <RespiratoryRateSlider
        setRate={setRate}
        rate={ventForm.respiratoryRate}
      />
      <InspiratoryPressureSlider
        pressure={ventForm.inspiratoryPressure}
        setPressure={setPressure}
        mode={ventForm.mode}
      />
      <OxygenSlider oxygen={ventForm.fio2} setOxygen={setOxygen} />
      {/* <SupportPressureSlider supportPressure={supportPressure} setSupportPressure={setSupportPressure}/> */}
      <VolumeSlider volume={ventForm.tidalVolume} setVolume={setVolume} />
      <PeepSlider peep={ventForm.peep} setPeep={setPeep} />
      {/* Button to submit changes */}
      <Button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit Changes
      </Button>
      {/* Display feedback and status from API */}
    </div>
  );
}

export default VentilatorSettings;
