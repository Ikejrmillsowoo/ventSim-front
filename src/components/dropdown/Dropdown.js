import React from 'react';

// A reusable dropdown component for selecting menu options
const ScenarioDropdown = ({ scenarios, selectedScenario, onScenarioChange }) => {
  return (
    <div className="scenario-selector">
      <label htmlFor="scenario-select">Choose a scenario:</label>
      <select id="scenario-select" value={selectedScenario} onChange={onScenarioChange}>
        {scenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScenarioDropdown;