import React, { useState, useEffect } from "react";
import "./App.css";
import ABGDisplay from "./displays/abgDisplay/ABGDisplay";
import Footer from "./displays/footer/Footer";
import Header from "./displays/header/Header";
import VentilatorParams from "./displays/ventilatorParams/VentilatorParams";
import VentilatorSettings from "./displays/ventilatorSettings/VentilatorSettings";
import defaultSettings from "./defaultSettings.json";

function App() {
  const [condition, setPatientCondition] = useState("normal");
  const [abgData, setAbgData] = useState({
    pH: 7.4,
    PaCO2: 40,
    PaO2: 90,
    HCO3: 24,
    SaO2: "97%",
  });
  const [ventForm, setVentForm] = React.useState({
    mode: "",
    tidalVolume: "",
    respiratoryRate: "",
    peep: "",
    fio2: "",
    inspiratoryPressure: "",
  });
  const [feedback, setFeedback] = useState(); // Stores feedback from API
  const [status, setStatus] = useState(); // Stores status from API

  useEffect(() => {
    const settings = defaultSettings.find(
      (item) => item.scenario === condition
    );

    if (settings) {
      setVentForm({
        mode: settings.mode,
        tidalVolume: settings.tidalVolume ?? "",
        respiratoryRate: settings.respiratoryRate,
        peep: settings.peep,
        fio2: settings.fio2,
        inspiratoryPressure: settings.inspiratoryPressure
          ? settings.inspiratoryPressure
          : settings.tidalVolume / 50,
      });
    }
  }, [condition]);
  // console.log("Patient condition in Header:", condition);

  return (
    <div className="App container">
      <header className="header sticky-top text-white bg-dark py-3 mb-4">
        <Header setPatientCondition={setPatientCondition} />
      </header>
      <section className="row">
        <div className="col-md-8 mb-3">
          <VentilatorParams ventForm={ventForm} data={abgData} />
        </div>
        <div className="col-md-4 mb-3">
          <ABGDisplay abgData={abgData} />
        </div>
      </section>
      <section className="mb-4">
        <VentilatorSettings
          setAbgData={setAbgData}
          setVentForm={setVentForm}
          ventForm={ventForm}
          setFeedback={setFeedback}
          setStatus={setStatus}
          condition={condition}
        />
      </section>

      {/* <Header setPatientCondition={setPatientCondition}/> */}
      {/* <VentilatorParams ventForm={ventForm} data={abgData}/>
      <ABGDisplay abgData={abgData} />
      <VentilatorSettings setAbgData={setAbgData} setVentForm={setVentForm} ventForm={ventForm} /> */}
      <Footer feedback={feedback} status={status}/>
    </div>
  );
}

export default App;
