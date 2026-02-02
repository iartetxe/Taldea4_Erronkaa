import React, { useState } from 'react';
import ObraCard from '../components/ObraCard';
import { Head } from '@inertiajs/react';

// 'obras' prop-a jasotzen dugu orain Controller-etik
const Galeria = ({ obras }) => { 
  const [filtroActivo, setFiltroActivo] = useState('denak');

  // Iragazkia React aldean egiten dugu oraindik (erraza delako)
  const obrasFiltradas = obras.filter(obra => {
    if (filtroActivo === 'denak') return true;
    return obra.mota === filtroActivo;
  });

  return (
    <div className="container mt-5 mb-5">
      <Head title="Galeria - Artetxea" />
      
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Arte <span className="text-warning">Galeria</span></h2>
        <p className="text-muted">Bozkatu zure gogokoenak Ranking-ean igotzeko!</p>
      </div>

      {/* FILTRO BOTOIAK (Berdin mantendu) */}
      <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
         {['denak', 'klasikoa', 'modernoa', 'urbanoa', 'eskultura'].map(mota => (
            <button 
              key={mota}
              className={`btn rounded-pill px-3 fw-bold text-capitalize ${filtroActivo === mota ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setFiltroActivo(mota)}
            >
              {mota}
            </button>
         ))}
      </div>

      <div className="row">
        {obrasFiltradas.length > 0 ? (
          obrasFiltradas.map((obra) => (
            <ObraCard key={obra.id} obra={obra} />
          ))
        ) : (
          <p className="text-center text-muted">Ez dago obrarik kategoria honetan.</p>
        )}
      </div>
    </div>
  );
};

export default Galeria;