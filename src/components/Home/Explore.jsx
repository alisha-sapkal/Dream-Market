// import React, { useState, useEffect } from "react";
//
// export default function Explore() {
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
import { BedDouble, Bath, RulerDimensionLine, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Wallet,
  FileText,
  IndianRupee,
  Search,
} from "lucide-react";

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
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: {
    scale: 1.035,
    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
    transition: { duration: 0.22 },
  },
};

const Explore = ({ searchTerm = "", selectedCategory = "All" }) => {
  const listings = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      price: "$350,000",
      type: "Rent",
      category: "New launch",
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
      category: "Commercial",
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
      category: "Projects",
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
      category: "New launch",
      title: "Contemporary Downtown Loft",
      address: "14 Glover, Birmingham, UK",
      beds: 0,
      baths: 1,
      area: "60 m²",
    },
  ];

  const utilityButtons = [
    {
      icon: Calculator,
      text: "EMI calculator",
      onClick: () => console.log("EMI calculator clicked"),
    },
    {
      icon: Wallet,
      text: "Affordability calculator",
      onClick: () => console.log("Affordability calculator clicked"),
    },
    {
      icon: FileText,
      text: "Eligibility calculator",
      onClick: () => console.log("Eligibility calculator clicked"),
    },
    {
      icon: IndianRupee,
      text: "Price calculator",
      onClick: () => console.log("Price calculator clicked"),
    },
    {
      icon: Search,
      text: "customize search",
      onClick: () => console.log("Customize search clicked"),
    },
  ];

  const [liked, setLiked] = useState(Array(listings.length).fill(false));
  const navigate = useNavigate();
  const toggleLike = (idx) =>
    setLiked((liked) => liked.map((v, i) => (i === idx ? !v : v)));

  // Filter listings based on search term and category
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      !searchTerm ||
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || listing.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <motion.div
        className="mb-6 sm:mb-8 px-2"
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
          Properties by trusted builder near you
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
      <motion.section
        className="bg-gray-100 flex flex-col justify-center items-stretch"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="text-gray-600 text-start text-sm sm:text-base mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
        {filteredListings.length} properties found
        {searchTerm && ` for "${searchTerm}"`}
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
      </motion.p>

        <motion.div
          className="w-full max-w-full overflow-x-auto scrollbar-hide p-2 sm:px-4 h-[390px] sm:h-[410px]"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
          <div className="flex gap-4 sm:gap-6 md:gap-8 w-max items-start">
          <AnimatePresence mode="popLayout">
              {filteredListings.map((listing, idx) => (
                <motion.div
                  key={idx}
                  className="group rounded-2xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden flex flex-col transition-transform duration-300 min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px]"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                  exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
                  layout
                >
                  <motion.div className="relative" layout>
                    <motion.img
                      src={listing.image}
                      alt={listing.title}
                      className="h-48 sm:h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      initial={{ scale: 1.05, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 * idx,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="absolute top-2 sm:top-4 left-2 sm:left-4 flex gap-1 sm:gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                    >
                      <span className="bg-white/30 backdrop-blur-md text-white text-xs font-semibold uppercase rounded-full px-2 py-1 sm:px-3 shadow">
                        {listing.type}
                      </span>
                      <span className="bg-white/30 backdrop-blur-md text-white text-xs font-semibold uppercase rounded-full px-2 py-1 sm:px-3 shadow">
                        {listing.category}
                      </span>
                    </motion.div>
                    <motion.div
                      className="absolute top-2 sm:top-3 right-2 sm:right-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                    >
                      <div className="bg-white/40 backdrop-blur-xs rounded-full p-1.5 sm:p-2 shadow flex items-center justify-center">
                        <Heart
                          className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors ${
                            liked[idx]
                              ? "fill-red-500 text-red-500"
                              : "fill-none text-gray-300"
                          }`}
                          strokeWidth={2.5}
                          onClick={() => toggleLike(idx)}
                          fill={liked[idx] ? "#ef4444" : "none"}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="flex justify-around mt-2 items-center px-2 sm:px-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + idx * 0.1, duration: 0.3 }}
                  >
                    <div
                      className="flex items-center gap-1 mr-auto border-1 border-gray-200 rounded-full p-1 cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => {
                        // TODO: Fetch property details from backend using the property title or ID here.
                        // Example:
                        // fetch(`/api/properties/${listing.id}`)
                        //   .then(res => res.json())
                        //   .then(data => navigate(`/property-details/${encodeURIComponent(listing.title.toLowerCase().replace(/\s+/g, '-'))}`, { state: { property: data } }));
                        // For now, just navigate as before:
                        navigate(
                          `/property-details/${encodeURIComponent(
                            listing.title.toLowerCase().replace(/\s+/g, "-")
                          )}`
                        );
                      }}
                    >
                      <img
                        src={listing.image}
                        alt="thumb"
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full object-cover"
                      />
                      <span className="text-xs sm:text-sm text-gray-500 font-medium">
                        +4 Images
                      </span>
                    </div>
                    <span className="text-primary text-sm sm:text-md font-semibold uppercase px-2 sm:px-3 py-1">
                      {listing.price}
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex-1 flex flex-col p-3 sm:p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                  >
                    <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-900">
                      {listing.title}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm mb-2">
                      {listing.address}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs mb-4">
                      <span className="flex items-center">
                        <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                        {listing.beds}
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                        {listing.baths}
                      </span>
                      <span className="flex items-center">
                        <RulerDimensionLine className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                        {listing.area}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div
          className="overflow-x-auto text-center scrollbar-hide h-[100px] sm:h-[120px]"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
          <div className="flex flex-row justify-center gap-3 sm:gap-4 w-max px-2 sm:px-4 h-full items-center mx-auto">
            {utilityButtons.map((button, idx) => (
              <motion.button
                key={idx}
                onClick={button.onClick}
                className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-3 sm:p-4 min-w-[120px] sm:min-w-[140px] h-fit hover:bg-gray-200 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              >
                <button.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                <span className="text-xs sm:text-sm font-medium text-black text-center">
                  {button.text}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Explore;
