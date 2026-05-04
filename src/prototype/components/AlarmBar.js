import React from "react";

export default function AlarmBar({ ventilatorMode, condition, status, feedback, theme, onToggleTheme }) {
  const hasError = status === "Error" || status === "error";
  const hasFeedback = feedback && !hasError;

  const alarmClass = hasError
    ? "vp-alarm-segment vp-alarm-segment--alarm active"
    : hasFeedback
    ? "vp-alarm-segment vp-alarm-segment--alarm warning"
    : "vp-alarm-segment vp-alarm-segment--alarm";

  const alarmText = hasError
    ? feedback || "ALARM"
    : hasFeedback
    ? feedback
    : "-- NO ALARM --";

  const modeLabel = ventilatorMode
    ? `MODE: ${String(ventilatorMode).toUpperCase()}`
    : "MODE: --";

  const conditionLabel = condition
    ? `PT: ${String(condition).toUpperCase()}`
    : "PT: --";

  return (
    <div className="vp-alarm-bar">
      <span className="vp-alarm-segment vp-alarm-segment--logo">VENTI-LAB</span>
      <span className="vp-alarm-segment vp-alarm-segment--mode">{modeLabel}</span>
      <span className="vp-alarm-segment vp-alarm-segment--condition">{conditionLabel}</span>
      <span className={`vp-alarm-segment vp-alarm-segment--status${status ? "" : " standby"}`}>
        {status ? "● VENTILATING" : "◌ STANDBY"}
      </span>
      <span className={alarmClass}>{alarmText}</span>
      <button className="vp-theme-toggle" onClick={onToggleTheme}>
        {theme === "dark" ? "☀ LIGHT" : "☾ DARK"}
      </button>
    </div>
  );
}
