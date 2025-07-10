import { useState } from "react";
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

export default function PropertyResults({ filters: initialFilters, onSearch, count }) {
  const [type, setType] = useState(initialFilters?.type || "");
  const [location, setLocation] = useState(initialFilters?.location || "");
  const [category, setCategory] = useState(initialFilters?.category || "");
  const [bedroom, setBedroom] = useState(initialFilters?.bedroom || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, location, category, bedroom });
  };

  const handleReset = () => {
    setType("Rent");
    setLocation("");
    setCategory("");
    setBedroom("");
    onSearch({ type: "Rent", location: "", category: "", bedroom: "" });
  };

  return (
    <motion.section
      className="relative w-full min-h-[300px] flex flex-col items-center justify-center text-white py-16 px-4 rounded-2xl"
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
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl min-h-[200px] justify-around rounded-2xl">
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
            <span className="text-sm text-gray-500">Search Properties...</span></div>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-2 max-w-6xl w-full rounded-full bg-white/20 backdrop-blur-md p-2"
          variants={cardVariants}
        >
          {filters.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium transition w-1/6 border border-white/20
              ${type === cat ? 'bg-white text-gray-700 shadow font-bold' : 'bg-white/10 text-white hover:bg-primary hover:text-white'}`}
              onClick={() => setType(type === cat ? '' : cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </motion.div>
        <motion.form className="bg-white/20 backdrop-blur-md p-2 flex flex-col sm:flex-row gap-2 max-w-6xl w-full mx-auto rounded-full"
          variants={cardVariants}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full sm:flex-1 px-3 py-2 border focus:outline-none bg-white/40 text-white placeholder-white/80 rounded-full"
          />
          <div className="relative w-full sm:flex-1">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none custom-blur-select"
            >
              <option className="bg-white/20 backdrop-blur-md text-white" value="">Property Category</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-white/20 backdrop-blur-md text-white">{c}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <div className="relative w-full sm:flex-1">
            <select
              value={bedroom}
              onChange={(e) => setBedroom(e.target.value)}
              className="w-full text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none custom-blur-select"
            >
              <option className="bg-white/20 backdrop-blur-md text-white" value="">Bedroom</option>
              {bedrooms.map((b) => (
                <option key={b} value={b} className="bg-white/20 backdrop-blur-md text-white">{b}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <button
            type="submit"
            className="w-full sm:flex-1 bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:flex-1 bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark"
          >
            Reset Filters
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
}
