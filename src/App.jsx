import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
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
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Layout({ children }) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/signup' || location.pathname === '/login';
  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideNavFooter && <Footer />}
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

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
