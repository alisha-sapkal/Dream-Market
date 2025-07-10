import {motion} from 'framer-motion'


const HERO_BG =
  "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')";

const categories = ["Rent", "Sale", "Commercial", "Land", "Lease"];

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center text-center text-white py-16 px-4 rounded-2xl"
      style={{
        backgroundImage: `${HERO_BG}, linear-gradient(to bottom, rgba(16,16,16,0.85), rgba(30,41,59,0.85))`,
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
          className="flex flex-wrap justify-center gap-2 mb-4 max-w-6xl w-full rounded-2xl md:rounded-full bg-white/20 backdrop-blur-md p-2"
        >
          <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-2 w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 bg-white/10 rounded-full text-white font-medium hover:bg-primary hover:text-white transition w-full"
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
        >
          <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-5 md:grid-rows-1 gap-2 w-full">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 px-3 py-2 border focus:outline-none bg-white/40 text-white placeholder-white/80 rounded-full w-full"
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
              className="bg-primary text-black bg-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark w-full"
            >
              Search
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
