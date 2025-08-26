import { useState } from 'react';
import ScenarioDropdown from '../components/dropdown/Dropdown';
const VentilatorMode = () => {
  // Example data for scenarios. This would typically come from props or a global state.
  const [scenarios, setScenarios] = useState([
    { id: 'vc', name: 'VOLUME CONTROL' },
    { id: 'pc', name: 'PRESSURE CONTROL' },
    { id: 'ps', name: 'PRESSURE SUPPORT' },
    { id: 'cpap', name: 'CONTIMOUS POSITIVE AIRWAY PRESSURE' },
  ]);

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0].id);

  const handleScenarioChange = (event) => {
    setSelectedScenario(event.target.value);
    console.log("Scenario changed to:", event.target.value);
  };

  return (
    <div>
      {/* Other header content can go here */}
      <ScenarioDropdown
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        onScenarioChange={handleScenarioChange}
      />
    </div>
  );
};

export default VentilatorMode;