import React from 'react';
import obra2 from '../assets/irudi2.jpg'; 
import obra1 from '../assets/irudi3.jpg'; 
import obra3 from '../assets/irudia1graff.jpg'; 
import logo from '../assets/logo-kolor.png';

const Hasiera = () => {
  return (
    <div className="container mt-5 mb-5">
      
      {/* --- SECCIÓN 1: TÍTULO PRINCIPAL --- */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">
          Ongi etorri <span className="graffiti-testua">Art</span>etxera
        </h1>
        <p className="lead text-muted">
          Edozein pertsonak artelanak eskura edukitzeko, erosteko eta gozatzeko gunea.
        </p>
      </div>

      {/* --- SECCIÓN 2: CARRUSEL DE OBRAS --- */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10"> 
          
          <div id="arteKarusela" className="carousel slide shadow-lg rounded-4 overflow-hidden" data-bs-ride="carousel">
            
            {/* Indicadores */}
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="0" className="active" aria-current="true"></button>
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="1"></button>
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="2"></button>
            </div>

            {/* Imágenes y Descripciones */}
            <div className="carousel-inner">
              
              {/* SLIDE 1 */}
              <div className="carousel-item active" data-bs-interval="4000">
                <img 
                  src={obra1} 
                  className="d-block w-100" 
                  alt="Arte Klasikoa" 
                  style={{ height: '500px', objectFit: 'cover' }} 
                />
                {/* Texto sobre la imagen */}
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3">
                  <h3 className="fw-bold">Arte Klasikoa</h3>
                  <p>Historiaren edertasuna eta teknika tradizionalak.</p>
                </div>
              </div>

              {/* SLIDE 2 */}
              <div className="carousel-item" data-bs-interval="4000">
                <img 
                  src={obra2} 
                  className="d-block w-100" 
                  alt="Arte Modernoa" 
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3">
                  <h3 className="fw-bold">Arte Modernoa</h3>
                  <p>Kolore biziak eta forma berritzaileak.</p>
                </div>
              </div>

              {/* SLIDE 3 */}
              <div className="carousel-item" data-bs-interval="4000">
                <img 
                  src={obra3} 
                  className="d-block w-100" 
                  alt="Arte Urbanoa" 
                  style={{ height: '500px', objectFit: 'cover' }}
                />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3">
                  <h3 className="fw-bold">Arte Urbanoa</h3>
                  <p>Kaleetan sortzen den artearen eredu</p>
                </div>
              </div>

            </div>

            {/* Controles */}
            <button className="carousel-control-prev" type="button" data-bs-target="#arteKarusela" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Aurrekoa</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#arteKarusela" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Hurrengoa</span>
            </button>

          </div>
        </div>
      </div>

      {/* --- SECCIÓN 3: PROIEKTUAREN DESKRIBAPENA (NUEVO) --- */}
      <div className="row align-items-center bg-white p-5 rounded shadow-sm border border-light">
        
        {/* Columna Izquierda: Logo */}
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img 
            src={logo} 
            alt="Artetxea Logo" 
            className="img-fluid rounded-circle shadow-sm border"
            style={{ maxWidth: '200px' }} // Controlamos el tamaño del logo
          />
        </div>

        {/* Columna Derecha: Texto explicativo */}
        <div className="col-md-8">
          <h2 className="text-warning fw-bold mb-3">Zer da Artetxea?</h2>
          <p className="lead text-secondary">
            Artetxea arte zaleentzako topagune digitala da. Gure helburua artea demokratizatzea da,
            sortzaile berriei ikusgarritasuna emanez eta erosleei obrak eskuratzeko bide errazak eskainiz.
          </p>
          <hr />
          <p>
            Gure plataforman, artistek beren lanak erakutsi ditzakete, enkanteetan parte hartu,
            eta arte komunitatearekin harremanetan jarri. Museo bat baino gehiago gara: 
            <strong> sormenaren etxea gara.</strong>
          </p>
        </div>

      </div>

    </div>
  );
};

export default Hasiera;