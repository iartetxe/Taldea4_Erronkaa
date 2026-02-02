import React from 'react';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { router, usePage } from '@inertiajs/react';

const ObraCard = ({ obra }) => {
  const { auth } = usePage().props;

  // Like emateko funtzioa
  const handleLike = () => {
    if (!auth.user) {
      alert("Saioa hasi behar duzu bozkatzeko!");
      return;
    }
    router.post(`/obra/${obra.id}/like`, {}, { preserveScroll: true });
  };

  // Partekatzeko funtzioa (Web Share API)
  const handleShare = async () => {
    const shareData = {
      title: `Artetxea - ${obra.izenburua}`,
      text: `Begira ${obra.artista}-ren obra zoragarri hau Artetxean!`,
      url: window.location.origin + '/galeria', // Edo obraren link zehatza
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // PC-an edo nabigatzaile zaharretan: Linka kopiatu
        await navigator.clipboard.writeText(shareData.url);
        alert("Esteka arbelean kopiatuta!");
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow-sm obra-card position-relative">
        
        {/* PARTEKATU BOTOIA (Goian eskuinean) */}
        <button 
          onClick={handleShare}
          className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm d-flex align-items-center justify-content-center"
          style={{ width: '35px', height: '35px', zIndex: 10 }}
          title="Partekatu"
        >
          <FaShareAlt size={14} className="text-dark" />
        </button>

        <div className="overflow-hidden" style={{ height: '300px' }}>
          <img 
            src={obra.irudia} // Ziurtatu URL osoa dela edo '/storage/...' hasten dela
            className="card-img-top h-100 w-100" 
            style={{ objectFit: 'cover', transition: 'transform 0.5s' }} 
            alt={obra.izenburua} 
          />
        </div>
        
        <div className="card-body text-center">
          <h5 className="fw-bold mb-1">{obra.izenburua}</h5>
          <p className="text-muted small mb-3">{obra.artista}</p>
          
          <div className="d-flex justify-content-center align-items-center gap-3">
             {/* LIKE BOTOIA */}
             <button 
               onClick={handleLike} 
               className="btn btn-link p-0 text-decoration-none d-flex align-items-center gap-1"
               style={{ color: obra.is_liked ? '#dc3545' : '#6c757d' }}
             >
               {obra.is_liked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
               <span className="fw-bold">{obra.likes_count}</span>
             </button>

             <span className="badge bg-warning text-dark">{obra.mota}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObraCard;