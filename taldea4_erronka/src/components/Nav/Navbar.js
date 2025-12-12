import React, { useState } from 'react'; // <--- 1. ¡IMPORTAMOS useState!
import { MdStar } from 'react-icons/md';
import logo from '../../assets/logo-artetxea.png';
import './Navbar.css';
import { Link } from 'react-router-dom'; 

// 2. ¡IMPORTAMOS EL COMPONENTE DEL MODAL! (Asegúrate que la ruta sea correcta)
import LoginModal from '../LoginModal'; 

const Navbar = () => {
  // 3. DEFINIMOS EL ESTADO para controlar la visibilidad del modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Funciones para abrir y cerrar
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <div className="container mt-4">
      
      <nav className="navbar navbar-expand-lg custom-navbar px-3">
        
        {/* Enlace del logo/marca a la página de inicio */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
           <img 
             src={logo} 
             alt="Artetxea Logo" 
             className="logo-img rounded-circle border border-dark" 
           />
        </Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-3">
            
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/">HASIERA</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">GALERIA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">ENKANTEAK</a>
            </li>
            
            {/* Estos dos los devolvemos a '#' porque aún no tienen página */}
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">EROSKETAK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">FORUA</a> 
            </li>
            
            {/* CAMBIO AQUÍ: KONTAKTUA ahora es un Link que lleva a la ruta nueva */}
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/kontaktua">KONTAKTUA</Link>
            </li>
            
            <li className="nav-item">
              <a className="ranking-icon position-relative d-flex align-items-center justify-content-center text-warning" href="#">
                <MdStar size={40} />
                <span className="position-absolute fw-bold text-white" style={{fontSize: '14px'}}>1</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-2">   
                  {/* 3. AÑADIMOS EL EVENTO onClick AL BOTÓN "Saioa hasi" */}
                  <button 
                    className="btn btn-outline-light btn-sm fw-bold rounded-pill px-3"
                    onClick={handleShowLogin} // <-- ¡Conectado al estado!
                  >
                    Saioa hasi
                  </button>
                  <button className="btn btn-warning btn-sm fw-bold rounded-pill px-3 text-dark">
                    Erregistratu
                  </button>
        </div>

      </nav>
      
      {/* 4. RENDERIZAMOS EL MODAL AQUÍ */}
      {/* Se muestra/oculta basado en el estado 'showLoginModal' */}
      <LoginModal 
        show={showLoginModal} 
        handleClose={handleCloseLogin} 
      />

    </div>
  );
};

export default Navbar;