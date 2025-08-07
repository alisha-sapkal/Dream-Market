import { Link, useNavigate } from "react-router-dom";
import { Instagram, Mail, Facebook, Phone } from "lucide-react"
import { useUser } from "../components/UserContext";

export default function Footer() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://dreamservice.onrender.com/api/buyer/buyer-logout",
        {
          method: "POST",
          headers: {
            "X-CSRFToken": "GBDabkcGa24yFjSf7JVeMnetua0eVdSe",
            Referer: "https://dreamservice.onrender.com",
          },
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Logout failed");
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
      window.location.href = "/";
    }
  };

  return (
    <footer className="text-black py-6 mt-8 w-full text-xs sm:text-sm">
      <div className="px-4 flex flex-col sm:flex-row justify-between items-center w-full gap-6 sm:gap-0">
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-4 md:gap-0">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 order-2 md:order-1 w-full md:w-auto">
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
            <div className="hidden md:flex order-3 md:order-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-red-400"
                >
                  Logout
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="flex md:hidden justify-center gap-2 mt-4 mb-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-red-400 text-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-primary-dark text-sm"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-primary-light text-sm"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div
            className="relative w-full overflow-hidden mt-8"
            style={{ height: "6rem" }}
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
              <span className="text-3xl sm:text-5xl md:text-8xl font-semibold mr-16">
                Find Nearby Luxurious Estates{" "}
                <span className="text-[#52B8B8]">Dwello</span>
              </span>
              <span className="text-3xl sm:text-5xl md:text-8xl font-semibold mr-16">
                Find Nearby Luxurious Estates{" "}
                <span className="text-[#52B8B8]">Dwello</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 w-full px-4 gap-4 sm:gap-0">
        <div className="text-xs sm:text-xs md:text-lg">Template by Plaiter 💚</div>
        <div className="flex flex-row gap-4 sm:gap-6 text-md order-3 sm:order-2">
          <Instagram/>
          <Mail/>
          <Facebook/>
          <Phone/>
        </div>
        <div className="text-xs sm:text-xs md:text-lg">Copyright © 2024 Dwello®</div>
      </div>
      <div className="flex justify-center mt-4">
        {user ? (
          <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-primary-dark mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-primary-light">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="flex justify-center mt-6 mb-2">
        <button
          onClick={() => navigate("/subscribe")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
        >
          Subscribe
        </button>
      </div>
    </footer>
  );
}
