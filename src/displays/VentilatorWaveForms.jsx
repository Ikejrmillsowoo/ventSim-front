import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

/**
 * VentilatorWaveforms
 * Live, locally-simulated ventilator waveforms over a 60s rolling window.
 * Shows three panels:
 *  1) Volume vs Time (mL)
 *  2) Pressure vs Time (cmH2O)
 *  3) Flow–Volume loop (L/s vs mL) for the MOST RECENT breath
 *
 * Defaults:
 *  - I:E = 1:2
 *  - compliance = 50 mL/cmH2O, resistance = 10 cmH2O/L/s
 *  - updates ~20 FPS, rolling 60s buffer
 *
 * Props:
 *  - mode: string ("Volume Control" | "Pressure Control" | "PSV" | aliases like VC/PC)
 *  - respiratoryRate: number (bpm)
 *  - tidalVolume: number (mL) – used in VC
 *  - peep: number (cmH2O)
 *  - inspiratoryPressure: number (cmH2O above PEEP) – used in PC
 *  - supportPressure: number (cmH2O above PEEP) – used in PSV
 *  - compliance: number (mL/cmH2O), default 50
 *  - resistance: number (cmH2O/L/s), default 10
 *  - ieRatio: string like "1:2" (default)
 *  - height: total height px (default 540)
 */
export default function VentilatorWaveforms({
  mode = "Volume Control",
  respiratoryRate = 16,
  tidalVolume = 500,
  peep = 5,
  inspiratoryPressure = 16,
  supportPressure = 10,
  compliance = 50, // mL/cmH2O
  resistance = 10, // cmH2O/L/s
  ieRatio = "1:2",
  height = 540,
}) {
  // Parse mode & IE
  const parsedMode = useMemo(() => normalizeMode(mode), [mode]);
  const { Ti, Te, T } = useMemo(() => computeTiming(respiratoryRate, ieRatio), [respiratoryRate, ieRatio]);

  // Engine settings
  const dt = 0.05; // 50 ms per frame (~20 FPS)
  const maxPoints = Math.ceil(60 / dt); // 60s window

  // State: rolling series and the loop of the most recent breath
  const [series, setSeries] = useState([]); // [{t, volume, pressure, flow}]
  const [loopData, setLoopData] = useState([]); // [{volume, flow}] for last full breath

  // Refs for simulation timeline and breath detection
  const startRef = useRef(perfNowS());
  const prevTmodRef = useRef(0);
  const loopCollectorRef = useRef([]);
  const animRef = useRef(null);

  // Reset when key parameters change significantly
  useEffect(() => {
    setSeries([]);
    setLoopData([]);
    loopCollectorRef.current = [];
    startRef.current = perfNowS();
    prevTmodRef.current = 0;
  }, [parsedMode, respiratoryRate, tidalVolume, peep, inspiratoryPressure, supportPressure, compliance, resistance, ieRatio]);

  // Simulation loop
  useEffect(() => {
    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      const now = perfNowS();
      const tElapsed = now - startRef.current; // seconds since (re)init

      // Position inside current breath
      const tmodRaw = tElapsed % T; // [0, T)

      const { volume, pressure, flow } = computeWaveformsAtTime({
        mode: parsedMode,
        tmod: tmodRaw,
        Ti,
        Te,
        T,
        vt_ml: tidalVolume,
        peep_cmH2O: peep,
        pinsp_delta_cmH2O: inspiratoryPressure,
        psv_cmH2O: supportPressure,
        compliance_ml_per_cmH2O: compliance,
        resistance_cmH2O_per_Lps: resistance,
      });

      // Build new point
      const tDisplay = Math.max(0, Math.min(60, tElapsed));
      const point = { t: tDisplay, volume, pressure, flow };

      // Update rolling series (max 60s)
      setSeries((prev) => {
        const next = [...prev, point];
        if (next.length > maxPoints) next.shift();
        return next;
      });

      // Collect loop for the latest breath
      loopCollectorRef.current.push({ volume, flow });

      // Detect breath boundary (tmod wrap)
      const prevTmod = prevTmodRef.current;
      if (tmodRaw < prevTmod) {
        // new breath started → freeze last breath's loop
        setLoopData(loopCollectorRef.current);
        loopCollectorRef.current = [];
      }
      prevTmodRef.current = tmodRaw;

      animRef.current = setTimeout(tick, dt * 1000);
    };

    tick();
    return () => {
      mounted = false;
      if (animRef.current) clearTimeout(animRef.current);
    };
  }, [parsedMode, Ti, Te, T, tidalVolume, peep, inspiratoryPressure, supportPressure, compliance, resistance, dt, maxPoints]);

  const panelH = Math.max(160, Math.floor(height / 3));

  return (
    <div className="w-full space-y-6">
      {/* Volume vs Time */}
      <ChartPanel title="Volume vs Time (mL)" height={panelH} >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" type="number" domain={[0, 60]} tickFormatter={(v) => `${Math.floor(v)}s`} />
            <YAxis domain={[0, autoMax(series, "volume", 800)]} />
            <Tooltip formatter={(v, n) => [fmtNum(v), n]} labelFormatter={(l) => `${fmtNum(l)} s`} />
            <Legend />
            <ReferenceLine y={0} strokeDasharray="3 3" />
            <Line isAnimationActive={false} type="monotone" dataKey="volume" name="Volume (mL)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      {/* Pressure vs Time */}
      <ChartPanel title="Pressure vs Time (cmH₂O)" height={panelH} >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" type="number" domain={[0, 60]} tickFormatter={(v) => `${Math.floor(v)}s`} />
            <YAxis domain={[0, autoMax(series, "pressure", 40)]} />
            <Tooltip formatter={(v, n) => [fmtNum(v), n]} labelFormatter={(l) => `${fmtNum(l)} s`} />
            <Legend />
            <ReferenceLine y={peep} strokeDasharray="4 2" label="PEEP" />
            <Line isAnimationActive={false} type="monotone" dataKey="pressure" name="Pressure (cmH₂O)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>

      {/* Flow–Volume loop (last breath) */}
      <ChartPanel title="Flow–Volume Loop (last breath)" height={panelH} >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={loopData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="volume" type="number" domain={[0, autoMax(loopData, "volume", 800)]} tickFormatter={(v) => `${Math.round(v)} mL`} />
            <YAxis dataKey="flow" type="number" domain={[autoMin(loopData, "flow", -2), autoMax(loopData, "flow", 2)]} tickFormatter={(v) => `${fmtNum(v)} L/s`} />
            <Tooltip formatter={(v, n) => [n === "flow" ? `${fmtNum(v)} L/s` : `${Math.round(v)} mL`, n]} />
            <Legend />
            <ReferenceLine y={0} strokeDasharray="4 2" />
            <Line isAnimationActive={false} type="monotone" dataKey="flow" name="Flow (L/s)" dot={false} xAxisId={0} yAxisId={0} />
          </LineChart>
        </ResponsiveContainer>
      </ChartPanel>
    </div>
  );
}

