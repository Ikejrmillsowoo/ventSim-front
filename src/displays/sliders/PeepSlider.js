import { useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setVent } from "../../redux/slices/PatientSlice";

function PeepSlider() {
  const vent = useSelector((state) => state.patient.vent);
  const dispatch = useDispatch();

  const handlePeepChange = (event) => {
    dispatch(
      setVent({
        peep: event.target.value,
      }),
    );
  };
  return (
    <div>
      <Slider
        label="Peep"
        min={0}
        max={30}
        step={1}
        value={vent.peep}
        onChange={handlePeepChange}
      />
    </div>
  );
}

export default PeepSlider;
