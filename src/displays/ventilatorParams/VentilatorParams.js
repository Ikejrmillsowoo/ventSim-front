import React, { useEffect } from 'react'
import TextDisplay from '../../components/TextDisplay'
import defaultSettings from '../../defaultSettings.json';
import "./VentilatorParams.css"
/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function VentilatorParams({ventForm, className}) {


  return (
    <div className={`border rounded p-3 bg-dark text-light ${className || ''}`}>
        <h2 className='text-center'>Ventilator Parameters</h2>
    <div className='ventParams '>
        {Object.entries(ventForm).map(([label, value]) => (
        <div key={label} className='d-flex justify-content-between py-1 item' >
          {/* <span>{key}</span>
          <span>{String(value)}</span> */}
          <TextDisplay label={label} value={value} />
        </div>
      ))}
      </div>
    </div>
    
  )
}

export default VentilatorParams