import { useEffect, useState } from "react";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { setVent} from '../../redux/slices/PatientSlice';


function RespiratoryRateSlider({setRate, rate}) {
  const vent = useSelector(state => state.patient.vent);
  const dispatch = useDispatch();


  const handleRateChange = (event) => {
    dispatch(setVent({
      RespiratoryRate: event.target.value
    }))
    // setRate(Number(event.target.value));
  };
  return (
    <div>
      {" "}
      <Slider
        label="Rate"
        min={0}
        max={40}
        step={1}
        value={vent.RespiratoryRate}
        onChange={handleRateChange}
      />
    </div>
  );
}

export default RespiratoryRateSlider;
