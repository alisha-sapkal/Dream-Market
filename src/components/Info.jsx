import React from "react";

function Info() {
  return (
    <section className="py-8 px-2 sm:px-4 md:px-8 bg-white/80 backdrop-blur rounded-2xl max-w-8xl my-8">
      {/* Responsive YouTube Video */}
      <div className="w-full mb-8 rounded-2xl" style={{ aspectRatio: "16/9" }}>
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Dwello Info Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 0 }}
        ></iframe>
      </div>
      {/* Connect Section */}
      <div className="backdrop-blur-md rounded-xl p-0 shadow overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[200px]">
          <div className="flex flex-col justify-center px-8 py-8 bg-gradient-to-r from-[#255353] to-[#51B6B6] w-full lg:w-3/5">
            <h3 className="text-2xl md:text-4xl text-white mb-4 text-left leading-tight">
              Get Luxury Apartment Updates with Dwello.
            </h3>
            <p className="text-sm text-white text-left">
              Your trusted real estate partner in every transaction.
            </p>
          </div>
          {/* Right: Gradient, Form */}
          <div className="flex flex-col justify-center px-8 py-8 bg-gradient-to-r from-[#429595] to-[#52B7B7] w-full lg:w-2/5">
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mx-auto items-center justify-center">
              <input
                type="email"
                defaultValue="Lewis@dwello.com"
                className="w-1/2 flex-1 p-2 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-gray-500 placeholder-gray-500 text-base md:text-sm items-center"
              />
              <button
                type="submit"
                className="w-1/2 p-2 bg-black text-white rounded-full font-bold text-base md:text-sm hover:bg-gray-900 transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
