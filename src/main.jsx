import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Importando o componente principal
import './styles/global/Global.css'; // Importando os estilos globais
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Header /> {/* O Header ficará aqui */}
      <App />
      <Footer /> {/* O Footer ficará aqui */}
    </Router>
  </React.StrictMode>
);