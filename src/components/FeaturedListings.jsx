const listings = [
  {
    id: 1,
    title: 'Modern Condo',
    price: '$350,000',
    address: '29, Pine Avenue, Kent, UK',
    category: 'Apartment',
    image: '',
    bedrooms: 2,
    bathrooms: 2,
    area: '78.5 m2',
  },
  {
    id: 2,
    title: 'Charming Historic Home',
    price: '$450,000',
    address: '68, McLewin, London, UK',
    category: 'House',
    image: '',
    bedrooms: 3,
    bathrooms: 2,
    area: '120 m2',
  },
  {
    id: 3,
    title: 'Cozy Cottage Views',
    price: '$300,000',
    address: '203 Evy Street, Suite 4, Westminster',
    category: 'Duplex',
    image: '',
    bedrooms: 2,
    bathrooms: 1,
    area: '90 m2',
  },
];

export default function FeaturedListings() {
  return (
    <section className="w-full px-2 sm:px-4 md:px-8 py-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Browse Through Latest Listings from Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-lg shadow p-3 sm:p-4 flex flex-col w-full min-w-0">
            <div className="h-32 sm:h-40 bg-gray-200 rounded mb-3 flex items-center justify-center overflow-hidden">
              <img src={listing.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'} alt={listing.title} className="w-full h-full object-cover rounded" />
            </div>
            <div className="flex-1 text-start">
              <div className="text-primary font-semibold mb-1 text-xs sm:text-sm">{listing.category}</div>
              <div className="text-base sm:text-lg font-bold mb-1">{listing.title}</div>
              <div className="text-gray-600 text-xs sm:text-sm mb-2">{listing.address}</div>
              <div className="flex gap-2 text-xs text-gray-500 mb-2 flex-wrap">
                <span>{listing.bedrooms} Bed</span>
                <span>{listing.bathrooms} Bath</span>
                <span>{listing.area}</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-primary">{listing.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 