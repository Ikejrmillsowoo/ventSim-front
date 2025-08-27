import React from 'react'
import TextDisplay from '../../components/TextDisplay'

/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function VentilatorParams() {
//     if (!params || Object.keys(params).length === 0) {
//     return <div className={className}>No parameters to display.</div>;
//   }
    const params = {
        Mode: 'Assist-Control',
        RR: 20,
        Vt: 500,
        PEEP: 5,
        PS: 10,
        FiO2: '40%',
    }

  return (
    <div>
        <h2>Ventilator Parameters</h2>
        {Object.entries(params).map(([key, value]) => (
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