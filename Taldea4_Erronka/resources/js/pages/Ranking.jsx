import React from 'react';
import { Head } from '@inertiajs/react';
import { FaTrophy, FaHeart, FaMedal } from 'react-icons/fa';

const Ranking = ({ ranking }) => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Asteko Ranking-a" />
            <div className="container py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark display-4"><FaTrophy className="text-warning me-3" />Asteko Ranking-a</h1>
                    <p className="text-muted fs-5">Hemen ikus ditzakezu erabiltzaileen gogokoen diren obrak. Astero irabazle bat egongo da!</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {ranking.length === 0 && <div className="alert alert-info text-center">Oraindik ez dago obrarik ranking-ean.</div>}
                        
                        {ranking.map((obra, index) => (
                            <div key={obra.id} className={`card border-0 shadow-sm rounded-4 mb-4 overflow-hidden ${index === 0 ? 'border-warning border border-3' : ''}`}>
                                <div className="row g-0 align-items-center">
                                    
                                    {/* POSTUA (1, 2, 3... Podioa) */}
                                    <div className="col-md-2 text-center py-4 bg-light h-100 d-flex flex-column justify-content-center">
                                        {index === 0 ? <FaTrophy className="text-warning display-4 mb-2 mx-auto" /> :
                                         index === 1 ? <FaMedal className="text-secondary display-5 mb-2 mx-auto" /> :
                                         index === 2 ? <FaMedal className="display-5 mb-2 mx-auto" style={{color: '#cd7f32'}} /> :
                                         <h2 className="fw-bold text-muted mb-0">#{index + 1}</h2>}
                                    </div>
                                    
                                    {/* IRUDIA */}
                                    <div className="col-md-3">
                                        <img src={obra.irudia} className="img-fluid" style={{ height: '150px', width: '100%', objectFit: 'cover' }} alt={obra.izenburua} />
                                    </div>

                                    {/* INFORMAZIOA ETA LIKES */}
                                    <div className="col-md-7">
                                        <div className="card-body d-flex justify-content-between align-items-center px-4">
                                            <div>
                                                <h4 className="fw-bold mb-1 text-dark">{obra.izenburua}</h4>
                                                <p className="text-muted mb-0 fs-5">{obra.artista}</p>
                                            </div>
                                            <div className="text-center bg-danger bg-opacity-10 text-danger rounded-4 py-2 px-4 shadow-sm">
                                                <FaHeart className="fs-4 d-block mx-auto mb-1" />
                                                <span className="fw-bold fs-4">{obra.likes_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ranking;