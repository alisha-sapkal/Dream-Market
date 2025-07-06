import { useState } from "react";
import PropertyCard from "./PropertyCard";
import {Search} from 'lucide-react';

const HERO_BG =
  "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')"; // dark modern interior

const filters = ["Rent", "Sale", "Commercial", "Land", "Lease"];
const categories = ["Apartment", "House", "Commercial", "Land", "Lease"];
const bedrooms = ["1", "2", "3", "4+"];

const properties = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    type: "Rent",
    price: "$350,000",
    address: "29, Pine Avenue, Kent, UK",
    details: "2 Beds • 2 Baths • 78.5 m²",
    category: "Apartment",
    bedroom: "2",
  },
  // Add more property objects as needed
];

export default function PropertyResults() {
  const [active, setActive] = useState("Rent");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [bedroom, setBedroom] = useState("");

  // Filter logic (placeholder, can be expanded)
  const filtered = properties.filter(
    (p) =>
      (!active || p.type === active) &&
      (!category || p.category === category) &&
      (!bedroom || p.bedroom === bedroom) &&
      (!location || p.address.toLowerCase().includes(location.toLowerCase()))
  );

  return (
    <section
      className="relative w-full min-h-[400px] flex flex-col items-center justify-center text-white py-16 px-4 rounded-2xl"
      style={{
        backgroundImage: `${HERO_BG}, linear-gradient(to bottom, rgba(16,16,16,0.85), rgba(30,41,59,0.85))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl min-h-[200px] justify-around rounded-2xl">
        <div className="flex flex-col items-center justify-between w-full sm:flex-row">
          <div className="flex flex-row items-center gap-2">
            <h2 className="text-3xl text-white drop-shadow-lg">
              Properties Results
            </h2>
            <span className="text-xs text-white/80 font-semibold border-1 border-gray-100 rounded-xl p-2">
              {filtered.length}
            </span>
          </div>
          <div className="flex flex-row gap-4 bg-white rounded-full text-sm text-gray-500 p-2">
            <Search className="text-sm text-gray-500"/>
            <span className="text-sm text-gray-500">Search Properties...</span></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-6xl w-full rounded-full bg-white/20 backdrop-blur-md p-2">
          {filters.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-1/6 ${
                active === cat ? "bg-[#52B8B8] text-white" : ""
              }`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <form className="bg-white/20 backdrop-blur-md p-2 flex flex-col sm:flex-row gap-2 max-w-6xl w-full mx-auto rounded-full">
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
              <option className="bg-white/20 backdrop-blur-md text-white">Property Category</option>
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
              <option className="bg-white/20 backdrop-blur-md text-white">Bedroom</option>
              {bedrooms.map((b) => (
                <option key={b} value={b} className="bg-white/20 backdrop-blur-md text-white">{b}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setLocation("");
              setCategory("");
              setBedroom("");
            }}
            className="w-full sm:flex-1 bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark"
          >
            Reset Filters
          </button>
        </form>
      </div>
    </section>
  );
}
