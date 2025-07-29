import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const offers = [
  {
    type: 'Rent',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
    desc: "Explore Dwello's luxury homes tailored and uncover your ideal living.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere",
  },
  {
    type: 'Sale',
    image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80',
    headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
    desc: "Discover a sale you'll love on Dwello, thanks to our filters and property tags.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere",
  },
  {
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
    desc: 'Commercial properties tailored for business purposes. Luxury properties for commerce.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
  },
  {
    type: 'Land',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
    desc: 'Land in the best location in the city. Build your luxury experience in the heart of UK.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
  },
  {
    type: 'Lease',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    headline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
    desc: 'Specific timeline leases for your needs. Luxury properties at extended time periods.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, facere',
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

function NewsArticle() {
  const navigate = useNavigate();
  return (
    <motion.section
      className=""
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-start px-2 sm:px-1">
        News/articles and insights
      </h2>
      <motion.div
        className="max-w-6xl mx-auto overflow-x-auto scrollbar-hide px-2 sm:px-1 h-[400px] sm:h-[450px]"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        <div className="flex gap-4 sm:gap-6 w-max h-full items-start py-2 sm:py-4">
          <AnimatePresence>
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.type}
                className="group rounded-2xl bg-white/30 text-start backdrop-blur-md shadow-lg flex flex-col items-stretch overflow-hidden sm:px-2 p-2 min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] h-[350px] sm:h-[400px]"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                exit={{ opacity: 0, y: 40, transition: { duration: 0.3 } }}
                layout
              >
                <motion.div className="relative" layout>
                  <motion.img
                    src={offer.image}
                    alt={offer.type}
                    className="h-40 sm:h-48 w-full object-cover rounded-2xl transition duration-300 group-hover:blur-xs"
                    loading="lazy"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 * idx, ease: "easeOut" }}
                  />
                  {/* <motion.span
                    className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/30 backdrop-blur-md text-white text-xs font-semibold uppercase rounded-full px-3 sm:px-4 py-1 shadow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                  >
                    {offer.type}
                  </motion.span> */}
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ pointerEvents: 'auto' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span
                      className="bg-primary text-white rounded-full px-4 sm:px-6 py-2 font-semibold shadow-lg hover:bg-primary-dark transition text-sm sm:text-base"
                      onClick={() => { navigate('/search-result') }}
                    >
                      View Property
                    </span>
                  </motion.button>
                </motion.div>
                <motion.div
                  className="flex-1 flex flex-col justify-between p-0 pt-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-[15px] sm:text-base font-semibold mb-1 text-gray-900 leading-snug line-clamp-2">
                      {offer.headline}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-snug line-clamp-2 mb-2">
                      {offer.desc}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-gray-500">Anuradha Ramamirtham</span>
                    <span className="text-xs text-gray-500">Jul 2025</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default NewsArticle
