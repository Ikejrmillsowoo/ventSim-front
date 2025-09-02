import React, { useEffect, useState } from 'react'
import TextDisplay from '../../components/TextDisplay'
/**
 * A component that receives an object of ventilator parameters and displays them.
 * @param {object} props - The component props.
 * @param {object} props.params - An object containing the ventilator parameters to display.
 * @param {string} [props.className] - Optional CSS class for styling the container.
 */
function ABGDisplay({abgData}) {
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
    <div>
         <h2>ABG Results</h2>
        {Object.entries(abgData).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
          {/* <span>{key}</span>
          <span>{String(value)}</span> */}
          <TextDisplay text={`${key}: ${value}`} />
        </div>
      ))}
    </div>
  )
}

export default ABGDisplay