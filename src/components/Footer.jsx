import { Link } from "react-router-dom";
import { Instagram, Mail, Facebook, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="text-black py-6 mt-8 w-full text-xs sm:text-sm">
      <div className="px-4 flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-0">
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              <a href="#" className="hover:text-gray-600 transition-colors">
                Home
              </a>
              <a
                href="#offers"
                className="hover:text-gray-600 transition-colors"
              >
                Offers
              </a>
              <a
                href="#explore"
                className="hover:text-gray-600 transition-colors"
              >
                Explore
              </a>
              <a
                href="#listings"
                className="hover:text-gray-600 transition-colors"
              >
                Listings
              </a>
              <a href="#info" className="hover:text-gray-600 transition-colors">
                Info
              </a>
            </div>
            <div className="hidden md:flex">
              <Link
                to="/signup"
                className="ml-4 px-4 py-1 bg-black text-white rounded-full hover:bg-primary-dark"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-primary-light"
              >
                Login
              </Link>
            </div>
          </div>
          <div
            className="relative w-full overflow-hidden mt-8"
            style={{ height: "10rem" }}
          >
            <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
            <div
              className="whitespace-nowrap flex items-center"
              style={{
                animation: "marquee 18s linear infinite",
                willChange: "transform",
              }}
            >
              <span className="text-10xl md:text-8xl font-semibold mr-16">
                Find Nearby Luxurious Estates{" "}
                <span className="text-[#52B8B8]">Dwello</span>
              </span>
              <span className="text-10xl md:text-8xl font-semibold mr-16">
                Find Nearby Luxurious Estates{" "}
                <span className="text-[#52B8B8]">Dwello</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-8 w-full px-4">
        <div className="text-lg sm:text-xs">Template by Plaiter 💚</div>
        <div className="flex flex-row gap-6 text-md">
          <Instagram/>
          <Mail/>
          <Facebook/>
          <Phone/>
        </div>
        <div className="text-lg sm:text-xs">Copyright © 2024 Dwello®</div>
      </div>
    </footer>
  );
}
