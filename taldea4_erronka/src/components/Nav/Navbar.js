import React  from 'react';
import { MdStar } from 'react-icons/md';
import logo from '../../assets/logo-artetxea.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="container mt-4">
      
      <nav className="navbar navbar-expand-lg custom-navbar px-3">
        
        
        <a className="navbar-brand d-flex align-items-center" href="#">
           <img 
             src={logo} 
             alt="Artetxea Logo" 
             className="logo-img rounded-circle border border-dark" 
           />
        </a>

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
              <a className="nav-link text-white fw-bold" href="#">HASIERA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">GALERIA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">ENKANTEAK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">EROSKETAK</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">FORUA</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="#">KONTAKTUA</a>
            </li>
            
            <li className="nav-item">
              <a className="ranking-icon position-relative d-flex align-items-center justify-content-center text-warning" href="">
                <MdStar size={40} />
                <span className="position-absolute fw-bold text-white" style={{fontSize: '14px'}}>1</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto gap-2">   
                  <button className="btn btn-outline-light btn-sm fw-bold rounded-pill px-3">
                    Saioa hasi
                  </button>
                  <button className="btn btn-warning btn-sm fw-bold rounded-pill px-3 text-dark">
                    Erregistratu
                  </button>
              
  
        </div>

      </nav>
    </div>
  );
};

export default Navbar;