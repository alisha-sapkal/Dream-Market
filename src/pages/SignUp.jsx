import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm: "",
    username: "",
    aadhaar_number: "",
    pan_number: "",
    aadhaar_card: null,
    pan_card: null,
    profile_picture: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    setError("");
    try {
      const fd = new FormData();
      fd.append("first_name", form.first_name);
      fd.append("last_name", form.last_name);
      fd.append("email", form.email);
      fd.append("phone_number", form.phone_number);
      fd.append("password", form.password);
      fd.append("username", form.username);
      fd.append("aadhaar_number", form.aadhaar_number);
      fd.append("pan_number", form.pan_number);
      if (form.aadhaar_card) fd.append("aadhaar_card", form.aadhaar_card);
      if (form.pan_card) fd.append("pan_card", form.pan_card);
      if (form.profile_picture) fd.append("profile_picture", form.profile_picture);
      const res = await fetch("https://dreamservice.onrender.com/api/buyer/add-buyer", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) {
        let msg = data.message || "Signup failed. Please try again.";
        if (msg.toLowerCase().includes("email")) msg = "This email is already registered.";
        toast.error(msg);
        return;
      }
      // Save user info to context and localStorage
      setUser({
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        phone_number: form.phone_number,
      });
      toast.success("Signup successful! Please log in.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error("Network error. Please try again later.");
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
            Sign up
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="text" name="phone_number" placeholder="Phone Number" value={form.phone_number} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="text" name="aadhaar_number" placeholder="Aadhaar Number" value={form.aadhaar_number} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="text" name="pan_number" placeholder="PAN Number" value={form.pan_number} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="file" name="aadhaar_card" accept="image/*" onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="file" name="pan_card" accept="image/*" onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="file" name="profile_picture" accept="image/*" onChange={handleChange} className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            <input type="password" name="confirm" placeholder="Confirm Password" value={form.confirm} onChange={handleChange} required className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80" />
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <button type="submit" className="w-full py-3 bg-black text-white rounded-lg font-bold text-lg transition-colors cursor-pointer">Sign Up</button>
            <p className="text-center text-gray-600 mb-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-black font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
            <div className="text-xs text-gray-600 mb-2">
              Password: At least 8 characters, one uppercase letter, one
              lowercase letter, one digit, one special character
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="terms" className="text-xs text-gray-600">
                By continuing, you agree to the{" "}
                <a href="#" className="text-black underline">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-black underline">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </form>
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
