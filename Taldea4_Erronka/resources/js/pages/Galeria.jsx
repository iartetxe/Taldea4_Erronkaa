import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa'; 

const Galeria = ({ obrak }) => {
    const { auth } = usePage().props;
    
    // ESTADO PARA CONTROLAR QUÉ MAPA ESTÁ ABIERTO
    const [mapaObra, setMapaObra] = useState(null);

    const handleLike = (id) => {
        if (!auth.user) {
            alert("⚠️ Like bat emateko saioa hasi behar duzu!");
            return;
        }
        router.post(`/obrak/${id}/like`, {}, { preserveScroll: true });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Galeria - Artetxea" />

            <div className="container py-5 flex-grow-1">
                <h1 className="fw-bold text-center mb-5 text-dark">Galeria Erakusketa 🏛️</h1>
                
                <div className="row g-4">
                    {obrak.map((obra) => (
                        <div className="col-md-4" key={obra.id}>
                            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                                <img src={obra.irudia} className="card-img-top" style={{ height: '280px', objectFit: 'cover' }} alt={obra.izenburua} />
                                <div className="card-body pb-2">
                                    <h5 className="fw-bold mb-1 text-dark">{obra.izenburua}</h5>
                                    <p className="text-muted mb-2">{obra.artista}</p>
                                    <span className="badge bg-secondary mb-3">{obra.mota}</span>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex justify-content-between align-items-center pb-4 px-4">
                                    
                                    {/* BOTOIA MAPA IREKITZEKO */}
                                    <button 
                                        onClick={() => setMapaObra(obra)} 
                                        className="btn btn-dark d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm"
                                    >
                                        <FaMapMarkerAlt className="text-warning" /> Ikusi Mapan
                                    </button>

                                    {/* LIKE BOTOIA */}
                                    <button 
                                        onClick={() => handleLike(obra.id)} 
                                        className={`btn d-flex align-items-center gap-2 rounded-pill px-3 shadow-sm ${obra.is_liked ? 'btn-danger' : 'btn-light border'}`}
                                        style={{ transition: '0.2s' }}
                                    >
                                        {obra.is_liked ? <FaHeart className="text-white fs-5" /> : <FaRegHeart className="text-danger fs-5" />}
                                        <span className={`fw-bold fs-5 ${obra.is_liked ? 'text-white' : 'text-dark'}`}>{obra.likes_count}</span>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODAL DE GOOGLE MAPS --- */}
            {mapaObra && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="modal-header bg-dark text-white border-bottom-0">
                                <h5 className="modal-title fw-bold">
                                    <FaMapMarkerAlt className="text-warning me-2" /> 
                                    {mapaObra.izenburua} - Kokalekua
                                </h5>
                                <button className="btn-close btn-close-white" onClick={() => setMapaObra(null)}></button>
                            </div>
                            
                            <div className="modal-body p-0">
                                {/* GOOGLE MAPS API (Iframe dinamikoa) */}
                                <iframe
                                    width="100%"
                                    height="400"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(mapaObra.kokalekua)}&output=embed`}
                                ></iframe>
                            </div>
                            
                            <div className="modal-footer bg-light border-0 d-flex justify-content-between">
                                <span className="text-muted fw-bold">Helbidea: <span className="text-dark">{mapaObra.kokalekua}</span></span>
                                <button className="btn btn-dark fw-bold px-4" onClick={() => setMapaObra(null)}>Itxi</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Galeria;