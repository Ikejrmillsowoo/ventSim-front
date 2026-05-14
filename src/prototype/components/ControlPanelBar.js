import React, { useState, useEffect } from "react";
import PatientCondition from "../../displays/PatientCondition";
import VentilatorMode from "../../displays/VentilatorMode";
import PatientWeight from "../../displays/CurrentPatientWeight";

const sliders = [
  { key: "rate",     label: "RR",      unit: "bpm",   min: 0,  max: 40,   step: 1  },
  { key: "pressure", label: "Pinsp",   unit: "cmH₂O", min: 0,  max: 50,   step: 1  },
  { key: "oxygen",   label: "FiO2",    unit: "%",     min: 21, max: 100,  step: 1  },
  { key: "volume",   label: "Vt",      unit: "mL",    min: 0,  max: 3000, step: 50 },
  { key: "peep",     label: "PEEP",    unit: "cmH₂O", min: 0,  max: 30,   step: 1  },
];

function formatAbgValue(val, key) {
  if (val === undefined || val === null) return "--";
  const str = String(val).replace("%", "");
  const n = parseFloat(str);
  if (isNaN(n)) return str;
  if (key === "pH") return n.toFixed(2);
  return Number.isInteger(n) ? n : n.toFixed(1);
}

export default function ControlPanelBar({
  condition, setPatientCondition,
  ventilatorMode, setVentilatorMode,
  weight, setWeight,
  rate, setRate,
  pressure, setPressure,
  oxygen, setOxygen,
  volume, setVolume,
  peep, setPeep,
  abgData,
  onSubmit,
}) {
  const [local, setLocal] = useState({ rate, pressure, oxygen, volume, peep });

  useEffect(() => {
    setLocal({ rate, pressure, oxygen, volume, peep });
  }, [rate, pressure, oxygen, volume, peep]);

  const setters = { rate: setRate, pressure: setPressure, oxygen: setOxygen, volume: setVolume, peep: setPeep };

  const handleSlider = (key, val) => {
    const n = Number(val);
    setLocal((prev) => ({ ...prev, [key]: n }));
    setters[key](n);
  };

  const abgItems = [
    { key: "pH",    label: "pH",     value: abgData?.pH ?? abgData?.ph },
    { key: "paCO2", label: "PaCO2",  value: abgData?.paCO2 ?? abgData?.PaCO2 },
    { key: "paO2",  label: "PaO2",   value: abgData?.paO2  ?? abgData?.PaO2  },
    { key: "hco3",  label: "HCO3",   value: abgData?.hco3  ?? abgData?.HCO3  },
    { key: "saO2",  label: "SaO2",   value: abgData?.saO2  ?? abgData?.SaO2  },
  ];

  return (
    <div className="vp-control-bar">
      {/* Row 1 — identity controls */}
      <div className="vp-control-row">
        <PatientCondition setPatientCondition={setPatientCondition} />
        <VentilatorMode setVentilatorMode={setVentilatorMode} />
        <PatientWeight setWeight={setWeight} weight={weight} />
      </div>

      {/* Row 2 — sliders + apply button */}
      <div className="vp-control-row">
        <div className="vp-slider-bank">
          {sliders.map(({ key, label, unit, min, max, step }) => (
            <div key={key} className="vp-slider-item">
              <div className="vp-slider-item__label">{label}</div>
              <div className="vp-slider-item__value">
                {local[key]}
                <span style={{ fontSize: "0.55rem", opacity: 0.5, marginLeft: 2 }}>{unit}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={local[key]}
                onChange={(e) => handleSlider(key, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className="vp-apply-btn" onClick={onSubmit}>
          APPLY
        </button>
      </div>

      {/* Row 3 — ABG strip */}
      {/* <div className="vp-abg-strip">
        <span className="vp-abg-item__label" style={{ alignSelf: "center", marginRight: 4 }}>ABG:</span>
        {abgItems.map((item, i) => (
          <React.Fragment key={item.key}>
            <div className="vp-abg-item" data-key={item.key}>
              <div className="vp-abg-item__label">{item.label}</div>
              <div className="vp-abg-item__value">{formatAbgValue(item.value, item.key)}</div>
            </div>
            {i < abgItems.length - 1 && <div className="vp-abg-divider">·</div>}
          </React.Fragment>
        ))}
      </div> */}
    </div>
  );
}
