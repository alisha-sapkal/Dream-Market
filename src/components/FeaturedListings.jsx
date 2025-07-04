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
    <section className="w-full px-4">
      <h2 className="text-xl font-bold mb-4">Browse Through Latest Listings from Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map(listing => (
          <div key={listing.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <div className="h-40 bg-gray-200 rounded mb-3 flex items-center justify-center">
              <span className="text-gray-400">[Image]</span>
            </div>
            <div className="flex-1">
              <div className="text-primary font-semibold mb-1">{listing.category}</div>
              <div className="text-lg font-bold mb-1">{listing.title}</div>
              <div className="text-gray-600 text-sm mb-2">{listing.address}</div>
              <div className="flex gap-2 text-xs text-gray-500 mb-2">
                <span>{listing.bedrooms} Bed</span>
                <span>{listing.bathrooms} Bath</span>
                <span>{listing.area}</span>
              </div>
              <div className="text-lg font-bold text-primary">{listing.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 