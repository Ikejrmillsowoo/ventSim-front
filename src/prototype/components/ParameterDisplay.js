import React from "react";

const tiles = [
  { key: "saO2",    label: "SpO2",   unit: "%",        color: "cyan",   source: "abg" },
  { key: "rate",    label: "RR",     unit: "bpm",      color: "green",  source: "param" },
  { key: "volume",  label: "Vt",     unit: "mL",       color: "yellow", source: "param" },
  { key: "peep",    label: "PEEP",   unit: "cmH₂O",    color: "orange", source: "param" },
  { key: "oxygen",  label: "FiO2",   unit: "%",        color: "white",  source: "param" },
  { key: "pressure",label: "Pinsp",  unit: "cmH₂O",    color: "yellow", source: "param" },
];

function formatValue(val) {
  if (val === undefined || val === null) return "--";
  const n = parseFloat(val);
  if (isNaN(n)) return String(val).replace("%", "");
  return Number.isInteger(n) ? n : n.toFixed(1);
}

export default function ParameterDisplay({ rate, volume, peep, pressure, oxygen, abgData }) {
  const values = {
    rate,
    volume,
    peep,
    pressure,
    oxygen,
    saO2: abgData?.saO2 ?? abgData?.SaO2,
  };

  return (
    <div className="vp-param-panel">
      {tiles.map((tile) => (
        <div key={tile.key} className="vp-param-tile" data-color={tile.color}>
          <div className="vp-param-tile__value">{formatValue(values[tile.key])}</div>
          <div className="vp-param-tile__label">{tile.label}</div>
          <div className="vp-param-tile__unit">{tile.unit}</div>
        </div>
      ))}
    </div>
  );
}
