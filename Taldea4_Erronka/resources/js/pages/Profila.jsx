import React, { useState } from 'react';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import { FaUserEdit, FaShoppingBag } from 'react-icons/fa';

const Profila = ({ erosketak }) => {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('datuak');

    // Inertia-ren useForm inprimakia kontrolatzeko
    const { data, setData, put, processing, errors, reset } = useForm({
        izena: auth.user.izena || '',
        abizena: auth.user.abizena || '',
        email: auth.user.email || '',
        telefonoa: auth.user.telefonoa || '',
        helbidea: auth.user.telefonoa || '',
        pasahitza_berria: '',
        pasahitza_berria_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/profila', {
            onSuccess: () => {
                alert("✅ Zure datuak ondo eguneratu dira!");
                reset('pasahitza_berria', 'pasahitza_berria_confirmation'); // Pasahitz eremuak garbitu
            }
        });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Nire Kontua - Artetxea" />

            <div className="container py-5 flex-grow-1">
                <div className="mb-5 text-center">
                    <h1 className="fw-bold text-dark">Nire Kontua 👤</h1>
                    <p className="text-muted">Ongi etorri, {auth.user.izena}. Hemen zure datuak eta erosketak kudeatu ditzakezu.</p>
                </div>

                {/* NABIGAZIO FITXAK */}
                <ul className="nav nav-tabs mb-4 fs-5 fw-bold border-0 shadow-sm rounded p-1 bg-white">
                    <li className="nav-item flex-fill text-center">
                        <button 
                            className={`nav-link w-100 py-3 transition-all ${activeTab === 'datuak' ? 'active bg-dark border-warning border-3 border-bottom' : 'bg-white border-0 opacity-75'}`} 
                            onClick={() => setActiveTab('datuak')}
                            style={{ borderRadius: '8px 8px 0 0' }}
                        >
                            <span style={{ color: activeTab === 'datuak' ? '#ffc107' : '#212529' }}>
                                <FaUserEdit className="me-2"/> Nire Datuak
                            </span>
                        </button>
                    </li>
                    <li className="nav-item flex-fill text-center">
                        <button 
                            className={`nav-link w-100 py-3 transition-all ${activeTab === 'erosketak' ? 'active bg-dark border-warning border-3 border-bottom' : 'bg-white border-0 opacity-75'}`} 
                            onClick={() => setActiveTab('erosketak')}
                            style={{ borderRadius: '8px 8px 0 0' }}
                        >
                            <span style={{ color: activeTab === 'erosketak' ? '#ffc107' : '#212529' }}>
                                <FaShoppingBag className="me-2"/> Nire Erosketak
                            </span>
                        </button>
                    </li>
                </ul>

                {/* 1. FITXA: DATU PERTSONALAK */}
                {activeTab === 'datuak' && (
                    <div className="card border-0 shadow-sm bg-white rounded-3 p-4 p-md-5 max-w-lg mx-auto" style={{ maxWidth: '800px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="fw-bold mb-2">Izena</label>
                                    <input type="text" className={`form-control ${errors.izena ? 'is-invalid' : ''}`} value={data.izena} onChange={e => setData('izena', e.target.value)} required />
                                    {errors.izena && <div className="invalid-feedback">{errors.izena}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-bold mb-2">Abizena</label>
                                    <input type="text" className={`form-control ${errors.abizena ? 'is-invalid' : ''}`} value={data.abizena} onChange={e => setData('abizena', e.target.value)} required />
                                    {errors.abizena && <div className="invalid-feedback">{errors.abizena}</div>}
                                </div>
                                <div className="col-12">
                                    <label className="fw-bold mb-2">Posta Elektronikoa</label>
                                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={data.email} onChange={e => setData('email', e.target.value)} required />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Telefonoa</label>
                                    <input type="text" className="form-control" value={data.telefonoa} onChange={e => setData('telefonoa', e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Helbidea</label>
                                    <input type="text" className="form-control" value={data.helbidea} onChange={e => setData('helbidea', e.target.value)} />
                                </div>
                                <div className="col-12 mt-4 pt-3 border-top">
                                    <h5 className="fw-bold text-dark mb-3">Pasahitza Aldatu (Aukerakoa)</h5>
                                    <p className="text-muted small mb-3">Zure pasahitza aldatu nahi ez baduzu, utzi eremu hauek hutsik.</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-bold mb-2">Pasahitza Berria</label>
                                    <input type="password" className={`form-control ${errors.pasahitza_berria ? 'is-invalid' : ''}`} value={data.pasahitza_berria} onChange={e => setData('pasahitza_berria', e.target.value)} placeholder="gutxienez 8 karaktere" />
                                    {errors.pasahitza_berria && <div className="invalid-feedback">{errors.pasahitza_berria}</div>}
                                </div>
                                <div className="col-md-6">
                                    <label className="fw-bold mb-2">Pasahitza Berretsi</label>
                                    <input type="password" className="form-control" value={data.pasahitza_berria_confirmation} onChange={e => setData('pasahitza_berria_confirmation', e.target.value)} placeholder="errepikatu pasahitza" />
                                </div>
                            </div>
                            <div className="mt-5 text-end">
                                <button type="submit" className="btn btn-warning btn-lg fw-bold text-dark px-5" disabled={processing}>
                                    {processing ? 'Gordetzen...' : '💾 DATUAK GORDE'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* 2. FITXA: EROSKETAK */}
                {activeTab === 'erosketak' && (
                    <div className="card border-0 shadow-sm bg-white rounded-3 p-4">
                        {erosketak.length === 0 ? (
                            <div className="text-center py-5">
                                <FaShoppingBag size={50} className="text-muted mb-3 opacity-50" />
                                <h4 className="text-muted">Oraindik ez duzu ezer erosi.</h4>
                                <Link href="/galeria" className="btn btn-dark mt-3">Joan Galeriara</Link>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Irudia</th>
                                            <th>Izenburua</th>
                                            <th>Artista</th>
                                            <th>Erosketa Data</th>
                                            <th className="text-end">Prezioa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {erosketak.map((obra) => (
                                            <tr key={obra.id}>
                                                <td><img src={obra.irudia} alt={obra.izenburua} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} /></td>
                                                <td className="fw-bold text-dark">{obra.izenburua}</td>
                                                <td>{obra.artista}</td>
                                                <td className="text-muted">{new Date(obra.updated_at).toLocaleDateString('eu-ES')}</td>
                                                <td className="text-end fw-bold fs-5 text-success">{obra.prezioa} €</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <style>{`
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </div>
    );
};

export default Profila;