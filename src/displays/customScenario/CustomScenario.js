import React, { useState, useEffect } from 'react';
import "./customScenario.css"
import Button from '../../components/Button';
import { useDispatch } from 'react-redux';
import { setVent, setAbg, setScenarioName } from '../../redux/slices/PatientSlice';



// export default function CustomPatientModal({ isOpen, onClose, initial }) {
export default function CustomPatientModal({isOpen, onClose}) {

    const dispatch = useDispatch();

  const empty = {
    scenario: '',
    mode: 'Volume Control',
    tidalVolume: 500,
    inspiratoryPressure: 15,
    respiratoryRate: 16,
    peep: 5,
    fio2: 21,
    note: '',
    abg: {
      pH: 7.40,
      paCO2: 40,
      paO2: 95,
      hco3: 24,
      saO2: 97,
      be: 0
    }
  };

  const [form, setForm] = useState(empty);
//   console.log(isOpen)



  useEffect(() => setForm( empty), [isOpen]);

  if (!isOpen) return null;

  const set = (path, value) => {
    if (path.startsWith('abg.')) {
      const key = path.split('.')[1];
      setForm(f => ({ ...f, abg: { ...f.abg, [key]: value } }));
    } else {
      setForm(f => ({ ...f, [path]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic normalization: convert numeric fields
    const normalized = {
      ...form,
      tidalVolume: Number(form.tidalVolume) || 0,
      inspiratoryPressure: Number(form.inspiratoryPressure) || 0,
      respiratoryRate: Number(form.respiratoryRate) || 0,
      peep: Number(form.peep) || 0,
      fio2: Number(form.fio2) || 0,
      abg: {
        pH: Number(form.abg.pH),
        paCO2: Number(form.abg.paCO2),
        paO2: Number(form.abg.paO2),
        hco3: Number(form.abg.hco3),
        saO2: Number(form.abg.saO2),
        be: Number(form.abg.be)
      }
    };
    dispatch(setVent({
      mode: normalized.mode,
      tidalVolume: normalized.tidalVolume,
      respiratoryRate: normalized.respiratoryRate,
      peep: normalized.peep,
      fio2: normalized.fio2,
      inspiratoryPressure: normalized.inspiratoryPressure
    }));
    dispatch(setAbg(normalized.abg));
    dispatch(setScenarioName(normalized.scenario || ''));

    onClose();
  };
  

  return (
    <div className='customModalBackdrop'>
      <form onSubmit={handleSubmit} className='customModal'>
        <h3 className='customModalLabel'>Custom Patient</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <label >
            Scenario name
            <input value={form.scenario} onChange={e => set('scenario', e.target.value)}  />
          </label>

          <label>
            Mode
            <select value={form.mode} onChange={e => set('mode', e.target.value)}>
              <option>Volume Control</option>
              <option>Pressure Control</option>
              <option>Assist Control</option>
              <option>SIMV</option>
            </select>
          </label>

          <label>
            Tidal Volume (ml)
            <input type="number" value={form.tidalVolume} onChange={e => set('tidalVolume', e.target.value)} />
          </label>

          <label>
            Inspiratory Pressure (cmH2O)
            <input type="number" value={form.inspiratoryPressure} onChange={e => set('inspiratoryPressure', e.target.value)} />
          </label>

          <label>
            Respiratory Rate
            <input type="number" value={form.respiratoryRate} onChange={e => set('respiratoryRate', e.target.value)} />
          </label>

          <label>
            PEEP (cmH2O)
            <input type="number" value={form.peep} onChange={e => set('peep', e.target.value)} />
          </label>

          <label>
            FiO2 (%)
            <input type="number" value={form.fio2} onChange={e => set('fio2', e.target.value)} />
          </label>

          <label style={{ gridColumn: '1 / -1' }}>
            Note
            <input value={form.note} onChange={e => set('note', e.target.value)} />
          </label>

          <fieldset style={{ gridColumn: '1 / -1' }}>
            <legend>ABG</legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <label>pH<input type="number" step="0.01" value={form.abg.pH} onChange={e => set('abg.pH', e.target.value)} /></label>
              <label>paCO2<input type="number" value={form.abg.paCO2} onChange={e => set('abg.paCO2', e.target.value)} /></label>
              <label>paO2<input type="number" value={form.abg.paO2} onChange={e => set('abg.paO2', e.target.value)} /></label>
              <label>HCO3<input type="number" value={form.abg.hco3} onChange={e => set('abg.hco3', e.target.value)} /></label>
              <label>SaO2<input type="number" value={form.abg.saO2} onChange={e => set('abg.saO2', e.target.value)} /></label>
              <label>BE<input type="number" value={form.abg.be} onChange={e => set('abg.be', e.target.value)} /></label>
            </div>
          </fieldset>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
          {/* <button type="button" onClick={onClose} style={{ marginRight: 8 }}>Cancel</button> */}
          <Button type="button" onClick={onClose} className='btnClose'>Cancel</Button>
          {/* <button type="submit">Save custom patient</button> */}
          <Button type="submit" onClick={handleSubmit} className='btnClose'>Save custom patient</Button>
        </div>
      </form>
    </div>
  );
}