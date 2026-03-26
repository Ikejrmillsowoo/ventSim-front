import React, { useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setVent } from "../../redux/slices/PatientSlice";

function VolumeSlider({mode}) {
  // const [volume, setVolume] = useState(500);
  const vent = useSelector((state) => state.patient.vent);
  const dispatch = useDispatch();

  const handleVolumeChange = (event) => {
    dispatch(
      setVent({
        tidalVolume: event.target.value,
      }),
    );
  };
  return (
    <div>
      <Slider
        label="Volume"
        min={0}
        max={2000}
        step={50}
        value={vent.tidalVolume}
        onChange={handleVolumeChange}
        mode={mode}
      />
    </div>
  );
}

export default VolumeSlider;
