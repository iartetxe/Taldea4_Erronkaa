import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; 
import Hasiera from './pages/Hasiera';

import Kontaktua from './pages/Kontaktua.js';
import Erregistratu from './pages/Erregistratu.js';

function App() {
  return (

    <BrowserRouter>
    
      <Routes>
     
        <Route path="/" element={<Layout />}> 
          
    
          <Route index element={<Hasiera />} />
          
          <Route path="kontaktua" element={<Kontaktua />} /> 
          <Route path="erregistratu" element={<Erregistratu />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;