export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-8 w-full text-xs sm:text-sm">
      <div className="px-4 flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center w-full">
        <div className="mb-2 sm:mb-0">&copy; 2024 Dwello®</div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <a href="#" className="hover:text-primary">Home</a>
          <a href="#" className="hover:text-primary">Offers</a>
          <a href="#" className="hover:text-primary">Explore</a>
          <a href="#" className="hover:text-primary">Listings</a>
          <a href="#" className="hover:text-primary">Info</a>
        </div>
        <div className="text-[10px] sm:text-xs text-gray-400">Template by Plaiter 💚</div>
      </div>
    </footer>
  );
} 