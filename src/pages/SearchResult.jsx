import PropertyCards from '../components/SearchProperties/PropertyCards';
import PropertyResults from '../components/SearchProperties/PropertyResults';
import { useState } from 'react';
import { properties } from '../components/SearchProperties/PropertyCards';

export default function SearchResult() {
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    category: '',
    bedroom: ''
  });
  const [filtered, setFiltered] = useState(properties);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setFiltered(
      properties.filter(
        (p) =>
          (!newFilters.type || p.type === newFilters.type) &&
          (!newFilters.category || p.category === newFilters.category) &&
          (!newFilters.bedroom || p.bedroom === newFilters.bedroom) &&
          (!newFilters.location || p.address.toLowerCase().includes(newFilters.location.toLowerCase())) &&
          (!newFilters.keywords ||
            [p.title, p.description, p.address]
              .filter(Boolean)
              .some(field => field.toLowerCase().includes(newFilters.keywords.toLowerCase()))
          )
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 py-8 px-2 md:px-8 bg-gray-50">
      <PropertyResults filters={filters} onSearch={handleSearch} count={filtered.length} />
      {filtered.length === 0 && (
        <div className="w-full text-center text-lg text-gray-500 bg-white/70 rounded-xl py-8 shadow">
          No properties found matching your search.
        </div>
      )}
      <PropertyCards properties={filtered} />
    </div>
  );
} 