export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-8 w-full">
      <div className="px-4 flex flex-col md:flex-row justify-between items-center w-full">
        <div className="mb-2 md:mb-0">&copy; 2024 Dwello®</div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-primary">Home</a>
          <a href="#" className="hover:text-primary">Offers</a>
          <a href="#" className="hover:text-primary">Explore</a>
          <a href="#" className="hover:text-primary">Listings</a>
          <a href="#" className="hover:text-primary">Info</a>
        </div>
        <div className="text-xs text-gray-400">Template by Plaiter 💚</div>
      </div>
    </footer>
  );
} 