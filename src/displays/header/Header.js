import { useState } from 'react';
import ScenarioDropdown from '../../components/Dropdown';
import PatientCondition from '../PatientCondition';
import VentilatorMode from '../VentilatorMode';
const Header = ({setPatientCondition}) => {
 

  return (
    <div className='navbar navbar-expand-lg navbar-light bg-dark sticky-top text-white  w-100 '>
      {/* Other header content can go here */}
    <div className="mx-auto">
       <VentilatorMode />
    </div>
     <div className="mx-auto">
      <PatientCondition setPatientCondition={setPatientCondition}/>
     </div>
      
    </div>
  );
};

export default Header;