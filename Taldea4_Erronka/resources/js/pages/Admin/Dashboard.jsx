import React, { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { FaTrash, FaReply, FaEnvelope, FaPalette } from 'react-icons/fa';

const Dashboard = ({ stats, obrak, kontaktuak }) => {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    
    // TAB kudeaketa: 'obrak' edo 'mezuak'
    const [activeTab, setActiveTab] = useState('obrak');

    // --- OBRA BERRIA FORMULARIOA ---
    const { data, setData, post, processing, errors, reset } = useForm({
        izenburua: '', artista: '', data: new Date().getFullYear().toString(),
        mota: 'modernoa', deskribapena: '', kokalekua: '', irudia: null, egoera: 'galeria',
        prezioa: '', hasierako_prezioa: '', enkante_amaiera: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.egoera === 'galeria') { data.prezioa = null; data.hasierako_prezioa = null; data.enkante_amaiera = null; }
        else if (data.egoera === 'denda') { data.hasierako_prezioa = null; data.enkante_amaiera = null; }
        else if (data.egoera === 'enkantea') { data.prezioa = null; }

        post('/admin/obrak', {
            onSuccess: () => {
                alert("✅ Obra ondo gorde da!");
                setShowModal(false);
                reset();
            }
        });
    };

    // --- EZABATZEKO FUNTZIOAK ---
    const handleDeleteObra = (id) => {
        if (confirm('⚠️ Ziur zaude obra hau ezabatu nahi duzula? Webgunetik guztiz desagertuko da.')) {
            router.delete(`/admin/obrak/${id}`);
        }
    };

    const handleDeleteMezua = (id) => {
        if (confirm('Ziur mezua ezabatu nahi duzula?')) {
            router.delete(`/admin/kontaktuak/${id}`);
        }
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Admin Panela" />

            <div className="container py-5 flex-grow-1">
                {/* GOIBURUA ETA BOTOIA */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="fw-bold text-dark">Admin Panela ⚙️</h1>
                        <p className="text-muted">Kudeatu Artetxearen eduki guztia hemendik.</p>
                    </div>
                    <button className="btn btn-warning btn-lg fw-bold shadow-sm" onClick={() => setShowModal(true)}>
                        + IGO OBRA BERRIA
                    </button>
                </div>

                {/* ESTATISTIKAK */}
                <div className="row g-4 mb-4">
                    <StatCard title="Erabiltzaileak" value={stats.erabiltzaileak} color="primary" icon="👥" />
                    <StatCard title="Guztira Obrak" value={stats.obrak_guztira} color="success" icon="🎨" />
                    <StatCard title="Enkante Aktiboak" value={stats.enkantean} color="warning" icon="🔨" darkText />
                    <StatCard title="Salmentak" value={stats.salmentak} color="danger" icon="💰" />
                </div>

                {/* --- NABIGAZIO FITXAK (TABS) --- */}
<ul className="nav nav-tabs mb-4 fs-5 fw-bold border-0 shadow-sm rounded p-1 bg-light">
    <li className="nav-item flex-fill">
        <button 
            className={`nav-link w-100 py-3 transition-all ${activeTab === 'obrak' 
                ? 'active bg-dark border-warning border-3 border-bottom' 
                : 'bg-white border-0 opacity-75'}`} 
            onClick={() => setActiveTab('obrak')}
            style={{ borderRadius: '8px 8px 0 0' }}
        >
            <span style={{ color: activeTab === 'obrak' ? '#ffc107' : '#000000' }}>
                <FaPalette className="me-2"/> Obrak Kudeatu
            </span>
        </button>
    </li>
    
    <li className="nav-item flex-fill">
        <button 
            className={`nav-link w-100 py-3 transition-all ${activeTab === 'mezuak' 
                ? 'active bg-dark border-warning border-3 border-bottom' 
                : 'bg-white border-0 opacity-75'}`} 
            onClick={() => setActiveTab('mezuak')}
            style={{ borderRadius: '8px 8px 0 0' }}
        >
           
            <span style={{ color: activeTab === 'mezuak' ? '#ffc107' : '#000000' }}>
                <FaEnvelope className="me-2"/> Sarrerako Mezuak 
                {kontaktuak.length > 0 && (
                    <span className="badge bg-danger ms-2 rounded-pill fs-6 text-white" style={{color: 'white'}}>
                        {kontaktuak.length}
                    </span>
                )}
            </span>
        </button>
    </li>
</ul>

                {/* --- 1. FITXA: OBRAK KUDEATU --- */}
                {activeTab === 'obrak' && (
                    <div className="card border-0 shadow-sm bg-white rounded-3 overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Irudia</th>
                                        <th>Izenburua & Artista</th>
                                        <th>Mota</th>
                                        <th>Kokalekua (Egoera)</th>
                                        <th className="text-end">Ekintzak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {obrak.length === 0 ? (<tr><td colSpan="5" className="text-center py-4 text-muted">Ez dago obrarik kargatuta.</td></tr>) : null}
                                    {obrak.map((obra) => (
                                        <tr key={obra.id}>
                                            <td><img src={obra.irudia} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                                            <td><span className="fw-bold">{obra.izenburua}</span><br/><small className="text-muted">{obra.artista}</small></td>
                                            <td><span className="badge bg-secondary">{obra.mota}</span></td>
                                            <td>
                                                {obra.enkante_amaiera ? <span className="badge bg-warning text-dark">Enkantea</span> :
                                                 obra.prezioa ? <span className="badge bg-success">Denda</span> :
                                                 <span className="badge bg-info text-dark">Galeria</span>}
                                            </td>
                                            <td className="text-end">
                                                <button onClick={() => handleDeleteObra(obra.id)} className="btn btn-sm btn-outline-danger" title="Ezabatu Obra">
                                                    <FaTrash /> Ezabatu
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- 2. FITXA: SARRERAKO MEZUAK --- */}
                {activeTab === 'mezuak' && (
                    <div className="row g-4">
                        {kontaktuak.length === 0 ? (
                            <div className="col-12"><div className="alert alert-info text-center fs-5">Ez daukazu mezu berririk une honetan. 🎉</div></div>
                        ) : null}
                        
                        {kontaktuak.map((mezua) => (
                            <div className="col-md-6" key={mezua.id}>
                                <div className="card h-100 border-0 shadow-sm border-start border-warning border-4">
                                    <div className="card-body">
                                        <h5 className="fw-bold text-dark mb-1">{mezua.izena}</h5>
                                        <p className="text-muted small mb-3">📧 {mezua.email} | 🕒 {new Date(mezua.created_at).toLocaleDateString('eu-ES')}</p>
                                        <div className="bg-light p-3 rounded text-dark fst-italic mb-3">
                                            "{mezua.mezua}"
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white border-0 d-flex justify-content-between pt-0">
                                        {/* ERANTZUN BOTOIA (Zuzenean emaila irekitzen du) */}
                                        <a href={`mailto:${mezua.email}?subject=Artetxea - Zure mezuari erantzuna`} className="btn btn-sm btn-dark d-flex align-items-center gap-2">
                                            <FaReply /> Erantzun
                                        </a>
                                        {/* EZABATU BOTOIA */}
                                        <button onClick={() => handleDeleteMezua(mezua.id)} className="btn btn-sm btn-outline-danger">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODALA (Lehendik zeneukan formularioa berdina da) */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999 }}>
                    <div className="modal-dialog modal-lg modal-dialog-scrollable mt-5">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-dark text-white border-bottom-0 pb-4">
                                <h4 className="modal-title fw-bold">🎨 Obra Berria Igo</h4>
                                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body px-4">
                                {/* Oharra: Formularioaren kodea lehenagoko berbera da, ez dut errepikatu lekua ez jateagatik, baina utzi ondoan behean dagoen kode bera */}
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6"><label className="fw-bold">Izenburua</label><input type="text" className="form-control" value={data.izenburua} onChange={e => setData('izenburua', e.target.value)} required /></div>
                                        <div className="col-md-6"><label className="fw-bold">Artista</label><input type="text" className="form-control" value={data.artista} onChange={e => setData('artista', e.target.value)} required /></div>
                                        <div className="col-md-4"><label className="fw-bold">Urtea</label><input type="number" className="form-control" value={data.data} onChange={e => setData('data', e.target.value)} required /></div>
                                        <div className="col-md-4"><label className="fw-bold">Mota</label>
                                            <select className="form-select" value={data.mota} onChange={e => setData('mota', e.target.value)}>
                                                <option value="klasikoa">Klasikoa</option><option value="modernoa">Modernoa</option><option value="urbanoa">Urbanoa</option><option value="eskultura">Eskultura</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4"><label className="fw-bold">Kokalekua</label><input type="text" className="form-control" value={data.kokalekua} onChange={e => setData('kokalekua', e.target.value)} required /></div>
                                        <div className="col-12"><label className="fw-bold">Deskribapena</label><textarea className="form-control" rows="3" value={data.deskribapena} onChange={e => setData('deskribapena', e.target.value)} required></textarea></div>
                                        <div className="col-12"><label className="fw-bold">Irudia</label><input type="file" className="form-control" onChange={e => setData('irudia', e.target.files[0])} required /></div>
                                        <hr className="my-4" />
                                        <div className="col-12">
                                            <label className="form-label fw-bold fs-5 text-warning bg-dark p-2 rounded w-100">📌 Non argitaratu nahi duzu?</label>
                                            <select className="form-select form-select-lg" value={data.egoera} onChange={e => setData('egoera', e.target.value)}>
                                                <option value="galeria">🏛️ GALERIA HUTSA (Erakusketa bakarrik)</option><option value="denda">🛒 DENDA (Salmenta zuzena)</option><option value="enkantea">🔨 ENKANTEA (Subasta)</option>
                                            </select>
                                        </div>
                                        {data.egoera === 'denda' && (
                                            <div className="col-md-6 bg-success bg-opacity-10 p-3 rounded mt-3"><label className="fw-bold">Salmenta Prezioa (€)</label><input type="number" className="form-control border-success" value={data.prezioa} onChange={e => setData('prezioa', e.target.value)} required /></div>
                                        )}
                                        {data.egoera === 'enkantea' && (
                                            <div className="row mt-3 bg-warning bg-opacity-10 p-3 rounded">
                                                <div className="col-md-6"><label className="fw-bold">Hasierako Prezioa (€)</label><input type="number" className="form-control border-warning" value={data.hasierako_prezioa} onChange={e => setData('hasierako_prezioa', e.target.value)} required /></div>
                                                <div className="col-md-6"><label className="fw-bold">Amaiera Data</label><input type="datetime-local" className="form-control border-warning" value={data.enkante_amaiera} onChange={e => setData('enkante_amaiera', e.target.value)} required /></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer px-0 mt-4 border-0">
                                        <button type="button" className="btn btn-light fw-bold px-4" onClick={() => setShowModal(false)}>Utzi</button>
                                        <button type="submit" className="btn btn-warning fw-bold px-4 text-dark" disabled={processing}>{processing ? 'Gordetzen...' : '💾 GORDE OBRA'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const StatCard = ({ title, value, color, icon, darkText }) => (
    <div className="col-md-3">
        <div className={`card bg-${color} text-${darkText ? 'dark' : 'white'} border-0 shadow-sm h-100`}>
            <div className="card-body text-center py-4">
                <span className="fs-1 mb-2 d-block">{icon}</span>
                <h6 className="card-title mb-1 text-uppercase fw-bold opacity-75">{title}</h6>
                <h2 className="display-5 fw-bold mb-0">{value}</h2>
            </div>
        </div>
    </div>
);

export default Dashboard;