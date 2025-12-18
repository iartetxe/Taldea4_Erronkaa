import React from 'react';
import obra1 from '../assets/irudi2.jpeg'; 
import obra2 from '../assets/irudi3.jpg'; 
import obra3 from '../assets/irudia1graff.jpg'; 

const Hasiera = () => {
  return (
    <div className="container mt-5 mb-5">
      
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">
          Ongi etorri <span className="graffiti-testua">Art</span>etxera
        </h1>
        <p className="lead text-muted">
          Edozein pertsonak artelanak eskura edukitzeko, erosteko eta gozatzeko gunea.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10"> 
          
          <div id="arteKarusela" className="carousel slide shadow-lg rounded-4 overflow-hidden" data-bs-ride="carousel">
            
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#arteKarusela" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">
              
              <div className="carousel-item active" data-bs-interval="4000">
                <img 
                  src={obra1} 
                  className="d-block w-100" 
                  alt="Obra de arte 1" 
                  style={{ height: '500px', objectFit: 'cover' }} 
                />
              </div>

              <div className="carousel-item" data-bs-interval="4000">
                <img 
                  src={obra2} 
                  className="d-block w-100" 
                  alt="Obra de arte 2" 
                  style={{ height: '500px', objectFit: 'cover' }}
                />
              </div>

              <div className="carousel-item" data-bs-interval="4000">
                <img 
                  src={obra3} 
                  className="d-block w-100" 
                  alt="Obra de arte 3" 
                  style={{ height: '500px', objectFit: 'cover' }}
                />
              </div>

            </div>

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

    </div>
  );
};

export default Hasiera;