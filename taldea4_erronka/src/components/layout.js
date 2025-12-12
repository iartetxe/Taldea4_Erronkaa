import React from 'react';
import { Outlet } from 'react-router-dom';

// 1. Importación de Navbar: desde layout.js (en components/) a Nav/Navbar.js
import Navbar from './Nav/Navbar';

// 2. Importación de Footer: desde layout.js (en components/) a Footer/footer.js
//    Nota: Asegúrate de que el archivo se llame 'footer.js' con minúscula inicial.
import Footer from './Footer/footer'; 

const Layout = () => {
  return (
    // 'd-flex flex-column min-vh-100' es útil para que el footer se quede en la parte inferior
    <div className="d-flex flex-column min-vh-100">
      
      <header>
        <Navbar />
      </header>

      {/* El tag 'main' con 'flex-grow-1' asegura que el contenido de la página ocupe todo el espacio disponible.
        <Outlet /> es el componente crucial: Aquí se renderizarán Hasiera o Formulario.
      */}
      <main className="flex-grow-1">
        <Outlet /> 
      </main>

      <footer>
        <Footer />
      </footer>
      
    </div>
  );
};

export default Layout;