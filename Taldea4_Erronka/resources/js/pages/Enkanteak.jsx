import React from 'react';
import { Head } from '@inertiajs/react';
import EnkanteCard from '../components/EnkanteCard';

const Enkanteak = ({ enkanteak }) => {
    return (
        <div className="container mt-5 mb-5">
            <Head title="Enkanteak - Artetxea" />
            
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">ENKANTEAK 🔨</h1>
                <p className="lead text-muted">Pujatu obra esklusiboengatik denbora amaitu baino lehen.</p>
            </div>

            <div className="row">
                {enkanteak.length > 0 ? (
                    enkanteak.map(enkante => (
                        <EnkanteCard key={enkante.id} enkante={enkante} />
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted fs-4">Une honetan ez dago enkante aktiborik.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Enkanteak;