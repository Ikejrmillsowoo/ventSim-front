import React, { useState, useEffect } from "react";

function parseIERatio(ieRatio = "1:2") {
  const parts = String(ieRatio).split(":");
  const i = parseFloat(parts[0]) || 1;
  const e = parseFloat(parts[1]) || 2;
  return { i, e };
}

export default function BreathIndicator({
  rate = 16,
  compliance = 50,
  resistance = 10,
  ieRatio = "1:2",
}) {
  const [isInspiration, setIsInspiration] = useState(true);

  useEffect(() => {
    if (!rate || rate <= 0) return;

    const T = 60 / rate;
    const { i, e } = parseIERatio(ieRatio);
    const Ti = T * (i / (i + e));

    const interval = setInterval(() => {
      const elapsed = (performance.now() / 1000) % T;
      setIsInspiration(elapsed < Ti);
    }, 200);

    return () => clearInterval(interval);
  }, [rate, ieRatio]);

  const T = rate > 0 ? (60 / rate).toFixed(1) : "--";

  return (
    <div className="vp-breath-indicator">
      <div className="vp-breath-phases">
        <div className={`vp-breath-phase${isInspiration ? " vp-breath-phase--active" : ""}`}>
          ▶ INSPIRATION
        </div>
        <div className={`vp-breath-phase${!isInspiration ? " vp-breath-phase--active" : ""}`}>
          ◀ EXPIRATION
        </div>
      </div>
      <div className="vp-breath-meta">
        I:E {ieRatio} &nbsp;|&nbsp; T={T}s &nbsp;|&nbsp;
        C={compliance} mL/cmH₂O &nbsp;|&nbsp; R={resistance} cmH₂O/L/s
      </div>
    </div>
  );
}
