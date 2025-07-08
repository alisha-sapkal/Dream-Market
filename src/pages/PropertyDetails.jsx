import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveLeft, MapPin, ChevronRight, Heart } from "lucide-react";
import { BedDouble, Bath, RulerDimensionLine } from "lucide-react";

const sampleProperty = {
  title: "Modern Condo",
  price: "$350,000",
  address: "29, Pine Avenue, Kent, UK",
  type: "Apartment",
  rentOrSale: "Rent",
  location: "Manchester, Kent, UK",
  bathroom: "2",
  bedroom: "4+",
  size: "6x78.5 m2",
  description: `This property is mostly wooded and sits high on a hilltop overlooking the Mohawk River Valley. Located right in the heart of Upstate NYs Amish farm Country, this land is certified organic making it extremely rare! Good road frontage on a paved county road with utilities make it an amazing setting for your dream country getaway! If you like views, you must see this property!

Mckinley Hill is situated inside Fort Bonifacio which is a 50 hectares owned by Megaworld. Mckinley Hill is Said to be the Biggest and Grandest Development in Metro manila as of Today. what's nice about Mckinley Hill this whole 50 hectare is a Master.`,
  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
  ],
  interior:
    "Gym/Exercise Room, Spa Room, Game Room, Breakfast Nook, Sauna, Basement, Wet Bar",
  outdoor:
    "Patio, Outdoor Fireplace, Gazebo, Outdoor Dining Area, Pergola, Garden Pathways, Outdoor Barbecue",
  utilities:
    "Central Air, Electricity, Heating, Natural Gas, Ventilation, Water",
  features:
    "Chair Accessible, Elevator, Fireplace, Smoke detectors, Washer and dryer, WiFi",
  map: "51.5074,-0.1278",
  agent: {
    name: "Samuel Wright",
    company: "Evergreen Estates",
    email: "samuel.wright@evergreenestates.com",
    phone: "(111) 123-4567",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    about:
      "Samuel Wright's expertise in Property Management, Real Estate Appraising, and Real Estate Development allows him to offer comprehensive services to his clients. His analytical skills and proactive approach ensure that every project is executed flawlessly.",
    specialities:
      "Property Management, Real Estate Appraising, Real Estate Development",
    serviceArea: "Manchester, Kent, UK",
    officeAddress: "456 Pine Avenue, Suite 700, Kent, UK",
  },
};

const similarProperties = [
  {
    id: 101,
    title: "Modern Family Home",
    location: "Uptown, New York",
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    beds: 4,
    baths: 3,
    area: "2500 sqft",
    type: "House",
    category: "Family",
    price: "$1,200,000",
  },
  {
    id: 102,
    title: "Luxury Condo",
    location: "Downtown, New York",
    image:
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80",
    beds: 2,
    baths: 2,
    area: "1200 sqft",
    type: "Condo",
    category: "Luxury",
    price: "$950,000",
  },
  {
    id: 103,
    title: "Cozy Suburban House",
    location: "Suburbia, New York",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    beds: 3,
    baths: 2,
    area: "1800 sqft",
    type: "House",
    category: "Suburban",
    price: "$850,000",
  },
];

function getInitialLiked() {
  const favs = (
    JSON.parse(localStorage.getItem("favourites") || "[]") || []
  ).filter(Boolean);
  return similarProperties.map((p) =>
    favs.some((fav) => fav && fav.id === p.id)
  );
}

function updateFavourites(property, liked) {
  let favs = (
    JSON.parse(localStorage.getItem("favourites") || "[]") || []
  ).filter(Boolean);
  if (!liked) {
    if (!favs.some((fav) => fav && fav.id === property.id)) {
      favs.push(property);
    }
  } else {
    favs = favs.filter((fav) => fav && fav.id !== property.id);
  }
  localStorage.setItem("favourites", JSON.stringify(favs));
  window.dispatchEvent(new Event("favouritesUpdated"));
}

