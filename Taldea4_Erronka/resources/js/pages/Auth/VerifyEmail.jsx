import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <div className="container py-5 mt-5">
            <Head title="E-mail Egiaztapena" />

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow border-0 rounded-4 p-4 text-center">
                        <div className="mb-4 text-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-envelope-check-fill" viewBox="0 0 16 16">
                                <path d="M.1 3.51a.5.5 0 0 1 .5-.5h14.8a.5.5 0 0 1 .5.5 4.7 4.7 0 0 0-.5.5L8 9.9 1.1 4.51a4.7 4.7 0 0 0-.5-.5Zm7.9 6.9L1.87 5.17A5 5 0 0 0 1 8.5v5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-5a5 5 0 0 0-.87-3.33L8 10.41ZM16 14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-10a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 1.5 1.5v10Z"/>
                            </svg>
                        </div>
                        
                        <h2 className="fw-bold mb-3">Egiaztatu zure E-maila</h2>
                        
                        <p className="text-muted mb-4">
                            Eskerrik asko erregistratzeagatik! Hasi baino lehen, mesedez egiaztatu zure helbidea bidali dizugun estekan klik eginez. Ez baduzu jaso, beste bat bidaliko dizugu pozik.
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="alert alert-success fw-bold mb-4">
                                Egiaztapen esteka berri bat bidali da zure helbide elektronikora.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <button className="btn btn-warning w-100 fw-bold py-2 rounded-pill mb-3" disabled={processing}>
                                {processing ? 'Bidaltzen...' : 'BIDALI BERRIRO E-MAILA'}
                            </button>
                        </form>
                        
                        <Link href="/logout" method="post" as="button" className="btn btn-link text-muted text-decoration-none">
                            Saioa itxi
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}