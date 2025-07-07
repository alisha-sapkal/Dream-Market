import { useEffect, useState } from 'react';
import { BedDouble, Bath, RulerDimensionLine, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

function removeFromFavourites(propertyId) {
  let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
  favs = favs.filter(fav => fav.id !== propertyId);
  localStorage.setItem('favourites', JSON.stringify(favs));
  window.dispatchEvent(new Event('favouritesUpdated'));
}

export default function Favourite() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const updateFavs = () => {
      const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      setFavourites(favs);
    };
    updateFavs();
    window.addEventListener('favouritesUpdated', updateFavs);
    return () => window.removeEventListener('favouritesUpdated', updateFavs);
  }, []);

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto">
      {favourites.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white/80 rounded-2xl shadow p-8 flex flex-col items-center max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Favourites will appear here</h2>
            <p className="text-gray-400 mb-4 text-center">Add properties to bookmarks to have them appear here</p>
            <Link to="/search-result" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition">See Properties</Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favourites.map((property) => (
            <div
              key={property.id}
              className="group rounded-2xl bg-white/30 backdrop-blur-md shadow-lg overflow-hidden flex flex-col transition-transform duration-300 w-full min-w-0"
            >
              <div className="relative">
                <img
                  src={property.image}
                  className="h-44 sm:h-52 md:h-56 w-full object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex gap-1 sm:gap-2">
                  <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                    {property.type}
                  </span>
                  <span className="bg-primary text-white text-[10px] sm:text-xs font-semibold uppercase rounded-full px-2 sm:px-3 py-0.5 sm:py-1 shadow">
                    {property.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <Heart
                    className="w-6 h-6 fill-red-500 text-red-500 cursor-pointer"
                    strokeWidth={2.5}
                    fill={'#ef4444'}
                    onClick={() => removeFromFavourites(property.id)}
                    title="Remove from favourites"
                  />
                </div>
              </div>
              <div className="flex justify-around mt-2 items-center px-2 sm:px-3">
                <div className="flex items-center gap-1 mr-auto border border-gray-200 rounded-full p-1">
                  <img
                    src={property.image}
                    alt="thumb"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="text-xs text-gray-500 font-medium">
                    +4 Images
                  </span>
                </div>
                <span className="text-primary text-sm sm:text-base md:text-md font-semibold uppercase px-2 sm:px-3 py-1">
                  {property.price}
                </span>
              </div>
              <div className="flex-1 flex flex-col p-3 sm:p-4 text-start">
                <h3 className="text-base sm:text-lg font-bold mb-1 text-gray-900">
                  {property.title}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm mb-2">
                  {property.address}
                </p>
                <div className="flex items-center gap-2 sm:gap-4 text-gray-600 text-xs mb-4">
                  <span className="flex items-center">
                    <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                    {property.beds}
                  </span>
                  <span className="flex items-center">
                    <Bath className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                    {property.baths}
                  </span>
                  <span className="flex items-center">
                    <RulerDimensionLine className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-primary" />
                    {property.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
} 