/** Utility chart wrapper */
function ChartPanel({ title, height, children, color = "white" }) {
  return (
    <div className="rounded-2xl shadow-sm border p-3" style={{ height, color }}>
      <div className="text-sm font-semibold mb-2 opacity-80">{title}</div>
      {children}
    </div>
  );
}

/** Math / physiology helpers */
function normalizeMode(mode) {
  const m = String(mode || "").toLowerCase().replace(/\s+/g, "");
  if (m === "vc" || m === "volumecontrol") return "VC";
  if (m === "pc" || m === "pressurecontrol") return "PC";
  if (m === "psv" || m === "pressuresupport") return "PSV";
  return "VC";
}

function computeTiming(rr, ie = "1:2") {
  const RR = Math.max(6, Number(rr) || 16);
  const T = 60 / RR; // sec per breath
  const [iStr, eStr] = String(ie).split(":");
  const I = Number(iStr) || 1;
  const E = Number(eStr) || 2;
  const Ti = T * (I / (I + E));
  const Te = T - Ti;
  return { Ti, Te, T };
}

function computeWaveformsAtTime({
  mode, tmod, Ti, Te, T,
  vt_ml, peep_cmH2O,
  pinsp_delta_cmH2O, psv_cmH2O,
  compliance_ml_per_cmH2O, resistance_cmH2O_per_Lps,
}) {
  const Cml = Math.max(8, compliance_ml_per_cmH2O);
  const R = Math.max(1, resistance_cmH2O_per_Lps);
  const tau = R * (Cml / 1000); // seconds

  let volume_ml = 0;
  let flow_Lps = 0;
  let pressure_cmH2O = peep_cmH2O;

  if (mode === "VC") {
    // Volume Control
    const Vt = Math.max(100, vt_ml);
    if (tmod <= Ti) {
      // constant inspiratory flow
      flow_Lps = (Vt / 1000) / Ti;
      volume_ml = (Vt * (tmod / Ti));
    } else {
      const tex = tmod - Ti;
      const Vinit = Vt;
      const vL = (Vinit / 1000) * Math.exp(-tex / tau);
      volume_ml = vL * 1000;
      flow_Lps = -(Vinit / 1000) * (1 / tau) * Math.exp(-tex / tau);
    }
    const elastic = (volume_ml / Cml); // cmH2O
    const resistive = (flow_Lps * R);
    pressure_cmH2O = Math.max(peep_cmH2O, peep_cmH2O + elastic + resistive);
  }
  else if (mode === "PC") {
    // Pressure Control
    const Pdelta = Math.max(0, Number(pinsp_delta_cmH2O) || 0);
    const Vt = Math.max(100, Pdelta * Cml); // expected plateau Vt
    if (tmod <= Ti) {
      // exponential fill toward Vt
      const vL = (Vt / 1000) * (1 - Math.exp(-tmod / tau));
      volume_ml = vL * 1000;
      flow_Lps = (Vt / 1000) * (1 / tau) * Math.exp(-tmod / tau);
      pressure_cmH2O = peep_cmH2O + Pdelta; // square pressure
    } else {
      // passive expiration
      const tex = tmod - Ti;
      const vLend = (Vt / 1000); // volume at end-inspiration (L)
      const vL = vLend * Math.exp(-tex / tau);
      volume_ml = vL * 1000;
      flow_Lps = -vLend * (1 / tau) * Math.exp(-tex / tau);
      const elastic = (volume_ml / Cml);
      const resistive = (flow_Lps * R);
      pressure_cmH2O = Math.max(peep_cmH2O, Math.min(peep_cmH2O + Pdelta, peep_cmH2O + elastic + resistive));
    }
  }
  else {
    // PSV (Pressure Support Ventilation)
    const PS = Math.max(0, Number(psv_cmH2O) || 0);
    const Vt = Math.max(100, PS * Cml);
    if (tmod <= Ti) {
      const vL = (Vt / 1000) * (1 - Math.exp(-tmod / tau));
      volume_ml = vL * 1000;
      flow_Lps = (Vt / 1000) * (1 / tau) * Math.exp(-tmod / tau);
      pressure_cmH2O = peep_cmH2O + PS; // simplified square during support
    } else {
      const tex = tmod - Ti;
      const vLend = (Vt / 1000);
      const vL = vLend * Math.exp(-tex / tau);
      volume_ml = vL * 1000;
      flow_Lps = -vLend * (1 / tau) * Math.exp(-tex / tau);
      const elastic = (volume_ml / Cml);
      const resistive = (flow_Lps * R);
      pressure_cmH2O = Math.max(peep_cmH2O, Math.min(peep_cmH2O + PS, peep_cmH2O + elastic + resistive));
    }
  }

  // Guardrails
  volume_ml = clamp(volume_ml, 0, 1500);
  pressure_cmH2O = clamp(pressure_cmH2O, 0, 80);
  flow_Lps = clamp(flow_Lps, -3.5, 3.5);

  return { volume: volume_ml, pressure: pressure_cmH2O, flow: flow_Lps };
}

// --- utils ---
function perfNowS() { return performance.now() / 1000; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function fmtNum(v) { return Number(v).toFixed(2); }
function autoMax(arr, key, fallback) {
  if (!arr || arr.length === 0) return fallback;
  const m = Math.max(...arr.map((d) => (Number.isFinite(d[key]) ? d[key] : -Infinity)));
  if (!Number.isFinite(m)) return fallback;
  const pad = Math.max(5, Math.abs(m) * 0.1);
  return Math.ceil((m + pad) / 5) * 5;
}
function autoMin(arr, key, fallback) {
  if (!arr || arr.length === 0) return fallback;
  const m = Math.min(...arr.map((d) => (Number.isFinite(d[key]) ? d[key] : Infinity)));
  if (!Number.isFinite(m)) return fallback;
  const pad = Math.max(1, Math.abs(m) * 0.1);
  return Math.floor((m - pad) / 1) * 1;
}
