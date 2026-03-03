import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scenarioName: '',
  vent: {
    mode: 'Volume Control',
    tidalVolume: 500,
    inspiratoryPressure: 15,
    respiratoryRate: 16,
    peep: 5,
    fio2: 21
  },
  abg: {
    pH: 7.4,
    paCO2: 40,
    paO2: 95,
    hco3: 24,
    saO2: 97,
    be: 0
  }
};

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setVent(state, action) {
      state.vent = { ...state.vent, ...action.payload };
    },
    setAbg(state, action) {
      state.abg = { ...state.abg, ...action.payload };
    },
    setScenarioName(state, action) {
      state.scenarioName = action.payload;
    },
    setFullPatient(state, action) {
      const p = action.payload;
      if (p.scenario) state.scenarioName = p.scenario;
      if (p.mode || p.tidalVolume) state.vent = { ...state.vent, ...(p) };
      if (p.abg) state.abg = { ...state.abg, ...p.abg };
    },
    resetPatient() {
      return initialState;
    }
  }
});

export const { setVent, setAbg, setScenarioName, setFullPatient, resetPatient } = patientSlice.actions;
export default patientSlice.reducer;