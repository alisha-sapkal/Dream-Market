import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Property Details */}
          <div className="md:col-span-2">
            <motion.h3
              className="text-xl font-semibold mb-2 text-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Property Details
            </motion.h3>
          </div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.01 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.02 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.03 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.04 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.07 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.09 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.11 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.13 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.14 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.17 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.19 }}
          >
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
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>

          {/* Agent Details */}
          <div className="md:col-span-2">
            <motion.h3
              className="text-xl font-semibold text-start mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Agent Details
            </motion.h3>
          </div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.21 }}
          >
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
              placeholder="Samuel Wright"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
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
              placeholder="Everegreen Estates"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.23 }}
          >
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
              placeholder="samuel.wright@evergreenestates.com"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
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
              placeholder="mailto:samuel.wright@evergreenestates.com"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <label
              htmlFor="about"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              About*
            </label>
            <textarea
              id="about"
              name="about"
              value={form.about}
              onChange={handleChange}
              required
              placeholder="Samuel Wright's expertise in Property Management, Real Estate Appraising, and Real Estate Development allows him to offer comprehensive services to his clients. His analytical skills and proactive approach ensure that every project is executed flawlessly."
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.26 }}
          >
            <label
              htmlFor="specialities"
              className="block mb-1 font-medium text-gray-700 text-left text-sm"
            >
              Specialities*
            </label>
            <input
              id="specialities"
              name="specialities"
              value={form.specialities}
              onChange={handleChange}
              required
              placeholder="Property Management, Real Estate Appraising, Real Estate Development"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.27 }}
          >
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
              placeholder="Manchester, Kent, UK"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
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
              placeholder="456 Pine Avenue, Suite 700, Kent, UK"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.29 }}
          >
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
              placeholder="(111) 123-4567"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
              placeholder="tel:+1111234567"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.31 }}
          >
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
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
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
              placeholder="e.g. google drive link"
              className="input border border-gray-200 rounded-xl p-2 text-left w-full text-xs"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full py-3 bg-black text-white rounded-lg text-xl transition-colors mt-4 disabled:opacity-60"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {loading ? "Submitting..." : "Submit"}
          </motion.button>
        </motion.form>
      </div>
      <style>{`
        .input {
          @apply px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black bg-white/80 w-full;
        }
      `}</style>
    </div>
  );
}
