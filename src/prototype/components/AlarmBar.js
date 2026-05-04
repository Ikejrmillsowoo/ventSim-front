import React, { useState } from "react";

export default function AlarmBar({ ventilatorMode, condition, status, feedback, theme, onToggleTheme }) {
  const [popupOpen, setPopupOpen] = useState(false);

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

  const hasMessage = hasError || hasFeedback;

  return (
    <>
      <div className="vp-alarm-bar">
        <span className="vp-alarm-segment vp-alarm-segment--logo">VENTI-LAB</span>
        <span className="vp-alarm-segment vp-alarm-segment--mode">{modeLabel}</span>
        <span className="vp-alarm-segment vp-alarm-segment--condition">{conditionLabel}</span>
        <span className={`vp-alarm-segment vp-alarm-segment--status${status ? "" : " standby"}`}>
          {status ? "● VENTILATING" : "◌ STANDBY"}
        </span>
        <span
          className={`${alarmClass}${hasMessage ? " vp-alarm-segment--clickable" : ""}`}
          onClick={() => hasMessage && setPopupOpen(true)}
          title={hasMessage ? "Click to view full message" : undefined}
        >
          {alarmText}
        </span>
        <button className="vp-theme-toggle" onClick={onToggleTheme}>
          {theme === "dark" ? "☀ LIGHT" : "☾ DARK"}
        </button>
      </div>

      {popupOpen && (
        <div className="vp-alarm-popup-overlay" onClick={() => setPopupOpen(false)}>
          <div className="vp-alarm-popup" onClick={e => e.stopPropagation()}>
            <div className="vp-alarm-popup__header">
              <span className={`vp-alarm-popup__badge${hasError ? " error" : " warning"}`}>
                {hasError ? "⚠ ALARM" : "ℹ FEEDBACK"}
              </span>
              <button className="vp-alarm-popup__close" onClick={() => setPopupOpen(false)}>✕</button>
            </div>
            <div className="vp-alarm-popup__body">{alarmText}</div>
            <div className="vp-alarm-popup__footer">
              <span>STATUS: {status || "—"}</span>
              <span>PT: {String(condition).toUpperCase()}</span>
              <span>MODE: {String(ventilatorMode).toUpperCase()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
