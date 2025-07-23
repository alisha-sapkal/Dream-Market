// import React, { useState, useEffect } from "react";
//
// export default function Listing() {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   useEffect(() => {
//     fetch('https://your-api.com/api/listings')
//       .then(res => {
//         if (!res.ok) throw new Error('Network response was not ok');
//         return res.json();
//       })
//       .then(data => {
//         setListings(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);
//
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//
//   return (
//     <section>
//       {listings.map(listing => (
//         <div key={listing.id}>{listing.title}</div>
//       ))}
//     </section>
//   );
// }

import React, { useState } from "react";
import { BedDouble, Bath, RulerDimensionLine, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'

const listings = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "$350,000",
    type: "Rent",
    category: "Apartment",
    title: "Modern Condo",
    address: "29, Pine Avenue, Kent, UK",
    beds: 2,
    baths: 2,
    area: "78.5 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    price: "$450,000",
    type: "Rent",
    category: "House",
    title: "Charming Historic Home",
    address: "68, McLewin, London, UK",
    beds: 4,
    baths: 2,
    area: "120 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    price: "$300,000",
    type: "Commercial",
    category: "Duplex",
    title: "Cozy Cottage Views",
    address: "203 Evy Street, Suite 4, Westminster",
    beds: 3,
    baths: 3,
    area: "95 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$150,000",
    type: "Commercial",
    category: "Industrial",
    title: "Contemporary Downtown Loft",
    address: "14 Glover, Birmingham, UK",
    beds: 0,
    baths: 1,
    area: "60 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "$400,000",
    type: "Lease",
    category: "Apartment",
    title: "Elegant Family Home",
    address: "88 Collyer Avenue, Leeds, UK",
    beds: 3,
    baths: 2,
    area: "110 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$40,000",
    type: "Lease",
    category: "Apartment",
    title: "Gorgeous Villa for Rent",
    address: "34, Queens, Manchester, UK",
    beds: 2,
    baths: 3,
    area: "90 m²",
  },
];

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

function Listing() {
  const [liked, setLiked] = useState(Array(listings.length).fill(false));
  const navigate = useNavigate();
  const toggleLike = idx => setLiked(liked => liked.map((v, i) => i === idx ? !v : v));
  return (
    <motion.section
      className="py-8 sm:py-10 md:py-12 px-2 sm:px-4 md:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          Browse Through Latest Listings from Us
        </motion.h2>
        <motion.p
          className="text-gray-700 text-start text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Your trusted real estate partner in every transaction.
        </motion.p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
        {listings.map((listing, idx) => (
          <motion.div
            key={idx}
            className="group rounded-2xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden flex flex-col transition-transform duration-300 w-full min-w-0"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
              layout
          >
              <motion.div className="relative" layout>
                <motion.img
                src={listing.image}
                alt={listing.title}
                className="h-44 sm:h-52 md:h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: "easeOut" }}
              />
                <motion.div className="absolute top-3 left-3 flex gap-1 sm:gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}>
                <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                  {listing.type}
                </span>
                <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                  {listing.category}
                </span>
                </motion.div>
                <motion.div className="absolute top-3 right-3" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}>
                <div className="bg-white/40 backdrop-blur-xs rounded-full p-2 shadow flex items-center justify-center">
                  <Heart
                    className={`w-6 h-6 cursor-pointer transition-colors ${liked[idx] ? 'fill-red-500 text-red-500' : 'fill-none text-gray-300'}`}
                    strokeWidth={2.5}
                    onClick={() => toggleLike(idx)}
                    fill={liked[idx] ? '#ef4444' : 'none'}
                  />
                </div>
                </motion.div>
              </motion.div>
              <motion.div className="flex justify-around mt-2 items-center px-2 sm:px-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + idx * 0.1, duration: 0.3 }}>
              <div className="flex items-center gap-1 mr-auto border border-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => {
                    // TODO: Fetch property details from backend using the property title or ID here.
                    // Example:
                    // fetch(`/api/properties/${listing.id}`)
                    //   .then(res => res.json())
                    //   .then(data => navigate(`/property-details/${encodeURIComponent(listing.title.toLowerCase().replace(/\s+/g, '-'))}`, { state: { property: data } }));
                    // For now, just navigate as before:
                    navigate(`/property-details/${encodeURIComponent(listing.title.toLowerCase().replace(/\s+/g, '-') )}`);
                  }}>
                <img src={listing.image} alt="thumb" className="w-4 h-4 rounded-full object-cover" />
                <span className="text-xs text-gray-500 font-medium">+4 Images</span>
              </div>
              <span className="text-primary text-sm sm:text-base md:text-md font-semibold uppercase px-2 sm:px-3 py-1">
                {listing.price}
              </span>
              </motion.div>
              <motion.div className="flex-1 flex flex-col p-3 sm:p-4 text-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}>
              <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-900">
                {listing.title}
              </h3>
              <p className="text-gray-700 text-xs sm:text-sm mb-2">{listing.address}</p>
              <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs mb-4">
                <span className="flex items-center"><BedDouble className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />{listing.beds}</span>
                <span className="flex items-center"><Bath className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />{listing.baths}</span>
                <span className="flex items-center"><RulerDimensionLine className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />{listing.area}</span>
              </div>
              </motion.div>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}

export default Listing; 