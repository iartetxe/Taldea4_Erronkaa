import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

const EnkanteCard = ({ enkante }) => {
    const { auth } = usePage().props;
    const [bidAmount, setBidAmount] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [isEnded, setIsEnded] = useState(false);

    // Lógica de Cuenta Atrás
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(enkante.enkante_amaiera).getTime();
            const distance = end - now;

            if (distance < 0) {
                clearInterval(interval);
                setIsEnded(true);
                setTimeLeft("ITXITA / CERRADO");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft(`${days}e ${hours}h ${minutes}m`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [enkante.enkante_amaiera]);

    const handleBid = (e) => {
        e.preventDefault();
        if (!auth.user) return alert("Hasi saioa pujatzeko!");
        
        router.post(`/enkante/${enkante.id}/pujar`, {
            kopurua: bidAmount
        }, {
            onSuccess: () => setBidAmount(''), // Limpiar input si sale bien
            preserveScroll: true
        });
    };

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 overflow-hidden">
                <div className="position-relative" style={{ height: '250px' }}>
                    <img src={enkante.irudia} className="w-100 h-100 object-fit-cover" alt={enkante.izenburua} />
                    <div className="position-absolute top-0 end-0 bg-danger text-white px-3 py-1 m-2 rounded-pill fw-bold small">
                        {timeLeft}
                    </div>
                </div>

                <div className="card-body text-center">
                    <h5 className="fw-bold">{enkante.izenburua}</h5>
                    <p className="text-muted small">{enkante.artista}</p>

                    <div className="my-3 p-3 bg-light rounded">
                        <p className="mb-0 text-muted small">Uneko Puja / Actual</p>
                        <h3 className="fw-bold text-success mb-0">{parseFloat(enkante.prezioa).toLocaleString()}€</h3>
                        {enkante.top_bidder && <small className="text-muted">Liderra: {enkante.top_bidder}</small>}
                    </div>

                    {!isEnded ? (
                        <form onSubmit={handleBid} className="d-flex gap-2">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder={`Min: ${parseFloat(enkante.prezioa) + 1}€`}
                                value={bidAmount}
                                onChange={e => setBidAmount(e.target.value)}
                                min={parseFloat(enkante.prezioa) + 1}
                                required
                            />
                            <button className="btn btn-dark fw-bold" type="submit">PUJAR</button>
                        </form>
                    ) : (
                        <div className="alert alert-secondary py-2 fw-bold">Subasta amaituta</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EnkanteCard;