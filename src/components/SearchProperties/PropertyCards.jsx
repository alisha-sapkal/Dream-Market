import React from 'react';
import { motion } from 'framer-motion';
import { BedDouble, Bath, RulerDimensionLine, Heart } from 'lucide-react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    type: "Rent",
    title: "Modern Condo",
    price: "$350,000",
    address: "29, Pine Avenue, Kent, UK",
    beds: "2",
    baths: "2",
    area: "78.5 m²",
    category: "Apartment",
    bedroom: "2",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    type: "Sale",
    title: "Charming Historic Home",
    price: "$450,000",
    address: "68, McLewin, London, UK",
    beds: "4",
    baths: "2",
    area: "120 m²",
    category: "House",
    bedroom: "4+",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    type: "Commercial",
    title: "Cozy Cottage Views",
    price: "$300,000",
    address: "203 Evy Street, Suite 4, Westminster",
    beds: "3",
    baths: "3",
    area: "95 m²",
    category: "Duplex",
    bedroom: "3",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    type: "Commercial",
    title: "Contemporary Downtown Loft",
    price: "$150,000",
    address: "14 Glover, Birmingham, UK",
    beds: "0",
    baths: "1",
    area: "0 m²",
    category: "Industrial",
    bedroom: "1",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    type: "Lease",
    title: "Elegant Family Home",
    price: "$400,000",
    address: "88 Collyer Avenue, Leeds, UK",
    beds: "3", 
    baths: "2",
    area: "110 m²",
    category: "Apartment",
    bedroom: "3",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    type: "Lease",
    title: "Gorgeous Villa for Rent",
    price: "$40,000",
    address: "34, Queens, Manchester, UK",
    beds: "2",
    baths: "3",
    area: "90 m²",
    category: "Apartment",
  },
];

function updateFavourites(property, liked) {
  let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
  if (!liked) {
    if (!favs.some(fav => fav.id === property.id)) {
      favs.push(property);
    }
  } else {
    favs = favs.filter(fav => fav.id !== property.id);
  }
  localStorage.setItem('favourites', JSON.stringify(favs));
  window.dispatchEvent(new Event('favouritesUpdated'));
}

function getInitialLiked() {
  const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
  return properties.map(p => favs.some(fav => fav.id === p.id));
}

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.2,
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.035, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", transition: { duration: 0.22 } }
};

export default function PropertyCards({ properties: propProperties }) {
  const propertiesToShow = propProperties || properties;
  const [liked, setLiked] = useState(getInitialLiked());
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(getInitialLiked());
    const handler = () => setLiked(getInitialLiked());
    window.addEventListener('favouritesUpdated', handler);
    return () => window.removeEventListener('favouritesUpdated', handler);
  }, []);

  const toggleLike = (idx) => {
    setLiked((liked) => {
      const newLiked = liked.map((v, i) => (i === idx ? !v : v));
      updateFavourites(propertiesToShow[idx], liked[idx]);
      return newLiked;
    });
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {propertiesToShow.map((property, idx) => (
          <motion.div
          key={property.id || idx}
            className="group rounded-2xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden flex flex-col transition-transform duration-300 w-full min-w-0"
          variants={cardVariants}
          whileHover="hover"
          layout
          >
            <div className="relative">
              <img
                src={property.image}
                className="h-44 sm:h-52 md:h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 flex gap-1 sm:gap-2">
                <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                  {property.type}
                </span>
                <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                  {property.category}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white/40 backdrop-blur-xs rounded-full p-2 shadow flex items-center justify-center">
                  <Heart
                    className={`w-6 h-6 cursor-pointer transition-colors ${liked[idx] ? 'fill-red-500 text-red-500' : 'fill-none text-gray-300'}`}
                    strokeWidth={2.5}
                    onClick={() => toggleLike(idx)}
                    fill={liked[idx] ? '#ef4444' : 'none'}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-2 items-center px-2 sm:px-3">
              <div className="flex items-center gap-1 mr-auto border border-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => {
                // TODO: Fetch property details from backend using the property title or ID here.
                // Example:
                // fetch(`/api/properties/${property.id}`)
                //   .then(res => res.json())
                //   .then(data => navigate(`/property-details/${encodeURIComponent(property.title.toLowerCase().replace(/\s+/g, '-'))}`, { state: { property: data } }));
                // For now, just navigate as before:
                navigate(`/property-details/${encodeURIComponent(property.title.toLowerCase().replace(/\s+/g, '-') )}`);
              }}>
                <img
                  src={property.image}
                  alt="thumb"
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="text-xs text-gray-500 font-medium">
                  +4 Images
                </span>
              </div>
              <span className="text-primary text-sm sm:text-base md:text-md font-semibold uppercase px-2 sm:px-3 py-1">
                {property.price}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-3 sm:p-4 text-start">
              <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-900">
                {property.title}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2">
                {property.address}
              </p>
              <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs mb-4">
                <span className="flex items-center">
                  <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                  {property.beds}
                </span>
                <span className="flex items-center">
                  <Bath className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                  {property.baths}
                </span>
                <span className="flex items-center">
                  <RulerDimensionLine className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                  {property.area}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
    </motion.div>
  );
}
