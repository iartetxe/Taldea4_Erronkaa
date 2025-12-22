import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginModal = ({ show, handleClose }) => {
  

  const showHideClassName = show ? "modal d-block" : "modal d-none";

  // 2. ESTADO para controlar si la contraseña es visible (para el botón 'Ver Contraseña')
  const [showPassword, setShowPassword] = useState(false);
  
  // 3. ESTADO para controlar los datos de entrada
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setLoginData({
      ...loginData,
      [e.target.name]: value
    });
  };

  
  const handleLogin = (e) => {
    e.preventDefault(); 
    
    console.log('--- Datos de Inicio de Sesión ---');
    console.log(loginData);

    alert(`Intentando iniciar sesión con ${loginData.email}. Recordar: ${loginData.rememberMe}`);
    handleClose();
  };

  return (
    <div className={showHideClassName} tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          <div className="modal-header bg-warning">
            <h5 className="modal-title text-dark fw-bold">Saioa hasi (Iniciar Sesión)</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
            ></button>
          </div>
          
          <div className="modal-body">
            
            <form onSubmit={handleLogin}>
              
              {/* CAMPO: CORREO ELECTRÓNICO */}
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="inputEmail" 
                  name="email" // Importante para el estado
                  value={loginData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              {/* CAMPO: CONTRASEÑA*/}
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input 
                    // Cambia el tipo entre 'password' y 'text'
                    type={showPassword ? "text" : "password"} 
                    className="form-control" 
                    id="inputPassword" 
                    name="password" // Importante para el estado
                    value={loginData.password}
                    onChange={handleChange}
                    required 
                  />
                  {/* Botón para VER CONTRASEÑA */}
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {/* Icono que cambia según el estado */}
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="mb-3 form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="checkRemember" 
                  name="rememberMe"
                  checked={loginData.rememberMe}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="checkRemember">
                  Recordar mi contraseña
                </label>
              </div>
              
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-warning fw-bold">
                  Saioa hasi
                </button>
              </div>
            </form>
            
          </div>
          
          <div className="modal-footer justify-content-center">
            <p className="text-muted small mb-0">¿No tienes cuenta? <a href="#" onClick={handleClose}>Regístrate aquí</a></p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoginModal;