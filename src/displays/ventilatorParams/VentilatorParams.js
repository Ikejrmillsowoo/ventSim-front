import React from 'react'
import TextDisplay from '../../components/TextDisplay'
import defaultSettings from '../../defaultSettings.json';
/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function VentilatorParams({condition, className}) {
//     if (!params || Object.keys(params).length === 0) {
//     return <div className={className}>No parameters to display.</div>;
//   }

const settings = defaultSettings.find(item => item.scenario === condition);
const [ventForm, setVentForm] = React.useState({
  mode: settings.mode,
  tidalVolume: settings.tidalVolume ?? '',
  respiratoryRate: settings.respiratoryRate,
  peep: settings.peep,
  fio2: settings.fio2,
  inspiratoryPressure: settings.inspiratoryPressure ?? '',
  supportPressure: settings.supportPressure ?? '',
});

    const params = {
       mode: settings.mode,
  tidalVolume: settings.tidalVolume ?? '',
  respiratoryRate: settings.respiratoryRate,
  peep: settings.peep,
  fio2: settings.fio2,
  inspiratoryPressure: settings.inspiratoryPressure ?? '',
  supportPressure: settings.supportPressure ?? '',
    }

  return (
    <div>
        <h2>Ventilator Parameters</h2>
        {Object.entries(ventForm).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
          {/* <span>{key}</span>
          <span>{String(value)}</span> */}
          <TextDisplay text={`${key}: ${value}`} />
        </div>
      ))}
    </div>
  )
}

export default VentilatorParams