import React, { useState, useEffect } from "react";
import "./App.css";
import ABGDisplay from "./displays/abgDisplay/ABGDisplay";
import Footer from "./displays/footer/Footer";
import Header from "./displays/header/Header";
import VentilatorParams from "./displays/ventilatorParams/VentilatorParams";
import VentilatorSettings from "./displays/ventilatorSettings/VentilatorSettings";
import defaultSettings from "./defaultSettings.json";
import postInitVentilatorSettings from "./fetch/FetchInit";
import VentilatorWaveforms from "./displays/VentilatorWaveForms";
import CustomPatientModal from "./displays/customScenario/CustomScenario";
import { useSelector, useDispatch } from "react-redux";
import { setVent, setAbg } from "./redux/slices/PatientSlice";
import FeedBack from "./displays/FeedBack";

function App() {
  const vent = useSelector((state) => state.patient.vent);
  const abg = useSelector((state) => state.patient.abg);

  const dispatch = useDispatch();

  const [condition, setPatientCondition] = useState("normal");
  const [ventilatorMode, setVentilatorMode] = useState("VC");
  const [weight, setWeight] = useState("70");
  const [abgData, setAbgData] = useState({
    pH: abg.pH,
    PaCO2: abg.PaCO2,
    PaO2: abg.PaO2,
    HCO3: abg.HCO3,
    SaO2: abg.fio2,
  });

  const [ventForm, setVentForm] = useState({
    mode: vent.mode,
    tidalVolume: vent.tidalVolume,
    respiratoryRate: vent.respiratoryRate,
    peep: vent.peep,
    fio2: vent.fio2,
    inspiratoryPressure: vent.inspiratoryPressure,
    // supportPressure: 0
  }); // Stores ventilator settings
  const [rate, setRate] = useState(vent.respiratoryRate || 16);
  const [pressure, setPressure] = useState(vent.inspiratoryPressure || 10);
  const [oxygen, setOxygen] = useState(vent.fio2 || 21);
  const [volume, setVolume] = useState(vent.tidalVolume || 500);
  const [peep, setPeep] = useState(vent.peep || 5);

  const [feedback, setFeedback] = useState(); // Stores feedback from API
  const [status, setStatus] = useState(); // Stores status from API
  const [stateId, setStateId] = useState(); // Stores stateId from API
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (condition === "custom") {
      setOpen(true);
    }

    const settings = defaultSettings.find(
      (item) => item.scenario === condition,
    );

    console.log(settings);
    if (settings) {
      dispatch(
        setVent({
          mode: settings.mode,
          tidalVolume: settings.tidalVolume
            ? settings.tidalVolume
            : settings.inspiratoryPressure * 50,
          inspiratoryPressure: settings.inspiratoryPressure
            ? settings.inspiratoryPressure
            : settings.tidalVolume / 50,
          respiratoryRate: settings.respiratoryRate,
          peep: settings.peep,
          fio2: settings.fio2,
        }),
      );

      setVentilatorMode(settings.mode);
      dispatch(setAbg(settings.abg));

      postInitVentilatorSettings({
        rate: settings.respiratoryRate,
        pressure: settings.inspiratoryPressure
          ? settings.inspiratoryPressure
          : settings.tidalVolume / 50,
        oxygen: settings.fio2,
        supportPressure: settings.supportPressure ?? 0,
        volume: settings.tidalVolume
          ? settings.tidalVolume
          : settings.inspiratoryPressure * 50,
        peep: settings.peep,
        condition: settings.scenario,
        mode: settings.mode,
        weight: weight,
        abg: settings.abg,
      })
        .then((response) => {
          console.log("Initial settings response:", response);
          setFeedback(response.feedback); // Update feedback from API
          setStatus(response.status); // Update status from API
          dispatch(setAbg( response.abg)); // Update ABG data in parent
          setStateId(response.stateId); // Update stateId from API
        })
        .catch((error) => {
          console.error("Error posting initial settings:", error);
          setFeedback("Error submitting initial settings");
          setStatus("Error");
        });
    }
  }, [condition]);


  return (
    <div className="App ">
      <CustomPatientModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
      <header className="header sticky-top text-white bg-dark py-1 mb-1">
        <Header
          weight={weight}
          setWeight={setWeight}
          setPatientCondition={setPatientCondition}
          setVentilatorMode={setVentilatorMode}
        />
      </header>
      <section className="row ">
        <div className="col-md-8 mb-1">
          <VentilatorParams data={abgData} />
        </div>
        <div className="col-md-4 mb-1">
          <ABGDisplay />
        </div>
      </section>
      <section className="row">
        <div className="col-md-8 mb-1">
          <VentilatorWaveforms
            mode="Pressure Control" // or "Volume Control", "PSV"
            respiratoryRate={rate}
            tidalVolume={volume} // used in VC
            peep={peep}
            inspiratoryPressure={pressure} // Δ above PEEP (PC)
            supportPressure={12} // PS above PEEP (PSV)
            compliance={50} // mL/cmH2O
            resistance={10} // cmH2O/L/s
            ieRatio={`1:${60 / rate}`}
            height={540}
            status={status}
            feedback={feedback}
          />
        </div>

        <div className="col-md-4 mb-1">
          <VentilatorSettings
            weight={weight}
            // ventForm={ventForm}
            setFeedback={setFeedback}
            feedback={feedback}
            setStatus={setStatus}
            status={status}
            condition={condition}
            stateId={stateId}
          />
        </div>
      </section>
      <Footer  />
    </div>
  );
}

export default App;
