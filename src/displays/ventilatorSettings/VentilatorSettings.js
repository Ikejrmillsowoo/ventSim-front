import React, { useEffect, useState } from "react";
import RespiratoryRateSlider from "../sliders/RespiratoryRateSlider";
import InspiratoryPressureSlider from "../sliders/InspiratoryPressureSlider";
import OxygenSlider from "../sliders/OxygenSlider";
import PeepSlider from "../sliders/PeepSlider";
import VolumeSlider from "../sliders/VolumeSlider";
import Button from "../../components/Button";
import postVentilatorSettings from "../../fetch/Fetch";
import LoadingGraphic from "../../components/LoadingGraphic";
import { useDispatch, useSelector } from "react-redux";
import { setAbg, setVent } from "../../redux/slices/PatientSlice";

// Main ventilator settings component
function VentilatorSettings({
  stateId,
  // setAbgData,
  //  setVentForm,
  // ventForm,
  setFeedback,
  setStatus,
   condition,
  // rate,
  // pressure,
  // oxygen,
  // volume,
  // peep,
  // ventilatorMode,
  // setRate,
  // setPressure,
  mode,
  // setOxygen,
  // setVolume,
  // setPeep,
  weight,
  status,
  feedback,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const vent = useSelector(state=> state.patient.vent)
  //console.log(vent)
  useEffect(() => {
    // setVentForm({
    //   mode: vent.mode,
    //   tidalVolume: vent.tidalVolume,
    //   respiratoryRate: vent.respiratoryRate,
    //   peep: vent.peep,
    //   fio2: vent.fio2,
    //   inspiratoryPressure: vent.inspiratoryPressure,
    //   // supportPressure: supportPressure
      
    // });
    dispatch(setVent({
      mode: vent.mode,
      tidalVolume: vent.tidalVolume,
      respiratoryRate: vent.respiratoryRate,
      peep: vent.peep,
      fio2: vent.fio2,
      inspiratoryPressure: vent.inspiratoryPressure
    }))
  }, []);

  // console.log("VentForm in VentilatorSettings changing:", ventForm);
  // Handles form submission: sends settings to backend and updates feedback/status
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form behavior
    setLoading(true)
    try {
      // Send POST request to backend API
      const response = await postVentilatorSettings({
        stateId,
        rate: vent.respiratoryRate,
        pressure: vent.inspiratoryPressure,
        oxygen: vent.fio2,
        volume: vent.tidalVolume,
        peep: vent.peep,
        condition,
        ventilatorMode: vent.mode,
        weight,
      });
      console.log(response); // Debug log of API response
      setFeedback(response.feedback); // Update feedback from API
      setStatus(response.status); 
      console.log(response.abg)// Update status from API
      dispatch(setAbg(response.abg))
      // setAbgData(response.abg); // Update ABG data in parent
    } catch (error) {
      // Handle errors gracefully
      setFeedback("Error submitting settings");
      setStatus("Error");
      console.error(error); // Debug log of error
    } finally {
      setLoading(false)
    }
  };

  // Render sliders for each parameter, submit button, and feedback display
  return (
    <div >
      <h2 className="text-light">Ventilator Settings</h2>

      {loading && <LoadingGraphic />}
      {/* Sliders for each ventilator parameter */}
      <RespiratoryRateSlider
        // setRate={setRate}
        // rate={vent.respiratoryRate}
      />
      <InspiratoryPressureSlider
        pressure={vent.inspiratoryPressure}
        // setPressure={setPressure}
        mode={vent.mode}
      />
      <OxygenSlider oxygen={vent.fio2} 
      // setOxygen={setOxygen}
       />
      {/* <SupportPressureSlider supportPressure={supportPressure} setSupportPressure={setSupportPressure}/> */}
      <VolumeSlider volume={vent.tidalVolume} 
      // setVolume={setVolume} 
      />
      <PeepSlider peep={vent.peep} 
      // setPeep={setPeep} 
      />

      
        {/* Button to submit changes */}
        <Button className="btn mt-3" onClick={handleSubmit}>
          <h1 id="btn-main">Submit Changes</h1>
        </Button>
        {/* Display feedback and status from API */}
    </div>
  );
}

export default VentilatorSettings;
