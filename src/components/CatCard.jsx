// src/components/CatCard.jsx

import React from "react";
import { Link } from "react-router-dom";

const CatCard = ({ card }) => {
  return (
    <Link to={`/gigs?cat=${card.cat}`} className="block transform hover:scale-105 transition-transform duration-300">
      <div className="w-64 h-80 text-white rounded-md cursor-pointer relative overflow-hidden group">
        <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 to-black/60 group-hover:from-black/30 group-hover:to-black/70 transition-all duration-300" />
        <div className="absolute bottom-6 left-6 right-6">
          <span className="block text-sm mb-2 font-light opacity-90">{card.desc}</span>
          <h3 className="text-2xl font-bold">{card.title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CatCard;