import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Search Properties', path: '/search-result' },
  { name: 'Favourite', path: '/favourite' },
  { name: 'Profile', path: '/profile' },
  { name: 'Submit Property', path: '/submit-property' },
];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-transform duration-300 bg-white/90 backdrop-blur ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="p-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 items-center w-full">
          <Link to="/" className="text-[#52B8B8] text-xl font-bold">Dwello</Link>
          <div className="hidden md:flex gap-4 text-sm font-light">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-gray-700 hover:text-primary font-medium">{link.name}</Link>
            ))}
          </div>
          <div className="hidden md:flex">
            <Link to="/signup" className="ml-4 px-4 py-1 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
            <Link to="/login" className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
          </div>
          <button className="md:hidden p-2 rounded focus:outline-none" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden mt-2 bg-white/95 rounded-xl shadow-lg p-4 flex flex-col gap-2 animate-fade-in">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-gray-700 hover:text-primary font-medium py-2" onClick={() => setMobileOpen(false)}>{link.name}</Link>
            ))}
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
              <Link to="/login" className="px-4 py-2 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 