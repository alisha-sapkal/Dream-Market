import React from "react";
import { BedDouble, Bath, RulerDimensionLine } from 'lucide-react';

const listings = [
  {
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "$350,000",
    type: "Rent",
    category: "Apartment",
    title: "Modern Condo",
    address: "29, Pine Avenue, Kent, UK",
    beds: 2,
    baths: 2,
    area: "78.5 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    price: "$450,000",
    type: "Rent",
    category: "House",
    title: "Charming Historic Home",
    address: "68, McLewin, London, UK",
    beds: 4,
    baths: 2,
    area: "120 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    price: "$300,000",
    type: "Commercial",
    category: "Duplex",
    title: "Cozy Cottage Views",
    address: "203 Evy Street, Suite 4, Westminster",
    beds: 3,
    baths: 3,
    area: "95 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$150,000",
    type: "Commercial",
    category: "Industrial",
    title: "Contemporary Downtown Loft",
    address: "14 Glover, Birmingham, UK",
    beds: 0,
    baths: 1,
    area: "60 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "$400,000",
    type: "Lease",
    category: "Apartment",
    title: "Elegant Family Home",
    address: "88 Collyer Avenue, Leeds, UK",
    beds: 3,
    baths: 2,
    area: "110 m²",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "$40,000",
    type: "Lease",
    category: "Apartment",
    title: "Gorgeous Villa for Rent",
    address: "34, Queens, Manchester, UK",
    beds: 2,
    baths: 3,
    area: "90 m²",
  },
];

function Explore() {
  return (
    <section className="py-12 bg-gray-100 flex flex-row justify-center items-center mx-auto">
      <div className="text-start bg-white rounded-2xl flex flex-col justify-between p-8 self-center min-w-[320px] max-w-md ml-8">
        <div>
          <h2 className="text-3xl sm:text-3xl font-semibold mb-2 text-start">
            Explore & Find your Dream home
          </h2>
          <p className="text-gray-700 text-start mb-8">
            We help you find your place, invest and build wealth in United
            Kingdom.
          </p>
          <div className="flex flex-row gap-8 mb-4 border-2 border-gray-50 rounded-2xl text-center p-4">
            <div className="flex flex-col items-start">
              <span className="text-3xl sm:text-4xl font-semibold text-primary">$200M+</span>
              <span className="text-gray-600 text-sm font-medium">Property in Real Estate</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-3xl sm:text-4xl font-semibold text-primary">100+</span>
              <span className="text-gray-600 text-sm font-medium">Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-7xl mx-auto overflow-y-auto max-h-[600px] scrollbar-none text-start">
        {listings.map((listing, idx) => (
          <div
            key={idx}
            className="group rounded-2xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden flex flex-col transition-transform duration-300 min-w-[320px] w-[350px]"
          >
            <div className="relative">
              <img
                src={listing.image}
                alt={listing.title}
                className="h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-primary text-white text-xs font-semibold uppercase rounded-full px-3 py-1 shadow">
                  {listing.type}
                </span>
                <span className="bg-primary text-white text-xs font-semibold uppercase rounded-full px-3 py-1 shadow">
                  {listing.category}
                </span>
              </div>
            </div>
            <div className="flex justify-around mt-2 items-center">
              <div className="flex items-center gap-1 mr-auto border-1 border-gray-200 rounded-full p-1">
                <img src={listing.image} alt="thumb" className="w-4 h-4 rounded-full object-cover" />
                <span className="text-sm text-gray-500 font-medium">+4 Images</span>
              </div>
              <span className="text-primary text-md font-semibold uppercase px-3 py-1">
                {listing.price}
              </span>
            </div>
            <div className="flex-1 flex flex-col p-4">
              <h3 className="text-lg font-bold mb-1 text-gray-900">
                {listing.title}
              </h3>
              <p className="text-gray-700 text-sm mb-2">{listing.address}</p>
              <div className="flex items-center gap-4 text-gray-600 text-xs mb-4">
                <span className="flex items-center"><BedDouble className="w-5 h-5 mr-1 text-primary" />{listing.beds}</span>
                <span className="flex items-center"><Bath className="w-5 h-5 mr-1 text-primary" />{listing.baths}</span>
                <span className="flex items-center"><RulerDimensionLine className="w-5 h-5 mr-1 text-primary" />{listing.area}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Explore;
