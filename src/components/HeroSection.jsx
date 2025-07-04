import {motion} from 'framer-motion'


const HERO_BG =
  "url('data:image/jpeg;base64,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')";

const categories = ["Rent", "Sale", "Commercial", "Land", "Lease"];

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center text-center text-white py-16 px-4 rounded-2xl"
      style={{
        backgroundImage: `${HERO_BG}, linear-gradient(to bottom, rgba(16,185,129,0.7), rgba(59,130,246,0.5))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
      }}
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl min-h-[500px] sm:min-h-[600px] justify-end rounded-2xl" style={{height: '60vh'}}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-6xl text-start w-full rounded-xl bg-white/20 backdrop-blur-md p-6 mb-4 flex flex-col items-center"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl py-2 mb-2 border-b-1 border-gray-200 text-white drop-shadow-lg w-full">
            Find Nearby Luxurious Estates
          </h1>
          <p className="text-sm text-start sm:text-xl text-white drop-shadow-md">
            We help you find your place, invest and build wealth in United
            Kingdom.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-4 max-w-6xl w-full rounded-full bg-white/20 backdrop-blur-md p-4"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-1/6"
            >
              {cat}
            </button>
          ))}
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row gap-2 max-w-6xl w-full mx-auto"
        >
          <input
            type="text"
            placeholder="Location"
            className="flex-1 px-3 py-2 border focus:outline-none bg-white/40 text-white placeholder-white/80 rounded-full"
          />
          <div className="relative w-full">
            <select className="flex-1 text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none w-full custom-blur-select">
              <option className="bg-white/20 backdrop-blur-md text-white">Property Category</option>
              <option className="bg-white/20 backdrop-blur-md text-white">Apartment</option>
              <option className="bg-white/20 backdrop-blur-md text-white">House</option>
              <option className="bg-white/20 backdrop-blur-md text-white">Commercial</option>
              <option className="bg-white/20 backdrop-blur-md text-white">Land</option>
              <option className="bg-white/20 backdrop-blur-md text-white">Lease</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <div className="relative w-full">
            <select className="flex-1 text-sm px-3 py-2 border focus:outline-none bg-white/40 text-white rounded-full pr-10 appearance-none w-full custom-blur-select">
              <option className="bg-white/20 backdrop-blur-md text-white">Bedroom</option>
              <option className="bg-white/20 backdrop-blur-md text-white">1</option>
              <option className="bg-white/20 backdrop-blur-md text-white">2</option>
              <option className="bg-white/20 backdrop-blur-md text-white">3</option>
              <option className="bg-white/20 backdrop-blur-md text-white">4+</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <button
            type="submit"
            className="bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark"
          >
            Search
          </button>
        </motion.form>
      </div>
    </section>
  );
}
