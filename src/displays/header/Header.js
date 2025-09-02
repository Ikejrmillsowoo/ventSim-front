import { useState } from 'react';
import ScenarioDropdown from '../../components/Dropdown';
import PatientCondition from '../PatientCondition';
import VentilatorMode from '../VentilatorMode';
const Header = ({setPatientCondition}) => {
 

  return (
    <div className='container-fluid bg-dark text-white py-3 w-100'>
      {/* Other header content can go here */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <h1 className="navbar-brand mb-0 h1 text-center">Ventilator Simulation</h1>
      </div>
      <div className="d-flex justify-content-around align-items-center">
<div className="mx-2">
       <VentilatorMode />
    </div>
     <div className="mx-2">
      <PatientCondition setPatientCondition={setPatientCondition}/>
     </div>
      </div>
    
      
    </div>
  );
};

export default Header;