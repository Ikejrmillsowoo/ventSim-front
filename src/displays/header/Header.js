import PatientCondition from "../PatientCondition";
import VentilatorMode from "../VentilatorMode";
import './header.css';
const Header = ({ setPatientCondition }) => {
  return (
    <div className="container-fluid">
      {/* Other header content can go here */}
      {/* <div className="d-flex justify-content-center align-items-center mb-3"> */}
      <div className="row  justify-content-center">
        <div className="col-12 text-center">
          <h1 className="navbar-brand mb-3 logo">VENTISIM</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex justify-content-center">
          <VentilatorMode />
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-0 d-flex justify-content-center">
          <PatientCondition setPatientCondition={setPatientCondition} />
        </div>
      </div>
    </div>
  );
};

export default Header;
