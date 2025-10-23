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

function App() {
  const [condition, setPatientCondition] = useState("normal");
  const [ventilatorMode, setVentilatorMode] = useState("VC");
  const [weight, setWeight] = useState("70");
  const [abgData, setAbgData] = useState({
    pH: 7.4,
    PaCO2: 40,
    PaO2: 90,
    HCO3: 24,
    SaO2: "97%",
  });

  const [ventForm, setVentForm] = useState({
    mode: ventilatorMode,
    tidalVolume: 500,
    respiratoryRate: 16,
    peep: 5,
    fio2: 21,
    inspiratoryPressure: 10,
    // supportPressure: 0
  }); // Stores ventilator settings
  const [rate, setRate] = useState(ventForm.respiratoryRate || 16);
  const [pressure, setPressure] = useState(ventForm.inspiratoryPressure || 10);
  const [oxygen, setOxygen] = useState(ventForm.fio2 || 21);
  // const [supportPressure, setSupportPressure] = useState(ventForm.supportPressure || 0);
  const [volume, setVolume] = useState(ventForm.tidalVolume || 500);
  const [peep, setPeep] = useState(ventForm.peep || 5);
  const [submitSettings, setSubmitSettings] = useState();

  const [feedback, setFeedback] = useState(); // Stores feedback from API
  const [status, setStatus] = useState(); // Stores status from API
  const [stateId, setStateId] = useState(); // Stores stateId from API

  useEffect(() => {
    const settings = defaultSettings.find(
      (item) => item.scenario === condition
    );

    if (settings) {
      setRate(settings.respiratoryRate);
      setPressure(
        settings.inspiratoryPressure
          ? settings.inspiratoryPressure
          : settings.tidalVolume / 50
      );
      setOxygen(settings.fio2);
      setPeep(settings.peep);
      setVolume(
        settings.tidalVolume
          ? settings.tidalVolume
          : settings.inspiratoryPressure * 50
      );
      setVentilatorMode(settings.mode);
      setAbgData(settings.abg);
      console.log("Default settings loaded:", settings);
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
          setAbgData(response.abg); // Update ABG data in parent
          setStateId(response.stateId); // Update stateId from API
        })
        .catch((error) => {
          console.error("Error posting initial settings:", error);
          setFeedback("Error submitting initial settings");
          setStatus("Error");
        });
    }
  }, [condition]);
  // console.log("VentForm in App:", ventForm);
  // console.log("Patient condition in Header:", condition);

  return (
    <div className="App ">
      <header className="header sticky-top text-white bg-dark py-3 mb-5">
        <Header
          weight={weight}
          setWeight={setWeight}
          setPatientCondition={setPatientCondition}
          setVentilatorMode={setVentilatorMode}
        />
      </header>
      <section className="row ">
        <div className="col-md-8 mb-1">
          <VentilatorParams ventForm={ventForm} data={abgData} />
        </div>
        <div className="col-md-4 mb-1">
          <ABGDisplay abgData={abgData} />
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
          ieRatio="1:2"
          height={540}
          status={status}
          feedback={feedback}
        />
        </div>

      {/* </section>
      <section className="mb-2"> */}
      <div className="col-md-4 mb-1">
        <VentilatorSettings
          setRate={setRate}
          rate={rate}
          setPressure={setPressure}
          pressure={pressure}
          setOxygen={setOxygen}
          oxygen={oxygen}
          peep={peep}
          setPeep={setPeep}
          volume={volume}
          setVolume={setVolume}
          ventilatorMode={ventilatorMode}
          weight={weight}
          // setSupportPressure={setSupportPressure}
          setAbgData={setAbgData}
          setVentForm={setVentForm}
          ventForm={ventForm}
          setFeedback={setFeedback}
          feedback={feedback}
          setStatus={setStatus}
          status={status}
          condition={condition}
          stateId={stateId}
        />
        </div>
      </section>
      {/* <Footer feedback={feedback} status={status} submitSettings={submitSettings} /> */}
    </div>
  );
}

export default App;
