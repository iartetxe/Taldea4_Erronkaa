import React from 'react';
import { Head } from '@inertiajs/react';
import '../../css/ranking.css';

// Importamos imágenes reales tuyas (asegúrate de que existen o cambia la ruta)
import img1 from '../assets/Irudiak-Galeria/Arte Moderno/Mirudi1.jpg';
import img2 from '../assets/Irudiak-Galeria/Arte Urbano/Uirudi5.jpg';
import img3 from '../assets/Irudiak-Galeria/Eskulturak/Eskul1.jpg';
import img4 from '../assets/Irudiak-Galeria/Arte Klasiko/Kirudi2.jpg';

const topObras = [
    { id: 1, izenburua: 'Gaueko Ametsa', egilea: 'Maite A.', irudia: img1, likes: 342 },
    { id: 2, izenburua: 'Hiri Galdua', egilea: 'Iker G.', irudia: img2, likes: 298 },
    { id: 3, izenburua: 'Harrizko Begirada', egilea: 'Lorea T.', irudia: img3, likes: 156 },
    { id: 4, izenburua: 'Dama Klasikoa', egilea: 'Mikel P.', irudia: img4, likes: 98 },
];

const Ranking = () => {
    return (
        <>
            <Head title="Asteko Ranking-a" />
            
            {/* Cabecera Estilizada */}
            <div className="ranking-header text-center">
                <div className="container">
                    <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>ASTEKO RANKING-A ⭐</h1>
                    <p className="lead text-white-50">Gure komunitateak gehien maite dituen obrak.</p>
                </div>
            </div>

            <div className="container pb-5">
                <div className="row g-4 justify-content-center">
                    {topObras.map((obra, index) => (
                        <div key={obra.id} className="col-md-6 col-lg-3">
                            <div className="ranking-card h-100 rounded-3 shadow-sm">
                                
                                {/* Lógica de Medallas */}
                                {index === 0 && <div className="medal medal-1">1</div>}
                                {index === 1 && <div className="medal medal-2">2</div>}
                                {index === 2 && <div className="medal medal-3">3</div>}

                                <div className="ranking-img-container">
                                    <img src={obra.irudia} alt={obra.izenburua} />
                                </div>

                                <div className="card-body text-center p-4">
                                    <h5 className="fw-bold mb-1 text-uppercase">{obra.izenburua}</h5>
                                    <p className="text-muted small mb-3">Egilea: {obra.egilea}</p>
                                    
                                    <div className="likes-badge">
                                        ❤ {obra.likes} Likes
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Ranking;