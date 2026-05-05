import React, { useState, useEffect } from "react";
import "./VentilatorPrototype.css";
import AlarmBar from "./components/AlarmBar";
import WaveformPanel from "./components/WaveformPanel";
import ParameterDisplay from "./components/ParameterDisplay";
import ControlPanelBar from "./components/ControlPanelBar";
import defaultSettings from "../defaultSettings.json";
import postInitVentilatorSettings from "../fetch/FetchInit";
import postVentilatorSettings from "../fetch/Fetch";

export default function VentilatorPrototype() {
  const [theme, setTheme] = useState("dark");
  const [condition, setPatientCondition] = useState("normal");
  const [ventilatorMode, setVentilatorMode] = useState("Volume Control");
  const [weight, setWeight] = useState("70");

  const [abgData, setAbgData] = useState({
    pH: 7.4,
    PaCO2: 40,
    PaO2: 90,
    HCO3: 24,
    SaO2: "97%",
  });

  const [rate, setRate] = useState(16);
  const [pressure, setPressure] = useState(10);
  const [oxygen, setOxygen] = useState(21);
  const [volume, setVolume] = useState(500);
  const [peep, setPeep] = useState(5);

  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState(null);
  const [stateId, setStateId] = useState(null);

  /* Load defaults when condition changes — mirrors App.js useEffect */
  useEffect(() => {
    const settings = defaultSettings.find((item) => item.scenario === condition);
    if (!settings) return;

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
      weight,
      abg: settings.abg,
    })
      .then((response) => {
        if (response?.feedback) setFeedback(response.feedback);
        if (response?.status) setStatus(response.status);
        if (response?.abg) setAbgData(response.abg);
        if (response?.stateId) setStateId(response.stateId);
      })
      .catch(() => {
        setFeedback("Unable to connect to backend");
        setStatus("Error");
      });
  }, [condition]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    try {
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
      if (response?.feedback) setFeedback(response.feedback);
      if (response?.status) setStatus(response.status);
      if (response?.abg) setAbgData(response.abg);
    } catch {
      setFeedback("Error submitting settings");
      setStatus("Error");
    }
  };

  return (
    <div className="vp-shell" data-theme={theme}>
      <AlarmBar
        ventilatorMode={ventilatorMode}
        condition={condition}
        status={status}
        feedback={feedback}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
      />

      <div className="vp-body">
        <WaveformPanel
          ventilatorMode={ventilatorMode}
          rate={rate}
          volume={volume}
          peep={peep}
          pressure={pressure}
          abgData={abgData}
        />
        <ParameterDisplay
          rate={rate}
          volume={volume}
          peep={peep}
          pressure={pressure}
          oxygen={oxygen}
          abgData={abgData}
        />
      </div>

      <ControlPanelBar
        condition={condition}
        setPatientCondition={setPatientCondition}
        ventilatorMode={ventilatorMode}
        setVentilatorMode={setVentilatorMode}
        weight={weight}
        setWeight={setWeight}
        rate={rate}
        setRate={setRate}
        pressure={pressure}
        setPressure={setPressure}
        oxygen={oxygen}
        setOxygen={setOxygen}
        volume={volume}
        setVolume={setVolume}
        peep={peep}
        setPeep={setPeep}
        abgData={abgData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
