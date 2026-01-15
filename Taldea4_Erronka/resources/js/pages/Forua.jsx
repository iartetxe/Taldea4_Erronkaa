import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import '../../css/forua.css';

// DATOS FALSOS (DUMMY DATA)
const iruzkinakFalsos = [
    { id: 1, user: { izena: 'Mikel' }, mezua: 'Webgune bikaina! Oso erraza da erabiltzeko.', balorazioa: 5 },
    { id: 2, user: { izena: 'Ane' }, mezua: 'Arte bilduma ikusgarria daukazue. Asko gustatu zait.', balorazioa: 4 },
    { id: 3, user: { izena: 'Jon' }, mezua: 'Bidalketa azkarra eta segurua. Gomendagarria.', balorazioa: 5 },
];

const Forua = () => {
    const [iruzkinak, setIruzkinak] = useState(iruzkinakFalsos);
    const { data, setData, reset } = useForm({ mezua: '', balorazioa: 5 });

    const handleIruzkinSubmit = (e) => {
        e.preventDefault();
        const nuevo = { id: Date.now(), user: { izena: 'Zu (Orain)' }, mezua: data.mezua, balorazioa: 5 };
        setIruzkinak([nuevo, ...iruzkinak]);
        reset();
    };

    return (
        <>
            <Head title="Forua - Artetxea" />
         
            
            <div className="container py-5 mt-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-4 text-gold">FORUA ETA IRITZIAK</h1>
                    <p className="text-muted">Partekatu zure artea edo eman zure iritzia</p>
                </div>

                <div className="row g-5">
                    {/* IZQUIERDA: Muro de Reseñas */}
                    <div className="col-md-7">
                        <h3 className="section-title mb-4">Komunitatearen Iritziak</h3>
                        
                        <div className="d-flex flex-column gap-3 overflow-auto pe-2" style={{ maxHeight: '600px' }}>
                            {iruzkinak.map((iruzkina) => (
                                <div key={iruzkina.id} className="comment-card p-3 shadow-sm rounded">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="user-avatar me-3">
                                            {iruzkina.user.izena.charAt(0)}
                                        </div>
                                        <div>
                                            <h5 className="m-0 fw-bold">{iruzkina.user.izena}</h5>
                                            <div className="text-gold small">{'★'.repeat(iruzkina.balorazioa)}</div>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted ps-5">{iruzkina.mezua}</p>
                                </div>
                            ))}
                        </div>

                        {/* Input para escribir */}
                        <div className="mt-5 p-4 bg-light rounded border">
                            <h5 className="fw-bold mb-3">Utzi zure iritzia</h5>
                            <form onSubmit={handleIruzkinSubmit}>
                                <textarea 
                                    className="form-control mb-3" 
                                    rows="3"
                                    placeholder="Zer iruditzen zaizu Artetxea?"
                                    value={data.mezua}
                                    onChange={e => setData('mezua', e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-dark w-100 py-2">Argitaratu Iruzkina</button>
                            </form>
                        </div>
                    </div>

                    {/* DERECHA: Subir Obra */}
                    <div className="col-md-5">
                        <div className="upload-card p-4 shadow rounded-3">
                            <div className="text-center mb-4">
                                <span className="display-4">🎨</span>
                                <h3 className="fw-bold mt-2">Artista zara?</h3>
                                <p className="text-muted small">Igo zure obra. Gure adituek aztertuko dute eta onartua bada, Galerian agertuko da salgai.</p>
                            </div>
                            
                            <form onSubmit={(e) => { e.preventDefault(); alert("Simulazioa: Obra bidalia!"); }}>
                                <div className="mb-3">
                                    <label className="fw-bold small text-uppercase">Obraren Izenburua</label>
                                    <input type="text" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold small text-uppercase">Irudia</label>
                                    <input type="file" className="form-control" required />
                                </div>
                                <div className="mb-3">
                                    <label className="fw-bold small text-uppercase">Prezioa (€)</label>
                                    <input type="number" className="form-control" placeholder="Adib: 150" required />
                                </div>
                                <div className="mb-4">
                                    <label className="fw-bold small text-uppercase">Deskribapena</label>
                                    <textarea className="form-control" rows="2"></textarea>
                                </div>
                                <button type="submit" className="btn btn-artetxea w-100 fw-bold py-3">
                                    BIDALI BERRIKUSPENERAKO
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forua;