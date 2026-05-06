import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VentilatorPrototype from './prototype/VentilatorPrototype';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";

const isPrototype = new URLSearchParams(window.location.search).has('prototype');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {isPrototype ? <VentilatorPrototype /> : <App />}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
