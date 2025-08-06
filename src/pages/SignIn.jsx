import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "../components/UserContext";

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://dreamservice.onrender.com/api/buyer/buyer-login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // Save user info to context and localStorage
      setUser({
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        aadhaar_number: data.aadhaar_number || '',
        pan_number: data.pan_number || '',
        profile_picture: data.profile_picture || '',
      });
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResetSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
      toast.success('Password reset email sent! Please check your inbox.');
      setResetSent(true);
      setTimeout(() => {
        setShowReset(false);
        setResetSent(false);
        setResetEmail('');
      }, 3000);
    } catch (err) {
      toast.error(err.message || 'Reset failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 justify-center items-center py-8 px-2 md:px-4 bg-cover bg-center relative">
      <ToastContainer position="top-right" />
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center py-8 px-2 md:px-4 bg-cover bg-center relative min-h-[350px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        }}
      >
        <div className="w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 text-black">
            {showReset ? 'Reset Password' : 'Sign in'}
          </h2>
          {showReset ? (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="resetEmail"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
              />
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg transition-colors"
              >
                Send Reset Link
              </button>
              {resetSent && <div className="text-green-600 text-sm">Check your email for a reset link.</div>}
              <button type="button" className="text-sm text-gray-600 underline mt-2" onClick={() => setShowReset(false)}>
                Back to Login
              </button>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80"
            />
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg transition-colors"
            >
              Sign In
            </button>
              <button type="button" className="text-sm text-gray-600 underline mt-2" onClick={() => setShowReset(true)}>
                Forgot password?
            </button>
            <p className="text-center text-gray-600 mb-6">
                Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-black font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
          )}
          <div className="mt-6 text-center text-xs text-gray-400">
            Powered by FramerAuth
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 text-black items-start gap-6 md:gap-10 px-2 md:px-10 mt-8 md:mt-0">
        <Link to="/" className="text-[#52B8B8] text-xl md:text-2xl font-bold">
          Dwello
        </Link>
        <div className="mt-4 md:mt-8 items-start text-2xl md:text-4xl font-semibold drop-shadow-lg py-4 md:py-10">
          Start living your dreams in our luxury property.
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full md:justify-end">
          <div className="mt-4 text-center text-xs drop-shadow">
            ©2024 Dwello, Inc. All Rights Reserved.
          </div>
          <div className="mt-4 flex justify-center text-sm gap-4 drop-shadow">
            <a href="#" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}