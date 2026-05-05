import React, { useState } from "react";

function abbreviateMode(mode) {
  const m = String(mode).toUpperCase();
  if (m.includes("VOLUME"))   return "VC";
  if (m.includes("PRESSURE CONTROL") || m === "PC") return "PC";
  if (m.includes("PRESSURE SUPPORT") || m === "PSV") return "PSV";
  if (m.includes("CPAP") || m.includes("CONTINUOUS")) return "CPAP";
  return m.slice(0, 4);
}

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

  const modeAbbr  = ventilatorMode ? abbreviateMode(ventilatorMode) : "--";
  const modeFull  = ventilatorMode ? `MODE: ${String(ventilatorMode).toUpperCase()}` : "MODE: --";

  const conditionLabel = condition
    ? `PT: ${String(condition).toUpperCase()}`
    : "PT: --";

  const hasMessage = hasError || hasFeedback;

  return (
    <>
      <div className="vp-alarm-bar">
        <span className="vp-alarm-segment vp-alarm-segment--logo">VENTI-LAB</span>
        {/* Desktop: full mode name — Mobile: abbreviation only */}
        <span className="vp-alarm-segment vp-alarm-segment--mode vp-mode-full">{modeFull}</span>
        <span className="vp-alarm-segment vp-alarm-segment--mode vp-mode-abbr">{modeAbbr}</span>
        <span className="vp-alarm-segment vp-alarm-segment--condition">{conditionLabel}</span>
        <span className={`vp-alarm-segment vp-alarm-segment--status${status ? "" : " standby"}`}>
          {status ? "● VENTILATING" : "◌ STANDBY"}
        </span>

        <div className="vp-alarm-bar__right">
          <button
            className={`vp-alarm-btn${hasError ? " error" : hasFeedback ? " warning" : " silent"}`}
            onClick={() => hasMessage && setPopupOpen(true)}
            disabled={!hasMessage}
            title={hasMessage ? alarmText : "No active alarms"}
          >
            {hasError ? "⚠ ALARM" : hasFeedback ? "ℹ MSG" : "✓ CLEAR"}
          </button>
          <button className="vp-theme-toggle" onClick={onToggleTheme}>
            {theme === "dark" ? "☀ LIGHT" : "☾ DARK"}
          </button>
        </div>
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
