import React from 'react';
import { Link } from '@inertiajs/react';
import "../Footer/footer.css";

// Importaciones de iconos de Font Awesome (Redes Sociales)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-auto">
      <div className="container">
        
        {/* --- SECCIÓN SUPERIOR: COLUMNAS DE INFORMACIÓN --- */}
        <div className="row">
          
          {/* Columna 1: Sobre Artetxea */}
          <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
            <h5 className="text-warning fw-bold text-uppercase mb-3">Artetxea</h5>
            <p className="small text-white-50">
              Artea eta kultura sustatzen dituen plataforma digitala. 
              Sortzaile berriei laguntzen diegu beren lana mundura zabaltzen 
              eta arte zaleei obrak eskuratzen.
            </p>
          </div>

          {/* Columna 2: (Estekak) */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <h5 className="text-warning fw-bold text-uppercase mb-3">Estekak</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none small hover-warning">Hasiera</Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none small hover-warning">Galeria</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white text-decoration-none small hover-warning">Enkanteak</a>
              </li>
               <li className="mb-2">
                <Link to="/kontaktua" className="text-white text-decoration-none small hover-warning">Erosketak</Link>
              </li>
              <li className="mb-2">
                <Link to="/kontaktua" className="text-white text-decoration-none small hover-warning">Forua</Link>
              </li>
               <li className="mb-2">
                <Link to="/kontaktua" className="text-white text-decoration-none small hover-warning">Kontaktua</Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white-50 text-decoration-none small">Lege Oharra</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información de Contacto */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="text-warning fw-bold text-uppercase mb-3">Kontaktua</h5>
            <ul className="list-unstyled small text-white-50">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2 text-warning" /> Kale Nagusia 12, Donostia, Gipuzkoa
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2 text-warning" /> info@artetxea.eus
              </li>
              <li className="mb-2">
                <FaPhone className="me-2 text-warning" /> +34 944 123 456
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="border-secondary my-4" />

        {/* --- SECCIÓN INFERIOR: COPYRIGHT Y REDES --- */}
        <div className="row align-items-center">
          
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 small">&copy; 2025 <strong>Artetxea</strong>. Eskubide guztiak erreserbatuta.</p>
            <small className="text-muted" style={{ fontSize: '0.75rem' }}>
              Iker Sánchez - Imanol Artetxe
            </small>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="social-icons">
              <a href="https://www.facebook.com" className="text-white me-3 text-decoration-none" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://x.com" className="text-white me-3 text-decoration-none" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com" className="text-white me-3 text-decoration-none" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.linkedin.com" className="text-white text-decoration-none" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          
        </div>

      </div>
    </footer>
  );
};

export default Footer;