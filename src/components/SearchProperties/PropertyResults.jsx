import { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import { motion } from "framer-motion";

const HERO_BG =
  "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')"; 

const filters = ["Rent", "Sale", "Commercial", "Land", "Lease"];
const categories = ["Apartment", "House", "Commercial", "Land", "Lease"];
const bedrooms = ["1", "2", "3", "4+"];

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

export default function PropertyResults({ onSearch, count }) {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, location, category, bedroom, keywords });
  };

  const handleReset = () => {
    setType("");
    setLocation("");
    setCategory("");
    setBedroom("");
    setKeywords("");
    onSearch({ type: "", location: "", category: "", bedroom: "", keywords: "" });
  };

  return (
    <motion.section
      className="relative w-full min-h-[300px] flex flex-col items-center justify-center text-center text-white py-16 px-4 rounded-2xl"
      style={{
        backgroundImage: `${HERO_BG}, linear-gradient(to bottom, rgba(16,16,16,0.85), rgba(30,41,59,0.85))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative z-10 flex flex-col gap-2 items-center w-full max-w-6xl min-h-[200px] justify-end rounded-2xl">
        <motion.div className="flex flex-col items-center justify-between w-full sm:flex-row"
          variants={cardVariants}
        >
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-3xl text-white drop-shadow-lg">
              Properties Results
            </h2>
            <span className="text-xs text-white/80 font-semibold border-1 border-gray-100 rounded-xl p-2 bg-white/10 ml-2">
              {count}
            </span>
          </div>
          <div className="flex flex-row gap-4 bg-white rounded-full text-sm text-gray-500 p-2">
            <Search className="text-sm text-gray-500"/>
            <input
              type="text"
              value={keywords}
              onChange={e => setKeywords(e.target.value)}
              placeholder="Search Properties..."
              className="bg-transparent outline-none border-none text-sm text-gray-700 placeholder:text-gray-500 flex-1 min-w-0"
              style={{ background: 'none' }}
            />
          </div>
        </motion.div>
        <motion.div
          className="bg-white/20 backdrop-blur-md p-2 max-w-6xl w-full rounded-2xl md:rounded-full mb-4"
          variants={cardVariants}
        >
          <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-2 w-full">
            {filters.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-medium transition w-full border border-white/20
                ${type === cat ? 'bg-white text-gray-700 shadow font-bold' : 'bg-white/10 text-white hover:bg-primary hover:text-white'}`}
                onClick={() => setType(type === cat ? '' : cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white/20 backdrop-blur-md p-2 max-w-6xl w-full mx-auto rounded-2xl md:rounded-full"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-2 w-full">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="flex-1 px-3 py-2 border focus:outline-none bg-white/40 text-white placeholder-white/80 rounded-full w-full"
            />
            <div className="relative w-full">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="flex-1 text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none w-full custom-blur-select"
              >
                <option value="">Property Category</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Lease">Lease</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </span>
            </div>
            <div className="relative w-full">
              <select
                value={bedroom}
                onChange={e => setBedroom(e.target.value)}
                className="flex-1 text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none w-full custom-blur-select"
              >
                <option value="">Bedroom</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </span>
            </div>
            <button
              type="submit"
              className="bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark w-full"
            >
              Search
            </button>
            <button
              type="button"
              className="bg-white text-black px-4 py-2 rounded-full font-semibold border border-gray-300 hover:bg-gray-100 w-full"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </motion.form>
      </div>
    </motion.section>
  );
}
