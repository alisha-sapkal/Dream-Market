import { Link } from 'react-router-dom';
import { useEffect, useState, Fragment, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // <-- Add this import

const navLinks = [
  { name: 'Search Properties', path: '/search-result' },
  { name: 'Favourite', path: '/favourite' },
  { name: 'Profile', path: '/profile' },
  { name: 'Submit Property', path: '/submit-property' },
];

const extraNavLinks = [
  {
    name: 'For Buyers',
    submenu: [
      { name: 'Buy Property', path: '/buy' },
      { name: 'New Projects', path: '/projects' },
      { name: 'Home Loans', path: '/home-loans' },
      { name: 'Area Guide', path: '/area-guide' },
    ],
  },
  {
    name: 'For Tenants',
    submenu: [
      { name: 'Rent Property', path: '/rent' },
      { name: 'PG/Co-Living', path: '/pg' },
      { name: 'Short Stay', path: '/short-stay' },
    ],
  },
  {
    name: 'For Owners',
    submenu: [
      { name: 'Sell Property', path: '/sell' },
      { name: 'Post Property', path: '/submit-property' },
      { name: 'My Listings', path: '/profile' },
    ],
  },
  {
    name: 'For Dealers/Builders',
    submenu: [
      { name: 'Dealer Solutions', path: '/dealer-solutions' },
      { name: 'Builder Solutions', path: '/builder-solutions' },
      { name: 'Advertise', path: '/advertise' },
    ],
  },
  {
    name: 'Insights',
    submenu: [
      { name: 'Advice', path: '/advice' },
      { name: 'News & Articles', path: '/news' },
      { name: 'Market Trends', path: '/trends' },
    ],
  },
];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  // Track which dropdown is open for animation
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const syncUser = () => setUser(JSON.parse(localStorage.getItem('user')));
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/buyer/buyer-logout', {
        method: 'POST',
        headers: {
          'X-CSRFToken': 'GBDabkcGa24yFjSf7JVeMnetua0eVdSe',
          'Referer': 'https://dreamservice.onrender.com',
        },
        credentials: 'include', 
      });
      if (!res.ok) throw new Error('Logout failed');
      setUser(null);
      window.location.href = '/login';
    } catch (err) {
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-transform duration-300 bg-white/90 backdrop-blur ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="p-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 items-center w-full">
          <Link to="/" className="text-[#52B8B8] text-xl font-bold">Dwello</Link>
          {/* Desktop */}
          <div className="hidden md:flex gap-4 text-sm font-light items-center">
            {/* {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-gray-700 hover:text-primary font-medium">{link.name}</Link>
            ))} */}
            {extraNavLinks.map((item, idx) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(idx)}
                onMouseLeave={() => setOpenDropdown(null)}
                onFocus={() => setOpenDropdown(idx)}
                onBlur={() => setOpenDropdown(null)}
                tabIndex={0}
              >
                <button
                  className="relative px-3 py-1 text-gray-700 font-medium hover:text-[#52B8B8] transition-colors duration-200 flex items-center focus:outline-none"
                  tabIndex={-1}
                >
                  {item.name}
                  <svg className="ml-1 w-3 h-3 text-gray-400 group-hover:text-[#52B8B8] transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {/* Dropdown with framer-motion */}
                <AnimatePresence>
                  {openDropdown === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute left-0 top-full min-w-[220px] bg-white rounded-xl shadow-lg z-30 mt-2 py-3 px-2"
                      style={{ pointerEvents: openDropdown === idx ? 'auto' : 'none' }}
                    >
                      {item.submenu.map((sub, subIdx) => (
                        <Link
                          key={sub.name + subIdx}
                          to={sub.path}
                          className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
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
          <div className="hidden md:flex">
            {user ? (
              <>
                <button onClick={handleLogout} className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="ml-4 px-4 py-1 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
                <Link to="/login" className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
              </>
            )}
          </div>
          <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <AnimatePresence>
            <motion.div
              key="mobile-navbar"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="md:hidden mt-2 bg-white/95 rounded-xl shadow-lg p-4 flex flex-col gap-2"
              style={{
                maxHeight: '80vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth'
              }}
            >
              {/* {navLinks.map(link => (
                <Link key={link.name} to={link.path} className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setMobileOpen(false)}>{link.name}</Link>
              ))} */}
              {extraNavLinks.map((item, idx) => (
                <Fragment key={item.name}>
                  <div className="font-semibold text-gray-700 mt-2">{item.name}</div>
                  {item.submenu.map((sub, subIdx) => (
                    <Link
                      key={sub.name + subIdx}
                      to={sub.path}
                      className="block pl-4 py-2 text-gray-600 hover:text-primary"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </Fragment>
              ))}
              <div className="flex flex-col gap-2 mt-2">
                {user ? (
                  <>
                    <button onClick={handleLogout} className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-red-400">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
                    <Link to="/login" className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </nav>
  );
}