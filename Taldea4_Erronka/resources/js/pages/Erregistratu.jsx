import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
// Navbarra kendu dugu Layout automatikoa erabiltzen baduzu.
// Bestela, inportatu hemen: import Navbar from '../components/Nav/Navbar';

const Erregistratu = () => {
    const { data, setData, post, processing, errors } = useForm({
        izena: '',
        abizenak: '',
        email: '',
        telefonoa: '',
        kalea: '',
        hiria: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => setData('password', ''),
        });
    };

    return (
        <div className="container py-5 mt-5">
            <Head title="Erregistratu - Artetxea" />
            
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        <div className="card-header bg-warning text-dark text-center py-4">
                            <h2 className="fw-bold mb-0">Sortu Kontua</h2>
                            <p className="mb-0 text-dark-50">Osatu zure profila Artetxean sartzeko</p>
                        </div>
                        
                        <div className="card-body p-5">
                            <form onSubmit={handleSubmit}>
                                {/* LERROA 1: IZENA eta ABIZENAK */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Izena *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.izena ? 'is-invalid' : ''}`}
                                            value={data.izena} 
                                            onChange={e => setData('izena', e.target.value)} 
                                            required 
                                        />
                                        {errors.izena && <div className="invalid-feedback">{errors.izena}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Abizenak *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.abizenak ? 'is-invalid' : ''}`}
                                            value={data.abizenak} 
                                            onChange={e => setData('abizenak', e.target.value)} 
                                            required 
                                        />
                                        {errors.abizenak && <div className="invalid-feedback">{errors.abizenak}</div>}
                                    </div>
                                </div>

                                {/* LERROA 2: EMAIL eta TELEFONOA */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">E-maila *</label>
                                        <input 
                                            type="email" 
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            value={data.email} 
                                            onChange={e => setData('email', e.target.value)} 
                                            required 
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Telefonoa *</label>
                                        <input 
                                            type="tel" 
                                            className={`form-control ${errors.telefonoa ? 'is-invalid' : ''}`}
                                            value={data.telefonoa} 
                                            onChange={e => setData('telefonoa', e.target.value)} 
                                            required 
                                        />
                                        {errors.telefonoa && <div className="invalid-feedback">{errors.telefonoa}</div>}
                                    </div>
                                </div>

                                {/* LERROA 3: KALEA eta HIRIA */}
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Kalea *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.kalea ? 'is-invalid' : ''}`}
                                            value={data.kalea} 
                                            onChange={e => setData('kalea', e.target.value)} 
                                            required 
                                        />
                                        {errors.kalea && <div className="invalid-feedback">{errors.kalea}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Hiria *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.hiria ? 'is-invalid' : ''}`}
                                            value={data.hiria} 
                                            onChange={e => setData('hiria', e.target.value)} 
                                            required 
                                        />
                                        {errors.hiria && <div className="invalid-feedback">{errors.hiria}</div>}
                                    </div>
                                </div>

                                {/* ROLA KENDUTA: Ez da agertzen */}

                                {/* LERROA 4: PASAHITZA */}
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Pasahitza *</label>
                                        <input 
                                            type="password" 
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            value={data.password} 
                                            onChange={e => setData('password', e.target.value)} 
                                            required 
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold small">Errepikatu Pasahitza *</label>
                                        <input 
                                            type="password" 
                                            className="form-control"
                                            value={data.password_confirmation} 
                                            onChange={e => setData('password_confirmation', e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-dark w-100 py-3 fw-bold rounded-pill" disabled={processing}>
                                    {processing ? 'KONTUA SORTZEN...' : 'ERREGISTRATU'}
                                </button>
                            </form>
                            
                            <div className="text-center mt-3">
                                <span className="text-muted small">Dagoeneko kontua duzu? </span>
                                <a href="/" className="fw-bold text-warning text-decoration-none">Hasi Saioa</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Erregistratu;