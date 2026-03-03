import React, { useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setVent } from "../../redux/slices/PatientSlice";

function OxygenSlider() {
  // const [oxygen, setOxygen] = useState(21);
  const vent = useSelector((state) => state.patient.vent);
  const dispatch = useDispatch();

  const handleOxygenChange = (event) => {
    dispatch(
      setVent({
        fio2: event.target.value,
      }),
    );
    // setOxygen(Number(event.target.value));
  };
  return (
    <div>
      <Slider
        label="O2"
        min={21}
        max={100}
        step={1}
        value={vent.fio2}
        onChange={handleOxygenChange}
      />
    </div>
  );
}

export default OxygenSlider;
