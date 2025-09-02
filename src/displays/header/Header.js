import { useState } from 'react';
import ScenarioDropdown from '../../components/Dropdown';
import PatientCondition from '../PatientCondition';
import VentilatorMode from '../VentilatorMode';
const Header = ({setPatientCondition}) => {
 

  return (
    <div>
      {/* Other header content can go here */}
      <VentilatorMode />
      <PatientCondition setPatientCondition={setPatientCondition}/>
    </div>
  );
};

export default Header;