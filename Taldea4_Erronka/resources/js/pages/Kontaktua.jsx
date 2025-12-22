import React, { useState } from 'react';
import { FaPaperPlane, FaUser, FaCommentDots, FaEnvelopeOpenText } from 'react-icons/fa'; 

const Formulario = () => {
  const [formData, setFormData] = useState({
    izena: '',       
    email: '',       
    gaia: '',        
    mezua: ''        
  });


  const [bidalita, setBidalita] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    
    console.log('Mezua bidalita:', formData);
    
    
    setBidalita(true);
    setFormData({ izena: '', email: '', gaia: '', mezua: '' }); 

    
    setTimeout(() => setBidalita(false), 5000);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          
     
          <div className="card shadow-lg border-0 rounded-4">
            
      
            <div className="card-header bg-dark text-white text-center py-4 rounded-top-4">
              <h2 className="fw-bold mb-0">
                <FaEnvelopeOpenText className="me-2 text-warning" /> 
                Jarri gurekin harremanetan
              </h2>
              <p className="small mb-0 text-white-50">Zalantzarik baduzu? Idatz iguzu!</p>
            </div>

           
            <div className="card-body p-5 bg-white">
              
            
              {bidalita && (
                <div className="alert alert-success text-center fade show" role="alert">
                  <strong>Eskerrik asko!</strong> Zure mezua ondo jaso dugu.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                
              
                <div className="mb-4">
                  <label htmlFor="izena" className="form-label fw-bold text-muted">Izena / Nombre *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FaUser className="text-muted"/></span>
                    <input
                      type="text"
                      className="form-control bg-light border-start-0"
                      id="izena"
                      name="izena"
                      placeholder="Zure izena idatzi..."
                      value={formData.izena}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

              
                <div className="mb-4">
                  <label htmlFor="email" className="form-label fw-bold text-muted">Posta Elektronikoa / Email *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">@</span>
                    <input
                      type="email"
                      className="form-control bg-light border-start-0"
                      id="email"
                      name="email"
                      placeholder="adibidea@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>

               
                <div className="mb-4">
                  <label htmlFor="gaia" className="form-label fw-bold text-muted">Gaia / Asunto *</label>
                  <select 
                    className="form-select bg-light" 
                    id="gaia" 
                    name="gaia"
                    value={formData.gaia}
                    onChange={handleChange}
                    required 
                  >
                    <option value="" disabled>Aukeratu gai bat...</option>
                    <option value="duda_general">Zalantza orokorra</option>
                    <option value="soporte">Arazo tekniko bat dut</option>
                    <option value="ventas">Erosketa edo Enkanteak</option>
                    <option value="otros">Beste bat</option>
                  </select>
                </div>

               
                <div className="mb-4">
                  <label htmlFor="mezua" className="form-label fw-bold text-muted">Mezua / Mensaje *</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 align-items-start pt-2"><FaCommentDots className="text-muted"/></span>
                    <textarea
                      className="form-control bg-light border-start-0"
                      id="mezua"
                      name="mezua"
                      rows="5"
                      placeholder="Nola lagundu zaitzakegu?"
                      value={formData.mezua}
                      onChange={handleChange}
                      required 
                    ></textarea>
                  </div>
                </div>

              
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning fw-bold py-2 shadow-sm text-dark">
                    <FaPaperPlane className="me-2" /> Bidali Mezua
                  </button>
                </div>

              </form>
            </div>
            
            <div className="card-footer bg-light text-center py-3 border-0 rounded-bottom-4">
              <small className="text-muted">Artetxea Team &copy; 2025</small>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;