import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes del Layout y Pages:
// 1. Corregida la ruta para Layout (está en la carpeta components)
import Layout from './components/layout'; 
import Hasiera from './pages/Hasiera';
// 2. Asumimos que moviste y renombraste a Formulario.js en la carpeta pages
import Kontaktua from './pages/Kontaktua.js'; 

function App() {
  return (
    // BrowserRouter permite usar la navegación del navegador
    <BrowserRouter>
      {/* Routes define el área donde las rutas serán renderizadas */}
      <Routes>
        
        {/* RUTA PADRE: Define que todas las rutas anidadas usarán el componente Layout.
            El componente Layout debe usar <Outlet /> internamente.
        */}
        <Route path="/" element={<Layout />}> 
          
          {/* RUTA HIJA 1 (Index):
              Renderiza el componente Hasiera cuando la ruta es exactamente "/"
          */}
          <Route index element={<Hasiera />} />
          
          {/* RUTA HIJA 2:
              Renderiza el componente Formulario cuando la ruta es "/formulario"
          */}
          <Route path="kontaktua" element={<Kontaktua />} /> 
          
          {/* Puedes añadir más rutas aquí si es necesario (ej. /acerca-de, /contacto, etc.) */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;