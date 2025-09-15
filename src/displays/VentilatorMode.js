import { useState } from 'react';
import ScenarioDropdown from '../components/Dropdown';
const VentilatorMode = ({setVentilatorMode}) => {
    // Example data for scenarios. This would typically come from props or a global state.
  const [modes, setModes] = useState([
    { id: 'vc', name: 'VOLUME CONTROL' },
    { id: 'pc', name: 'PRESSURE CONTROL' },
    { id: 'ps', name: 'PRESSURE SUPPORT' },
    { id: 'cpap', name: 'CONTIMOUS POSITIVE AIRWAY PRESSURE' },
  ]);

  const [selectedMode, setSelectedMode] = useState(modes[0].id);

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    setVentilatorMode(event.target.value);
    console.log("Scenario changed to:", event.target.value);
  };

  return (
    <div>
      {/* Other header content can go here */}
      <ScenarioDropdown
        label="ventilator mode"
        scenarios={modes}
        selectedScenario={selectedMode}
        onScenarioChange={handleModeChange}
      />
    </div>
  );
};

export default VentilatorMode;