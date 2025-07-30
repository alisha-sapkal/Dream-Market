import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function StickySearchBar({
  value,
  onChange,
  navLinks,
  extraNavLinks,
  user,
  handleLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur shadow-md border-b border-gray-200">
      <div className="flex items-center gap-2 max-w-6xl px-2 sm:px-4 py-2 relative">
        <div className="flex-1 w-full md:w-auto">
          <SearchBar value={value} onChange={onChange} />
        </div>

        {/* Hamburger menu for mobile */}
        <button
          className="md:hidden p-2 rounded focus:outline-none z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

        {/* Navigation Links */}
        <nav
          className={`flex-1 items-center gap-2 ${
            mobileOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-white shadow rounded-b-xl p-4 z-40"
              : "hidden"
          } md:flex md:flex-row md:static md:bg-transparent md:shadow-none md:rounded-none md:p-0`}
        >
          {/* Normal Nav Links */}
          {navLinks &&
            navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="px-3 py-1 rounded-full text-gray-700 hover:bg-gray-100 font-medium transition w-full md:w-auto text-center"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}

          {/* Extra Nav Links with submenu */}
          {extraNavLinks &&
            extraNavLinks.map((item, idx) => (
              <div
                key={item.name}
                className="relative group w-full md:w-auto text-center"
              >
                {/* Button for both desktop and mobile */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="relative px-3 py-1 text-gray-700 font-medium hover:text-[#52B8B8] transition-colors duration-200 flex items-center justify-center w-full md:w-auto"
                >
                  {item.name}
                  {mobileOpen ? (
                    openAccordionIndex === idx ? (
                      <ChevronUp className="ml-1 w-4 h-4 text-gray-400 group-hover:text-[#52B8B8]" />
                    ) : (
                      <ChevronDown className="ml-1 w-4 h-4 text-gray-400 group-hover:text-[#52B8B8]" />
                    )
                  ) : (
                    <ChevronDown className="ml-1 w-3 h-3 text-gray-400 group-hover:text-[#52B8B8] transition" />
                  )}
                </button>

                {/* Dropdown - desktop */}
                <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 top-full min-w-[220px] bg-white rounded-xl shadow-lg z-30 mt-2 py-3 px-2">
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={sub.name + subIdx}
                      to={sub.path}
                      className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>

                {/* Accordion - mobile only */}
                {mobileOpen && openAccordionIndex === idx && (
                  <div className="flex flex-col w-full mt-1 px-2 space-y-1">
                    {item.submenu.map((sub, subIdx) => (
                      <Link
                        key={sub.name + subIdx}
                        to={sub.path}
                        className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

          {/* Auth Buttons */}
          <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-red-400"
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
        </nav>
      </div>
    </div>
  );
}
