import React, { useState, useEffect } from "react";
import VentilatorWaveforms from "../../displays/VentilatorWaveForms";
import BreathIndicator from "./BreathIndicator";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

function fmt(val, key) {
  if (val === undefined || val === null) return "--";
  const n = parseFloat(String(val).replace("%", ""));
  if (isNaN(n)) return String(val).replace("%", "");
  return key === "pH" ? n.toFixed(2) : Number.isInteger(n) ? n : n.toFixed(1);
}

const ABG_ITEMS = [
  { key: "pH",    label: "pH",    unit: ""      },
  { key: "paCO2", label: "PaCO2", unit: "mmHg"  },
  { key: "paO2",  label: "PaO2",  unit: "mmHg"  },
  { key: "hco3",  label: "HCO3",  unit: "mEq/L" },
  { key: "saO2",  label: "SaO2",  unit: "%"     },
];

function resolveAbg(abgData, key) {
  if (!abgData) return undefined;
  const aliases = {
    pH:    ["pH", "ph"],
    paCO2: ["paCO2", "PaCO2", "paco2"],
    paO2:  ["paO2",  "PaO2",  "pao2"],
    hco3:  ["hco3",  "HCO3"],
    saO2:  ["saO2",  "SaO2",  "sao2"],
  };
  for (const k of (aliases[key] || [key])) {
    if (abgData[k] !== undefined) return abgData[k];
  }
  return undefined;
}

export default function WaveformPanel({
  ventilatorMode,
  rate,
  volume,
  peep,
  pressure,
  abgData,
}) {
  const isMobile = useIsMobile();

  return (
    <div className="vp-main-column">
      <div className="vp-waveform-panel">
        <VentilatorWaveforms
          mode={ventilatorMode}
          respiratoryRate={rate}
          tidalVolume={volume}
          peep={peep}
          inspiratoryPressure={pressure}
          height={isMobile ? 360 : 420}
          windowSeconds={isMobile ? 30 : 60}
          status={undefined}
          feedback={undefined}
        />
      </div>

      {/* ABG panel in the empty space */}
      <div className="vp-abg-panel">
        <div className="vp-abg-panel__label">ABG</div>
        <div className="vp-abg-panel__tiles">
          {ABG_ITEMS.map((item) => (
            <div key={item.key} className="vp-abg-panel__tile" data-key={item.key}>
              <div className="vp-abg-panel__value">
                {fmt(resolveAbg(abgData, item.key), item.key)}
              </div>
              <div className="vp-abg-panel__meta">
                <span className="vp-abg-panel__name">{item.label}</span>
                {item.unit && <span className="vp-abg-panel__unit">{item.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BreathIndicator rate={rate} />
    </div>
  );
}
