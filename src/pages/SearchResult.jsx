import PropertyCards from '../components/SearchProperties/PropertyCards';
import PropertyResults from '../components/SearchProperties/PropertyResults';

export default function SearchResult() {
  return (
    <div className="min-h-screen flex flex-col gap-8 py-8 px-2 md:px-8 bg-gray-50">
      <PropertyResults />
      <PropertyCards/>
    </div>
  );
} 