import { useState } from 'react';
import ScenarioDropdown from '../components/Dropdown';
const VentilatorMode = ({setVentilatorMode}) => {
    // Example data for scenarios. This would typically come from props or a global state.
  const [modes, setModes] = useState([
    { id: 'Volume Control', name: 'VOLUME CONTROL' },
    { id: 'Pressure Control', name: 'PRESSURE CONTROL' },
    { id: 'Pressure Support', name: 'PRESSURE SUPPORT' },
    { id: 'Continuous Positive Pressure Support', name: 'CONTINOUS POSITIVE AIRWAY PRESSURE' },
  ]);

  const [selectedMode, setSelectedMode] = useState(modes[0].id);
 

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    setVentilatorMode(event.target.value);
    // console.log("Mode changed to:", event.target.value);
  };

  return (
    <div>
      {/* Other header content can go here */}
      <ScenarioDropdown
        label="Ventilator Mode"
        scenarios={modes}
        selectedScenario={selectedMode}
        onScenarioChange={handleModeChange}
      />
    </div>
  );
};

export default VentilatorMode;