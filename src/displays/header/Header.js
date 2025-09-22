import PatientCondition from "../PatientCondition";
import CurrentPatientWeight from "../CurrentPatientWeight";
import VentilatorMode from "../VentilatorMode";
import "./header.css";
const Header = ({
  weight,
  setWeight,
  setPatientCondition,
  setVentilatorMode,
}) => {
  return (
    <div className="container-fluid">
      {/* Other header content can go here */}
      {/* <div className="d-flex justify-content-center align-items-center mb-3"> */}
      <div className="row  justify-content-center">
        <div className="col-12 text-center">
          <h1 className="navbar-brand mb-3">
            <span className="logo">VENTISIM</span>
          </h1>
        </div>
      </div>
      <div className="row justify-content-center header-controls">
        <div className="col-12 col-md-4 mb-2 mb-md-0 d-flex justify-content-center">
          <div className="control-wrapper">
            <VentilatorMode setVentilatorMode={setVentilatorMode} />
          </div>
        </div>
        <div className="col-12 col-md-4 mb-2 mb-md-0 d-flex justify-content-center">
          <div className="control-wrapper">
            <CurrentPatientWeight weight={weight} setWeight={setWeight} />
          </div>
        </div>
        <div className="col-12 col-md-4 mb-2 mb-md-0 d-flex justify-content-center">
          <div className="control-wrapper">
            <PatientCondition setPatientCondition={setPatientCondition} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
