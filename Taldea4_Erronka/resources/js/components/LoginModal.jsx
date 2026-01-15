import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Modal, Button, Form } from 'react-bootstrap';

const LoginModal = ({ show, handleClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    // Limpiar formulario cuando se cierra el modal
    useEffect(() => {
        if (!show) {
            reset('password');
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login', {
            onSuccess: () => {
                handleClose(); // Cierra el modal si el login es correcto
                // Inertia recargará la página y el usuario aparecerá logueado
            }
        });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
                <Modal.Title className="fw-bold">Hasi Saioa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* EMAIL */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email helbidea</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="izena@adibidea.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            isInvalid={!!errors.email}
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* PASSWORD */}
                    <Form.Group className="mb-3">
                        <Form.Label>Pasahitza</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="******"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    {/* REMEMBER ME */}
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Gogoratu nire saioa"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                    </Form.Group>

                    <Button variant="warning" type="submit" className="w-100 fw-bold" disabled={processing}>
                        {processing ? 'Sartzen...' : 'SARTU'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;