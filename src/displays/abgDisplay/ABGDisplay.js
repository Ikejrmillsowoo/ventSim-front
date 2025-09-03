import React, { useEffect, useState } from 'react'
import TextDisplay from '../../components/TextDisplay'
/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function ABGDisplay({abgData, className}) {
    // const [params, setParams] = useState({
    //     pH: 7.4,
    //     PaCO2: 40,
    //     PaO2: 90,
    //     HCO3: 24,
    //     SaO2: '97%',
    // });

    // useEffect(() => {
    //     if (data && Object.keys(data).length > 0) {
    //         setParams(data);
    //     }
    // }, [data]);
   

  return (
    <div className={`border rounded p-3 bg-dark text-light ${className || ''}`}>
         <h2 className='text-center'>ABG Results</h2>
         <div className='ventParams '>
        {Object.entries(abgData).map(([label, value]) => (
        <div key={label} className='d-flex justify-content-between py-1 item'>
          {/* <span>{key}</span>
          <span>{String(value)}</span> */}
          <TextDisplay  label={label} value={value} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default ABGDisplay