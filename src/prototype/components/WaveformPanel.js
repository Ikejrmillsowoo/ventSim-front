import React from "react";
import VentilatorWaveforms from "../../displays/VentilatorWaveForms";
import BreathIndicator from "./BreathIndicator";

export default function WaveformPanel({
  ventilatorMode,
  rate,
  volume,
  peep,
  pressure,
}) {
  return (
    <div className="vp-main-column">
      <div className="vp-waveform-panel">
        <VentilatorWaveforms
          mode={ventilatorMode}
          respiratoryRate={rate}
          tidalVolume={volume}
          peep={peep}
          inspiratoryPressure={pressure}
          height={420}
          /* suppress embedded footer — AlarmBar handles status display */
          status={undefined}
          feedback={undefined}
        />
      </div>
      <BreathIndicator rate={rate} />
    </div>
  );
}
