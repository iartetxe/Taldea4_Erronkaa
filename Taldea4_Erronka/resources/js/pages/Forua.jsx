import React from 'react';
import { Head, usePage, useForm, Link } from '@inertiajs/react';
import Navbar from '../components/Nav/Navbar';
import Footer from '../components/Footer/footer';
import { FaUpload, FaImage, FaLock } from 'react-icons/fa';

const Forua = () => {
    const { auth, flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        izenburua: '', deskribapena: '', irudia: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forua/proposamena', {
            onSuccess: () => {
                alert("✅ Zure obra ondo bidali zaio administratzaileari!");
                reset();
            }
        });
    };

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <Head title="Forua - Zure Obrak" />

            <div className="container py-5 flex-grow-1">
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-dark">Erakutsi zure Artea 🎨</h1>
                    <p className="text-muted fs-5">Bidali zure obra administratzaileari, gure Galerian argitaratzeko aukera izateko.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        {!auth.user ? (
                            <div className="alert alert-warning text-center p-5 shadow-sm rounded-4">
                                <FaLock size={40} className="mb-3 text-warning" />
                                <h4>Zure obrak bidaltzeko saioa hasi behar duzu</h4>
                                <Link href="/login" className="btn btn-dark mt-3 fw-bold px-4">Saioa Hasi</Link>
                            </div>
                        ) : (
                            <div className="bg-white p-5 rounded-4 shadow-sm">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Obraren Izenburua</label>
                                        <input type="text" className="form-control" value={data.izenburua} onChange={e => setData('izenburua', e.target.value)} required />
                                        {errors.izenburua && <div className="text-danger small">{errors.izenburua}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Historia edo Deskribapena</label>
                                        <textarea className="form-control" rows="4" value={data.deskribapena} onChange={e => setData('deskribapena', e.target.value)} required></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Irudia <FaImage className="text-warning"/></label>
                                        <input type="file" className="form-control" onChange={e => setData('irudia', e.target.files[0])} required />
                                    </div>
                                    <button type="submit" className="btn btn-warning w-100 py-3 fw-bold text-dark fs-5" disabled={processing}>
                                        {processing ? 'BIDALTZEN...' : <><FaUpload className="me-2"/> OBRA BIDALI</>}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forua;