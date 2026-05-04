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

export default function WaveformPanel({
  ventilatorMode,
  rate,
  volume,
  peep,
  pressure,
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
      <BreathIndicator rate={rate} />
    </div>
  );
}
