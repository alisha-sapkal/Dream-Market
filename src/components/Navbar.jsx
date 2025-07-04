import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const navLinks = [
  { name: 'Search Properties', path: '/' },
  { name: 'Favourite', path: '/favourite' },
  { name: 'Profile', path: '/profile' },
  { name: 'Submit Property', path: '/submit-property' },
];

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ${show ? 'translate-y-0' : '-translate-y-full'}`}
      style={{ willChange: 'transform' }}
    >
      <div className="p-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between h-16 items-center w-full">
          <Link to="/" className="text-emerald-400 text-xl font-bold">Dwello</Link>
          <div className="hidden md:flex gap-4 text-sm font-light">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="text-gray-700 hover:text-primary font-medium">{link.name}</Link>
            ))}
          </div>
          <div className="hidden md:flex">
            <Link to="/signup" className="ml-4 px-4 py-1 bg-black text-white rounded-full hover:bg-primary-dark">Sign Up</Link>
            <Link to="/login" className="ml-2 px-4 py-1 text-center border bg-gray-200 rounded-full hover:bg-primary-light">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 