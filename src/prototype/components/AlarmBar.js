import React, { useState } from "react";

function abbreviateMode(mode) {
  const m = String(mode).toUpperCase();
  if (m.includes("VOLUME"))   return "VC";
  if (m.includes("PRESSURE CONTROL") || m === "PC") return "PC";
  if (m.includes("PRESSURE SUPPORT") || m === "PSV") return "PSV";
  if (m.includes("CPAP") || m.includes("CONTINUOUS")) return "CPAP";
  return m.slice(0, 4);
}

const HELP_STEPS = [
  { n: "1", title: "Select a Patient Condition", body: "Use the 'Set a Patient Condition' dropdown at the bottom to choose a scenario (e.g. ARDS, COPD, Asthma). The ventilator settings and ABG values will update automatically." },
  { n: "2", title: "Review the ABG Values", body: "Check the ABG strip at the bottom: pH, PaCO2, PaO2, HCO3, and SaO2. These reflect the patient's current acid-base and oxygenation status." },
  { n: "3", title: "Adjust Ventilator Settings", body: "Use the sliders at the bottom to change RR, Pinsp, FiO2, Vt, and PEEP. You can also change the ventilator mode (VC / PC / PSV / CPAP)." },
  { n: "4", title: "Apply and Observe", body: "Click the APPLY button to submit your settings. The ABG values will update to reflect the effect of your changes on the patient." },
  { n: "5", title: "Check Feedback", body: "Click the alarm button (top right) at any time to read the full clinical feedback message about the patient's response to your ventilator settings." },
];

export default function AlarmBar({ ventilatorMode, condition, status, feedback, theme, onToggleTheme }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

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

  const modeAbbr = ventilatorMode ? abbreviateMode(ventilatorMode) : "--";
  const modeFull = ventilatorMode ? `MODE: ${String(ventilatorMode).toUpperCase()}` : "MODE: --";

  const conditionLabel = condition
    ? `PT: ${String(condition).toUpperCase()}`
    : "PT: --";

  const hasMessage = hasError || hasFeedback;

  return (
    <>
      <div className="vp-alarm-bar">
        <span className="vp-alarm-segment vp-alarm-segment--logo">VENTI-LAB</span>
        <span className="vp-alarm-segment vp-alarm-segment--mode vp-mode-full">{modeFull}</span>
        <span className="vp-alarm-segment vp-alarm-segment--mode vp-mode-abbr">{modeAbbr}</span>
        <span className="vp-alarm-segment vp-alarm-segment--condition">{conditionLabel}</span>

        {/* HELP replaces STANDBY */}
        <button className="vp-help-btn" onClick={() => setHelpOpen(true)}>? HELP</button>

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

      {/* Alarm / feedback popup */}
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

      {/* Help popup */}
      {helpOpen && (
        <div className="vp-alarm-popup-overlay" onClick={() => setHelpOpen(false)}>
          <div className="vp-alarm-popup vp-help-popup" onClick={e => e.stopPropagation()}>
            <div className="vp-alarm-popup__header">
              <span className="vp-alarm-popup__badge help">? HOW TO USE</span>
              <button className="vp-alarm-popup__close" onClick={() => setHelpOpen(false)}>✕</button>
            </div>
            <div className="vp-alarm-popup__body vp-help-body">
              {HELP_STEPS.map(step => (
                <div key={step.n} className="vp-help-step">
                  <div className="vp-help-step__num">{step.n}</div>
                  <div className="vp-help-step__content">
                    <div className="vp-help-step__title">{step.title}</div>
                    <div className="vp-help-step__body">{step.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="vp-alarm-popup__footer">
              <span>VENTI-LAB — Ventilator Simulator</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
