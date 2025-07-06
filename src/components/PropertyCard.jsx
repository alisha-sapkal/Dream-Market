export default function PropertyCard({ image, type, price, address, details }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow p-4 flex flex-col gap-2 w-full max-w-xs mx-auto">
      <div className="w-full h-40 bg-gray-200 rounded-xl mb-2 overflow-hidden">
        <img src={image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'} alt="Property" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="text-xs bg-[#52B8B8] text-white px-3 py-1 rounded-full font-semibold">{type || 'Apartment'}</span>
        <span className="text-lg font-bold text-gray-800">{price || '$350,000'}</span>
      </div>
      <div className="text-gray-700 text-sm font-semibold">{address || '29, Pine Avenue, Kent, UK'}</div>
      <div className="text-gray-500 text-xs">{details || '2 Beds • 2 Baths • 78.5 m²'}</div>
    </div>
  );
} 