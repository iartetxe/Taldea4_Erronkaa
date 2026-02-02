import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

const Dashboard = ({ stats, azkenObrak }) => {
    const { auth } = usePage().props;

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Admin Panela - Artetxea" />

            <div className="container py-5 flex-grow-1">
                {/* GOIBURUA */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold text-dark">Admin Panela ⚙️</h1>
                        <p className="text-muted">Ongi etorri, {auth.user.izena}. Hemen kontrolatzen da dena.</p>
                    </div>
                    {/* BOTOI NAGUSIA: Obra berria gehitu */}
                    <button className="btn btn-warning btn-lg fw-bold shadow-sm">
                        + IGO OBRA BERRIA
                    </button>
                </div>

                {/* ESTATISTIKA TXARTELAK */}
                <div className="row g-4 mb-5">
                    <StatCard 
                        title="Erabiltzaileak" 
                        value={stats.erabiltzaileak} 
                        color="primary" 
                        icon="👥" 
                    />
                    <StatCard 
                        title="Galeriako Obrak" 
                        value={stats.obrak_guztira} 
                        color="success" 
                        icon="🎨" 
                    />
                    <StatCard 
                        title="Enkante Aktiboak" 
                        value={stats.enkantean} 
                        color="warning" 
                        icon="🔨" 
                        darkText 
                    />
                    <StatCard 
                        title="Salmentak" 
                        value={stats.salmentak} 
                        color="danger" 
                        icon="💰" 
                    />
                </div>

                {/* KUDEAKETA ATALAK */}
                <div className="row">
                    {/* AZKEN OBRAK TAULA */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white py-3">
                                <h5 className="mb-0 fw-bold">Azken Obrak</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Irudia</th>
                                            <th>Izenburua</th>
                                            <th>Mota</th>
                                            <th>Prezioa</th>
                                            <th>Egoera</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {azkenObrak.map((obra) => (
                                            <tr key={obra.id}>
                                                <td>
                                                    <img 
                                                        src={obra.irudia} 
                                                        alt="" 
                                                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} 
                                                    />
                                                </td>
                                                <td className="fw-bold">{obra.izenburua}</td>
                                                <td><span className="badge bg-secondary">{obra.mota}</span></td>
                                                <td>{obra.prezioa ? `${obra.prezioa}€` : '-'}</td>
                                                <td>
                                                    {obra.enkante_amaiera ? (
                                                        <span className="badge bg-warning text-dark">Enkantean</span>
                                                    ) : (
                                                        <span className="badge bg-success">Galerian</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* EKINTZA AZKARRAK */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-dark text-white py-3">
                                <h5 className="mb-0 fw-bold">Kudeaketa Azkarra</h5>
                            </div>
                            <div className="list-group list-group-flush">
                                <Link href="#" className="list-group-item list-group-item-action py-3">
                                    🖌️ Kudeatu Galeria
                                </Link>
                                <Link href="#" className="list-group-item list-group-item-action py-3">
                                    🔨 Kudeatu Enkanteak
                                </Link>
                                <Link href="#" className="list-group-item list-group-item-action py-3">
                                    🛒 Ikusi Erosketak
                                </Link>
                                <Link href="#" className="list-group-item list-group-item-action py-3 text-danger">
                                    🚪 Saioa Itxi
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Osagai txiki bat txartelentzako (hau fitxategi berean utzi dezakezu behean)
const StatCard = ({ title, value, color, icon, darkText }) => (
    <div className="col-md-3">
        <div className={`card bg-${color} text-${darkText ? 'dark' : 'white'} border-0 shadow h-100`}>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="card-title mb-0 text-uppercase opacity-75">{title}</h6>
                    <span className="fs-4">{icon}</span>
                </div>
                <h2 className="display-6 fw-bold mb-0">{value}</h2>
            </div>
        </div>
    </div>
);

export default Dashboard;