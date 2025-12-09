import React from 'react';
import erdikoIrudi from '../assets/logo_pintorea.png';

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

        <div className="mt-4">
          <img 
            src={erdikoIrudi} 
            alt="Artetxea portada" 
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: '400px' }}
          />
        </div>    
      </div>
    </div>
  );
};

export default Hasiera;