import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const offers = [
  {
    type: 'Rent',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    headline: 'Rent Properties',
    desc: "Explore Dwello's luxury homes tailored and uncover your ideal living.",
  },
  {
    type: 'Sale',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    headline: 'Sell Properties',
    desc: "Discover a sale you'll love on Dwello, thanks to our filters and property tags.",
  },
  {
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    headline: 'Commercial Properties',
    desc: 'Commercial properties tailored for business purposes. Luxury properties for commerce.',
  },
  {
    type: 'Land',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    headline: 'Land Properties',
    desc: 'Land in the best location in the city. Build your luxury experience in the heart of UK.',
  },
  {
    type: 'Lease',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    headline: 'Lease Properties',
    desc: 'Specific timeline leases for your needs. Luxury properties at extended time periods.',
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

function Offer() {
  const navigate = useNavigate();
  return (
    <motion.section
      className="py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="mb-8 p-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-2xl sm:text-3xl font-semibold text-start mb-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          Luxury Lives Here
        </motion.h1>
        <motion.p
          className="text-gray-700 text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Your trusted real estate partner in every transaction.
        </motion.p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {offers.map((offer, idx) => (
            <motion.div
              key={offer.type}
              className="group rounded-2xl bg-white/30 text-start backdrop-blur-md shadow-lg flex flex-col items-stretch overflow-hidden sm:px-2 p-2"
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
                  src={offer.image}
                  alt={offer.type}
                  className="h-64 w-full object-cover rounded-2xl transition duration-300 group-hover:blur-xs"
                  loading="lazy"
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx, ease: "easeOut" }}
                />
                <motion.span className="absolute top-6 left-6 bg-white/30 backdrop-blur-md text-white text-xs font-semibold uppercase rounded-full px-4 py-1 shadow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}>
                  {offer.type}
                </motion.span>
                <motion.button
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ pointerEvents: 'auto' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="bg-primary text-white rounded-full px-6 py-2 font- shadow-lg hover:bg-primary-dark transition"
                  onClick={() => {navigate('/search-result')}}>
                    View Property
                  </span>
                </motion.button>
              </motion.div>
              <motion.div className="flex-1 flex flex-col p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}>
                <h2 className="text-lg font-semibold mb-1 text-gray-900">{offer.headline}</h2>
                <p className="text-gray-700 text-md mb-4 flex-1">{offer.desc}</p>
                <button className="mt-auto bg-primary text-white rounded-full px-4 py-2 font-semibold hover:bg-primary-dark transition">See Properties</button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

export default Offer
