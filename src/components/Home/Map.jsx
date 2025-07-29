import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "1rem",
};

const center = {
  lat: 51.5072,
  lng: -0.1276,
};

const listingsWithCoords = [
  {
    id: 1,
    title: "Modern Condo",
    position: { lat: 51.5172, lng: -0.1376 },
  },
  {
    id: 2,
    title: "Charming Historic Home",
    position: { lat: 51.501, lng: -0.1419 },
  },
  {
    id: 3,
    title: "Cozy Cottage Views",
    position: { lat: 51.508, lng: -0.118 },
  },
  {
    id: 4,
    title: "Contemporary Downtown Loft",
    position: { lat: 51.495, lng: -0.145 },
  },
];

function Map() {
  
  return (
    <motion.section
      className="px-2 sm:px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-start">
        Search using Map
      </h2>
      <motion.div
        className="w-full h-90 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <iframe
          title="Property Location Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${center.lat},${center.lng}&output=embed`}
        ></iframe>
      </motion.div>
    </motion.section>
  );
}

export default React.memo(Map);
