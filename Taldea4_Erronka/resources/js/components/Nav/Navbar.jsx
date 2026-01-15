import React, { useState } from 'react';
import { MdStar } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa'; // <--- Icono Usuario
import { BiLogOut } from 'react-icons/bi';     // <--- Icono Salir
import logo from '../../assets/logo-artetxea.png';
import './Navbar.css';
import { Link, usePage, router } from '@inertiajs/react';
import LoginModal from '../LoginModal'; 

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { auth } = usePage().props; 
  const user = auth?.user;

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const handleLogout = () => {
      router.post('/logout');
  };

  return (
    <div className="container mt-4">
      
      <nav className="navbar navbar-expand-lg custom-navbar px-3 shadow-sm">
        
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
           <img src={logo} alt="Artetxea Logo" className="logo-img rounded-circle border border-dark" />
        </Link>

        {/* HAMBURGUESA MOVIL */}
        <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* MENU */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4">
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/">HASIERA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/galeria">GALERIA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/enkanteak">ENKANTEAK</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/erosketak">EROSKETAK</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/forua">FORUA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/kontaktua">KONTAKTUA</Link></li>
            
            {/* RANKING ICON */}
            <li className="nav-item">
              <Link className="ranking-icon position-relative d-flex align-items-center justify-content-center text-warning" href="/ranking">
                <MdStar size={40} className="star-effect" />
                <span className="position-absolute fw-bold text-white" style={{fontSize: '14px', marginTop: '2px'}}>1</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* ZONA USUARIO (CAMBIADA) */}
        <div className="d-flex align-items-center ms-auto gap-3">   
          {user ? (
             // SI ESTÁ LOGUEADO: DISEÑO NUEVO
             <div className="d-flex align-items-center gap-2 user-badge p-1 pe-3 rounded-pill bg-dark border border-secondary">
                
                {/* Icono + Nombre */}
                <div className="d-flex align-items-center gap-2 px-2 text-white">
                    <FaUserCircle size={24} className="text-warning" />
                    <span className="fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                        {user.izena} {/* Usamos 'izena' si así lo guardaste, o 'name' */}
                    </span>
                </div>

                {/* Separador vertical */}
                <div style={{ width: '1px', height: '20px', background: '#555' }}></div>

                {/* Botón Salir */}
                <button 
                    onClick={handleLogout} 
                    className="btn btn-link text-danger p-0 d-flex align-items-center"
                    title="Saioa itxi"
                    style={{ textDecoration: 'none' }}
                >
                    <BiLogOut size={22} />
                </button>
             </div>
          ) : (
             // SI NO ESTÁ LOGUEADO
             <>
                <button 
                    className="btn btn-outline-light btn-sm fw-bold rounded-pill px-3 hover-scale"
                    onClick={handleShowLogin} 
                >
                    Saioa hasi
                </button>
                <Link 
                    href="/erregistratu" 
                    className="btn btn-warning btn-sm fw-bold rounded-pill px-3 text-dark hover-scale"
                >
                    Erregistratu
                </Link>
             </>
          )}
        </div>

      </nav>
      
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
    </div>
  );
};

export default Navbar;