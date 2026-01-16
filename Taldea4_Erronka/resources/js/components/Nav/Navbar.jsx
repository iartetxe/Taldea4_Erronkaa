import React, { useState } from 'react'; // <--- useState inportatu behar da
import { MdStar } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import logo from '../../assets/logo-artetxea.png';
import './Navbar.css';
import { Link, usePage, router } from '@inertiajs/react';
import LoginModal from '../LoginModal'; 

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  // EGOERA BERRIA: Menua irekita edo itxita dagoen kontrolatzeko
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const { auth } = usePage().props; 
  const user = auth?.user;

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  const handleLogout = () => {
      router.post('/logout');
  };

  // Menua ireki/itxi funtzioa
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div className="container mt-4">
      
      <nav className="navbar navbar-expand-lg custom-navbar px-3 shadow-sm">
        
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
           <img src={logo} alt="Artetxea Logo" className="logo-img rounded-circle border border-dark" />
        </Link>

        {/* HAMBURGUESA BOTOIA (React bidez kontrolatuta) */}
        <button 
            className="navbar-toggler text-white" 
            type="button" 
            onClick={handleNavCollapse} // <--- KLIK EGITEAN EGOERA ALDATU
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* MENU ZATIA (Egoeraren arabera erakutsi edo ezkutatu) */}
        {/* 'show' klasea gehitzen dugu isNavCollapsed FALSE bada */}
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse justify-content-center`} id="navbarNav">
          <ul className="navbar-nav align-items-center gap-4 pt-3 pt-lg-0"> {/* Padding pixka bat mugikorrean */}
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/">HASIERA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/galeria">GALERIA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/enkanteak">ENKANTEAK</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/erosketak">EROSKETAK</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/forua">FORUA</Link></li>
            <li className="nav-item"><Link className="nav-link text-white fw-bold" href="/kontaktua">KONTAKTUA</Link></li>
            
            <li className="nav-item">
              <Link className="ranking-icon position-relative d-flex align-items-center justify-content-center text-warning" href="/ranking">
                <MdStar size={40} className="star-effect" />
                <span className="position-absolute fw-bold text-white" style={{fontSize: '14px', marginTop: '2px'}}>1</span>
              </Link>
            </li>
          </ul>

          {/* USUARIOA / LOGIN (Mugikorrean zentratuta agertzeko margin-top gehituta) */}
          <div className="d-flex align-items-center ms-lg-auto gap-3 mt-3 mt-lg-0 justify-content-center w-100 w-lg-auto">   
            {user ? (
               <div className="d-flex align-items-center gap-2 user-badge p-1 pe-3 rounded-pill bg-dark border border-secondary">
                  <div className="d-flex align-items-center gap-2 px-2 text-white">
                      <FaUserCircle size={24} className="text-warning" />
                      <span className="fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>
                          {user.izena}
                      </span>
                  </div>
                  <div style={{ width: '1px', height: '20px', background: '#555' }}></div>
                  <button onClick={handleLogout} className="btn btn-link text-danger p-0 d-flex align-items-center" title="Saioa itxi">
                      <BiLogOut size={22} />
                  </button>
               </div>
            ) : (
               <>
                  <button className="btn btn-outline-light btn-sm fw-bold rounded-pill px-3 hover-scale" onClick={handleShowLogin}>
                      Saioa hasi
                  </button>
                  <Link href="/erregistratu" className="btn btn-warning btn-sm fw-bold rounded-pill px-3 text-dark hover-scale">
                      Erregistratu
                  </Link>
               </>
            )}
          </div>
        </div>

      </nav>
      
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
    </div>
  );
};

export default Navbar;