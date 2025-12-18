import React from 'react';
import ObraCard from '../components/ObraCard'; 


import obra1 from '../assets/irudi3.jpg'; 
import obra2 from '../assets/irudi2.jpg';
import obra3 from '../assets/irudia1graff.jpg';


const obrak = [
  {
    id: 1,
    izenburua: "Erregina Klasikoa",
    artista: "Mikel_Art",
    data: "2024ko Urtarrila",
    avatar: "M",
    color: "bg-primary", // Azul
    img: obra1,
    deskribapena: "Olioa mihise gainean. Teknika klasikoa erabiliz egindako erretratua, argi-ilunak nabarmenduz.",
 
    kokalekua: "Guggenheim Museoa, Bilbo", 
    urlWeb: null 
  },
  {
    id: 2,
    izenburua: "Udazkena Parkean",
    artista: "Ane_Pintura",
    data: "2024ko Martxoa",
    avatar: "A",
    color: "bg-success", // Verde
    img: obra2,
    deskribapena: "Inpresionismoa. Parke bateko arratsalde lasaia, kolore beroak eta pintzelkada askeak.",
   
    kokalekua: "Egia Kalea 4, Donostia (Tailerra)", 
    urlWeb: null 
  },
  {
    id: 3,
    izenburua: "Graffiti Power",
    artista: "Kale_Soul",
    data: "2024ko Apirila",
    avatar: "K",
    color: "bg-dark", // Negro
    img: obra3,
    deskribapena: "Hiri artea. Spray eta rotuladoreak erabiliz egindako murala.",
 
    kokalekua: "Artistaren Instagram Profila",
    urlWeb: "https://www.instagram.com" 
  }
];

const Galeria = () => {
  return (
    <div className="container mt-5 mb-5">
      
      {/* Título */}
      <div className="text-center mb-5">
        <h2 className="fw-bold display-5">Arte <span className="text-warning">Galeria</span></h2>
        <p className="text-muted lead">Ezagutu gure bilduma eta aurkitu non dauden obrak.</p>
      </div>

      {/* Grid de Obras */}
      <div className="row">
        {obrak.map((obra) => (
          <ObraCard key={obra.id} obra={obra} />
        ))}
      </div>

    </div>
  );
};

export default Galeria;