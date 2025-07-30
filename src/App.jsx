import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar, { navLinks, extraNavLinks } from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SearchResult from './pages/SearchResult';
import Favourite from './pages/Favourite';
import Profile from './pages/Profile';
import SubmitProperty from './pages/SubmitProperty';
import PropertyDetails from './pages/PropertyDetails';
import AgentProfile from "./pages/AgentProfile";
import { useEffect, useState } from 'react';
import './App.css'
import StickySearchBar from './components/StickySearchBar';
import { useUser } from './components/UserContext';

function Layout({ children }) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/signup' || location.pathname === '/login';
  const [searchValue, setSearchValue] = useState("");
  const { user, setUser } = useUser();

  // --- Add this for sticky bar visibility ---
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // --- End sticky logic ---

  const handleLogout = () => {
    setUser(null);
    // Add any other logout logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNavFooter && <Footer />}
      {showSticky && (
        <StickySearchBar
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          navLinks={navLinks}
          extraNavLinks={extraNavLinks}
          user={user}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/submit-property" element={<SubmitProperty />} />
          <Route path="/property-details/:title" element={<PropertyDetails />} />
          <Route path="/agent/:agentName" element={<AgentProfile />} />
          {/* Add more routes here for other pages */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
