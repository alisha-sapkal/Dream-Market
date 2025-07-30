import { motion } from "framer-motion";
import { Mic, Search } from "lucide-react";

const HERO_BG =
  "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')";

const categories = ["Rent", "Sale", "Commercial", "Land", "Lease"];

export default function HeroSection() {
  return (
    <section
      className="w-full min-h-[200px] sm:min-h-[300px] flex flex-col items-center justify-center text-center text-white px-4 rounded-2xl"
      style={{
        backgroundImage: `${HERO_BG}, linear-gradient(to bottom, rgba(16,16,16,0.85), rgba(30,41,59,0.85))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-6xl min-h-[500px] sm:min-h-[600px] justify-end rounded-2xl"
        style={{ height: "60vh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full rounded-xl bg-white/20 backdrop-blur-md p-6 mb-4 flex flex-col items-center"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl py-2 mb-2 border-b border-gray-200 text-white drop-shadow-lg w-full text-start">
            Find Nearby Luxurious Estates
          </h1>
          <p className="text-sm sm:text-xl text-white drop-shadow-md text-start">
            We help you find your place, invest and build wealth in United
            Kingdom.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="w-full max-w-3xl mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-2xl p-3"
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-evenly gap-2">
              {["New launch", "Commercial", "Projects"].map((label, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-full"
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-row justify-evenly gap-2 w-full">
              <select className="px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-full">
                <option>property type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>

              <input
                type="text"
                placeholder="Search..............."
                className="flex-1 px-2 py-2 bg-transparent text-white font-semibold focus:outline-none"
              />

              <span className="flex items-center justify-center w-14 h-10 rounded-full border border-gray-300 mx-2">
                <Search size={22} strokeWidth={2} className="text-white" />
              </span>
              <span className="flex items-center justify-center w-14 h-10 rounded-full border border-gray-300">
                <Mic size={22} strokeWidth={2} className="text-white" />
              </span>
            </div>

            <div className="flex flex-row justify-evenly gap-2 w-full">
              {["BUY", "RENT", "POST PROPERTY"].map((label, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-full"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
}
