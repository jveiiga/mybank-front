import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação das páginas
import Pessoa from './pages/Pessoa';
import Conta from './pages/Conta';
import Movimentacao from './pages/Movimentacao';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Pessoa />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/movimentacao" element={<Movimentacao />} />
      </Routes>
  );
}

export default App;