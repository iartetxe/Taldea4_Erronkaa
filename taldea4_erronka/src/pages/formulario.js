import React, { useState } from 'react';
// Si usas estilos de Bootstrap, puedes usar clases CSS.

const Formulario = () => {
  // 1. Manejo del Estado (Necesario para formularios en React)
  // Usamos useState para guardar los datos de entrada
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Función para manejar los cambios en los campos
  const handleChange = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue (comportamiento por defecto de HTML)
    console.log('Datos enviados:', datosFormulario);
    // Aquí es donde enviarías los datos a un servidor o API
  };

  // 2. La Estructura del Formulario (JSX, no HTML puro)
  return (
    <div className="container my-5">
      <h2>Formulario de Contacto</h2>
      {/* Usas la etiqueta <form> normal, pero con React se añaden los manejadores */}
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre" // ¡Importante para handleChange!
            value={datosFormulario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" // ¡Importante para handleChange!
            value={datosFormulario.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Mensaje</label>
          <textarea
            className="form-control"
            id="mensaje"
            name="mensaje" // ¡Importante para handleChange!
            rows="3"
            value={datosFormulario.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;