import { motion } from "framer-motion";
import React from "react";

function Info() {
  return (
    <section className="py-6 sm:py-8 px-2 sm:px-4 md:px-8 bg-white/80 backdrop-blur rounded-2xl max-w-8xl my-6 sm:my-8">
      <motion.div 
        className="w-full mb-8 rounded-2xl" 
        style={{ aspectRatio: "16/9" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/VuRZVevLAXc"
          title="Dwello Info Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 0 }}
        ></iframe>
      </motion.div>
      <motion.div 
        className="backdrop-blur-md rounded-xl p-0 shadow overflow-hidden"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="flex flex-col lg:flex-row items-stretch min-h-[180px] sm:min-h-[200px]">
          <motion.div
            className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-gradient-to-r from-[#255353] to-[#51B6B6] w-full lg:w-3/5"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.h3 
              className="text-xl sm:text-2xl md:text-4xl text-white mb-3 sm:mb-4 text-left leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Get Luxury Apartment Updates with Dwello.
            </motion.h3>
            <p className="text-xs sm:text-sm text-white text-left">
              Your trusted real estate partner in every transaction.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 bg-gradient-to-r from-[#429595] to-[#52B7B7] w-full lg:w-2/5"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xl mx-auto items-center justify-center">
              <input
                type="email"
                defaultValue="Lewis@dwello.com"
                className="w-full sm:w-1/2 flex-1 p-2 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-gray-500 placeholder-gray-500 text-sm sm:text-base items-center"
              />
              <button
                type="submit"
                className="w-full sm:w-1/2 p-2 bg-black text-white rounded-full font-bold text-sm sm:text-base hover:bg-gray-900 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Info;
