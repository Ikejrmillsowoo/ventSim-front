import './App.css';
import ABGDisplay from './displays/abgDisplay/ABGDisplay';
import Footer from './displays/footer/Footer';
import Header from './displays/header/Header';
import VentilatorParams from './displays/ventilatorParams/VentilatorParams';
import VentilatorSettings from './displays/ventilatorSettings/VentilatorSettings';
import postVentilatorSettings from './fetch/Fetch';

function App() {
  return (
    <div className="App">
      <postVentilatorSettings />
      <Header />
      <VentilatorParams />
      <ABGDisplay />
      <VentilatorSettings />
      <Footer />
    </div>
  );
}

export default App;
