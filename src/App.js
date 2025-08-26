import './App.css';
import Footer from './displays/footer/Footer';
import Header from './displays/header/Header';
import VentilatorSettings from './displays/ventilatorSettings/VentilatorSettings';

function App() {
  return (
    <div className="App">
      <Header />
      <VentilatorSettings />
      <Footer />
    </div>
  );
}

export default App;
