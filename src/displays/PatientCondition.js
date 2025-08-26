import { useState } from 'react';
import ScenarioDropdown from '../components/dropdown/Dropdown';
const PatientCondition = () => {
  // Example data for scenarios. This would typically come from props or a global state.
  const [scenarios, setScenarios] = useState([
    { id: 'normal', name: 'NORMAL PATIENT' },
    { id: 'ards', name: 'ARDS (Acute Respiratory Distress Syndromme)' },
    { id: 'copd', name: 'COPD (Chronic Obstructive Pulmonary Disease)' },
    { id: 'asthma', name: 'ASTHMA' },
    { id: 'nuero', name: 'NEUROMASCULAR DISEASE' },
    { id: 'pe', name: 'PE (Pulmonary Emobolism)' },
    { id: 'sedation', name: 'SEDATION' },
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

export default PatientCondition;