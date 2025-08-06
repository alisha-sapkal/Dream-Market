import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "./UserContext";

export const navLinks = [
  // { name: "Search Properties", path: "/search-result" },
  // { name: "Favourite", path: "/favourite" },
  { name: "Profile", path: "/profile" },
  { name: "Submit Property", path: "/submit-property" },
];

export const extraNavLinks = [
  {
    name: "For Buyers",
    submenu: [
      { name: "Buy Property", path: "/buy" },
      { name: "New Projects", path: "/projects" },
      { name: "Home Loans", path: "/home-loans" },
      { name: "Area Guide", path: "/area-guide" },
    ],
  },
  {
    name: "For Tenants",
    submenu: [
      { name: "Rent Property", path: "/rent" },
      { name: "PG/Co-Living", path: "/pg" },
      { name: "Short Stay", path: "/short-stay" },
    ],
  },
  {
    name: "For Owners",
    submenu: [
      { name: "Sell Property", path: "/sell" },
      { name: "Post Property", path: "/submit-property" },
      { name: "My Listings", path: "/profile" },
    ],
  },
  {
    name: "For Dealers/Builders",
    submenu: [
      { name: "Dealer Solutions", path: "/dealer-solutions" },
      { name: "Builder Solutions", path: "/builder-solutions" },
      { name: "Advertise", path: "/advertise" },
    ],
  },
  // {
  //   name: "Insights",
  //   submenu: [
  //     { name: "Advice", path: "/advice" },
  //     { name: "News & Articles", path: "/news" },
  //     { name: "Market Trends", path: "/trends" },
  //   ],
  // },
];

export default function Navbar() {
  const { user, setUser } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Remove sticky/scroll-hide logic from the navbar
  // Instead, handle sticky searchbar in a parent (e.g. Layout or Home)

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
    <nav className="w-full bg-white/90 backdrop-blur shadow z-50">
      <div className="p-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 items-center w-full">
          <Link to="/" className="text-[#52B8B8] text-xl font-bold">
            Dwello
          </Link>
          <div className="hidden md:flex gap-4 text-sm font-light items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-primary font-medium"
              >
                {link.name}
              </Link>
            ))}
            {extraNavLinks.map((item, idx) => (
              <div key={item.name} className="relative group" tabIndex={0}>
                <button
                  className="relative px-3 py-1 text-gray-700 font-medium hover:text-[#52B8B8] transition-colors duration-200 flex items-center focus:outline-none"
                  tabIndex={-1}
                >
                  {item.name}
                  <svg
                    className="ml-1 w-3 h-3 text-gray-400 group-hover:text-[#52B8B8] transition"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div className="absolute left-0 top-full min-w-[220px] bg-white rounded-xl shadow-lg z-30 mt-2 py-3 px-2 hidden group-hover:block">
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={sub.name + subIdx}
                      to={sub.path}
                      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="hidden md:flex">
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
          <button
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <AnimatePresence>
  {mobileOpen && (
    <motion.div
      key="mobile-navbar"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="md:hidden mt-2 bg-white/95 rounded-xl shadow-lg p-4 w-full max-h-[80vh] overflow-y-auto"
    >
      <div className="flex flex-col items-center gap-2">
        {navLinks.map(link => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setMobileOpen(false)}
            className="w-full text-center text-gray-700 hover:text-primary font-medium py-2"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <h1>Hello</h1>

      <div className="flex flex-col mt-4 items-center gap-1 w-full">
        {extraNavLinks.map((item, idx) => (
          <div key={item.name} className="w-full">
            <button
              onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
              className="w-full flex justify-center items-center px-4 py-3 text-gray-700 font-medium"
            >
              <span className="mx-auto">{item.name}</span>
              <motion.span
                animate={{ rotate: openAccordion === idx ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence>
              {openAccordion === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-2 flex flex-col items-center"
                >
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={sub.name + subIdx}
                      to={sub.path}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-600 hover:text-primary text-center w-full"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full px-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 border bg-gray-200 rounded-full hover:bg-red-400 text-center"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup" className="ml-4 px-4 py-1 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
            <Link to="/login" className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
          </>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </nav>
  );
}
