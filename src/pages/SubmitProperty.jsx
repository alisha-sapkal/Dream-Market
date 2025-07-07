import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  title: "",
  price: "",
  type: "",
  address: "",
  location: "",
  bathroom: "",
  bedroom: "",
  size: "",
  utilities: "",
  outdoor: "",
  description: "",
  features: "",
  youtube: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  image5: "",
  map: "",
  
  agentName: "",
  company: "",
  agentEmail: "",
  messageLink: "",
  about: "",
  specialities: "",
  serviceArea: "",
  officeAddress: "",
  phone: "",
  callLink: "",
  thumbnail: "",
  profileImage: "",
};

const propertyTypes = ["Rent", "Sale", "Commercial", "Land", "Lease"];
const locations = [
  "Kent",
  "London",
  "Westminster",
  "Birmingham",
  "Leeds",
  "Manchester",
];
const numbers = ["1", "2", "3", "4+"];

export default function SubmitProperty() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/submit-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      toast.success("Property submitted successfully!");
      setForm(initialState);
    } catch (err) {
      toast.error(err.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-2 flex flex-col items-center">
      <ToastContainer position="top-right" />
      <div className="w-full max-w-3xl bg-gray-50 rounded-2xl border-1 border-gray-200 p-8">
        <h2 className="text-3xl font-semibold mb-6 text-start">
          Submit Property
        </h2>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="Property Illustration"
          className="w-full max-h-64 object-cover rounded-xl mb-8 shadow"
        />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
        >
          {/* Property Details */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-start">
              Property Details
            </h3>
          </div>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Title*
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Modern Condo"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Price*
            </label>
            <input
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              placeholder="$350000"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="type"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Type*
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            >
              <option value="">Select</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="address"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Address*
            </label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="29, Pine Avenue, Kent, UK"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="location"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Location*
            </label>
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            >
              <option value="">Select</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="bathroom"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Bathroom*
            </label>
            <select
              id="bathroom"
              name="bathroom"
              value={form.bathroom}
              onChange={handleChange}
              required
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            >
              <option value="">Select</option>
              {numbers.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="bedroom"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Bedroom*
            </label>
            <select
              id="bedroom"
              name="bedroom"
              value={form.bedroom}
              onChange={handleChange}
              required
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            >
              <option value="">Select</option>
              {numbers.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="interior"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Interior Details
            </label>
            <input
              id="interior"
              name="interior"
              value={form.interior || ""}
              onChange={(e) => setForm({ ...form, interior: e.target.value })}
              placeholder="Equipped kitchen"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="size"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Size (Area)
            </label>
            <input
              id="size"
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="6x78.5 m2"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="utilities"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Utilities
            </label>
            <input
              id="utilities"
              name="utilities"
              value={form.utilities}
              onChange={handleChange}
              placeholder="Central Air"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="outdoor"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Outdoor Details
            </label>
            <input
              id="outdoor"
              name="outdoor"
              value={form.outdoor}
              onChange={handleChange}
              placeholder="Backyard"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="description"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Property Description"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="features"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Other Features
            </label>
            <input
              id="features"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="Chair Accessible"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="youtube"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Youtube Link
            </label>
            <input
              id="youtube"
              name="youtube"
              value={form.youtube}
              onChange={handleChange}
              placeholder="e.g. Youtube link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image1"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Image 1 Link*
            </label>
            <input
              id="image1"
              name="image1"
              value={form.image1}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image2"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Image 2 Link*
            </label>
            <input
              id="image2"
              name="image2"
              value={form.image2}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image3"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Image 3 Link*
            </label>
            <input
              id="image3"
              name="image3"
              value={form.image3}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image4"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Image 4 Link*
            </label>
            <input
              id="image4"
              name="image4"
              value={form.image4}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="image5"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Property Image 5 Link
            </label>
            <input
              id="image5"
              name="image5"
              value={form.image5}
              onChange={handleChange}
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="map"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Map Coordinates*
            </label>
            <input
              id="map"
              name="map"
              value={form.map}
              onChange={handleChange}
              required
              placeholder="Enter map coordinates"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>

          {/* Agent Details */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-start mb-2">
              Agent Details
            </h3>
          </div>
          <div className="w-full">
            <label
              htmlFor="agentName"
              className="block mb-1 text-gray-700 text-left text-sm"
            >
              Name*
            </label>
            <input
              id="agentName"
              name="agentName"
              value={form.agentName}
              onChange={handleChange}
              required
              placeholder="Samuel Wright
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="company"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Company Name*
            </label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              placeholder="Everegreen Estates
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="agentEmail"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Email*
            </label>
            <input
              id="agentEmail"
              name="agentEmail"
              value={form.agentEmail}
              onChange={handleChange}
              required
              placeholder="
samuel.wright@evergreenestates.com
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="messageLink"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Message Link*
            </label>
            <input
              id="messageLink"
              name="messageLink"
              value={form.messageLink}
              onChange={handleChange}
              required
              placeholder="mailto:samuel.wright@evergreenestates.com
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label htmlFor="about" className="block mb-1 font-medium text-gray-700 text-left text-sm">About*</label>
            <textarea id="about" name="about" value={form.about} onChange={handleChange} required placeholder="Samuel Wright's expertise in Property Management, Real Estate Appraising, and Real Estate Development allows him to offer comprehensive services to his clients. His analytical skills and proactive approach ensure that every project is executed flawlessly." className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs" />
          </div>
          <div className="w-full">
            <label htmlFor="specialities" className="block mb-1 font-medium text-gray-700 text-left text-sm">Specialities*</label>
            <input id="specialities" name="specialities" value={form.specialities} onChange={handleChange} required placeholder="Property Management, Real Estate Appraising, Real Estate Development" className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs" />
          </div>
          <div className="w-full">
            <label
              htmlFor="serviceArea"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Service Area*
            </label>
            <input
              id="serviceArea"
              name="serviceArea"
              value={form.serviceArea}
              onChange={handleChange}
              required
              placeholder="Manchester, Kent, UK
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="officeAddress"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Office Address*
            </label>
            <input
              id="officeAddress"
              name="officeAddress"
              value={form.officeAddress}
              onChange={handleChange}
              required
              placeholder="456 Pine Avenue, Suite 700, Kent, UK
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="phone"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Phone Number*
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="(111) 123-4567
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="callLink"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Call Link*
            </label>
            <input
              id="callLink"
              name="callLink"
              value={form.callLink}
              onChange={handleChange}
              required
              placeholder="tel:+1111234567
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="thumbnail"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Thumbnail*
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="profileImage"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Profile Image*
            </label>
            <input
              id="profileImage"
              name="profileImage"
              value={form.profileImage}
              onChange={handleChange}
              required
              placeholder="e.g. google drive link
"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full py-3 bg-black text-white rounded-lg text-xl transition-colors mt-4 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <style>{`
        .input {
          @apply px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80 w-full;
        }
      `}</style>
    </div>
  );
}
