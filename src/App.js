import { useState } from 'react';
import './App.css';
import ABGDisplay from './displays/abgDisplay/ABGDisplay';
import Footer from './displays/footer/Footer';
import Header from './displays/header/Header';
import VentilatorParams from './displays/ventilatorParams/VentilatorParams';
import VentilatorSettings from './displays/ventilatorSettings/VentilatorSettings';
import postVentilatorSettings from './fetch/Fetch';

function App() {
  const [condition, setPatientCondition] = useState('normal');
  console.log("Patient condition in Header:", condition);
  const [data, setData] = useState({
    // ph: 7.4,
    // paCO2: 40,
    // paO2: 90,
    // hco3: 24,
    // saO2: '97%',
    // feedback: 'Stable',
    // status: 'Normal',
  });

  async function handleClick() {
    try {
      const result = await postVentilatorSettings({ RR: 20, Vt: 500, PEEP: 5 });
      setData(result);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <Header setPatientCondition={setPatientCondition}/>
      <VentilatorParams condition={condition} />
      <ABGDisplay data={data} />
      <VentilatorSettings setData={setData} />
      <Footer />
    </div>
  );
}

export default App;