export default function PropertyDetails() {
  const [liked, setLiked] = useState(getInitialLiked());
  const p = sampleProperty;
  const navigate = useNavigate();

  useEffect(() => {
    setLiked(getInitialLiked());
    const handler = () => setLiked(getInitialLiked());
    window.addEventListener("favouritesUpdated", handler);
    return () => window.removeEventListener("favouritesUpdated", handler);
  }, []);

  const toggleLike = (idx) => {
    setLiked((liked) => {
      const newLiked = liked.map((v, i) => (i === idx ? !v : v));
      updateFavourites(similarProperties[idx], liked[idx]);
      return newLiked;
    });
  };

  return (
    <div className="w-full bg-white rounded-2xl">
      <div className="max-w-6xl flex flex-col gap-8">
        <div
          onClick={() => navigate("/search-result")}
          className="flex flex-row items-start cursor-pointer p-2 w-fit"
        >
          <MoveLeft className="mb-1 text-gray-500" />
          <button className="text-sm text-gray-500">
            Back to search results
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-6 w-full">
          <div className="md:w-1/2 flex-shrink-0">
            <img
              src={p.images[0]}
              alt="Main Property"
              className="rounded-xl object-cover w-full h-72 md:h-96 mb-2"
            />
          </div>
          <div className="w-full md:w-3/5 flex-shrink-0">
            <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full h-72 md:h-96">
              {p.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="w-full h-full aspect-square overflow-hidden rounded-xl"
                >
                  <img
                    src={img}
                    alt={`Property ${i + 2}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 w-full md:justify-between">
          <div className="flex flex-col gap-2 flex-grow w-full self-start">
            <div className="flex gap-2 text-xs mb-2">
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {p.rentOrSale}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {p.type}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {p.location}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <h2 className="text-3xl items-start font-semibold mb-1">
                {p.title}
              </h2>
              <div className="text-xl font-semibold text-primary mb-2">
                {p.price}
              </div>
            </div>
            <div className="flex flex-row gap-4 text-xs mb-2">
              <div className="text-gray-600 mb-2 flex lex-row gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                {p.address}
              </div>
              <span className="flex flex-row gap-2">
                <Bath className="w-5 h-5 text-primary" /> {p.bathroom}
              </span>
              <span className="flex flex-row gap-2">
                <BedDouble className="w-5 h-5 text-primary" /> {p.bedroom}
              </span>
              <span className="flex flex-row gap-2">
                <RulerDimensionLine className="w-5 h-5 text-primary" /> {p.size}
              </span>
            </div>
            <div className="mb-2 flex flex-col items-start">
              <h4 className="font-semibold text-sm mb-1 py-2">Description</h4>
              {p.description.split(/\n\n+/).map((para, idx) => (
                <p key={idx} className="text-sm text-gray-700 mb-2 text-left">
                  {para}
                </p>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[32rem] md:max-w-xl items-end">
            <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-start">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
                alt="Agent House"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="flex flex-col border-1 border-gray-100 rounded-xl w-full p-2">
                <div className="flex flex-row items-center border-1 border-gray-100 rounded-full gap-2 mb-2 px-2 py-1 mt-2 item">
                  <img
                    src={p.agent.profileImage}
                    alt={p.agent.name}
                    className="w-6 h-6 rounded-full ml-2"
                  />
                  <span className="text-sm text-gray-700">{p.location}</span>
                </div>
                <div className="font-semibold text-lg text-start text-gray-800 mb-2">
                  {p.agent.name}
                </div>
              </div>

              <button
                className="group w-full flex flex-row justify-between mt-2 px-4 py-2 bg-primary text-black rounded-2xl shadow hover:bg-black hover:text-white transition"
                onClick={() => {}}
              >
                <span>View Listings</span>
                <ChevronRight className="mb-1 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-sm text-start items-start font-medium">
            Amenities & Features
          </h2>
          <div className="flex flex-row justify-between gap-16">
            <div className="mb-2">
              <h4 className="font-semibold text-sm mb-1">Interior Details</h4>
              <ul className="list-none text-xs text-gray-700">
                {p.interior.split(",").map((item, idx) => (
                  <li key={idx} className="text-start py-1">
                    - {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-sm mb-1">Outdoor Details</h4>
              <ul className="list-none text-xs text-gray-700">
                {p.outdoor.split(",").map((item, idx) => (
                  <li key={idx} className="text-start py-1">
                    - {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-sm mb-1">Utilities</h4>
              <ul className="list-none text-xs text-gray-700">
                {p.utilities.split(",").map((item, idx) => (
                  <li key={idx} className="text-start py-1">
                    - {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold text-sm mb-1">Other Features</h4>
              <ul className="list-none text-xs text-gray-700">
                {p.features.split(",").map((item, idx) => (
                  <li key={idx} className="text-start py-1">
                    - {item.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mb-2 py-4">
            <h4 className="font-semibold text-start text-md mb-1">Map</h4>
            <div className="w-full h-90 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center">
              <iframe
                title="Property Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  p.address
                )}&output=embed`}
              ></iframe>
            </div>
          </div>
          <div className="mt-">
            <h2 className="text-lg font-semibold text-start mb-4">
              Similar Properties
            </h2>
            <div className="flex flex-row gap-8 overflow-x-auto py-4">
              {similarProperties.map((prop, idx) => (
                <div
                  key={prop.id}
                  className="group min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300"
                >
                  <div className="relative">
                    <img
                      src={prop.image}
                      className="h-44 sm:h-52 md:h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-1 sm:gap-2">
                      <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                        {prop.type}
                      </span>
                      <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                        {prop.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/40 backdrop-blur-xs rounded-full p-2 shadow flex items-center justify-center">
                        <Heart
                          onClick={() => toggleLike(idx)}
                          fill={liked[idx] ? "#ef4444" : "none"}
                          className="text-white/40"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between p-2">
                    <div className="flex items-center gap-2 bg-white/90 rounded-full px-3 py-1 shadow mt-2 mb-2 w-fit">
                      <img
                        src={prop.image}
                        alt="thumb"
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-700 font-medium">
                        +4 Images
                      </span>
                    </div>
                    <div className="text-primary text-base mb-2 p-2">
                      {prop.price}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-4 text-start">
                    <h3 className="text-lg font-bold mb-1 text-gray-900">
                      {prop.title}
                    </h3>
                    <p className="text-gray-700 text-xs mb-2">
                      {prop.location}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600 text-xs mt-auto">
                      <span className="flex items-center">
                        <BedDouble className="w-5 h-5 mr-1 text-primary" />
                        {prop.beds}
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-5 h-5 mr-1 text-primary" />
                        {prop.baths}
                      </span>
                      <span className="flex items-center">
                        <RulerDimensionLine className="w-5 h-5 mr-1 text-primary" />
                        {prop.area}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
