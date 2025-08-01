import { Mic, Search } from "lucide-react";

export default function SearchBar({ value, onChange, onSearchClick }) {
  return (
    <div className="flex flex-row sm:flex-row items-stretch gap-2 sm:gap-3 backdrop-blur-md rounded-2xl p-3 sm:px-2 sm:py-3 shadow">
      <div className="flex flex-row items-stretch gap-2 sm:gap-3 w-3/5 sm:w-full">
        <select className="rounded-full border-none text-black font-semibold py-2 px-2 sm:px-3 focus:outline-none 
                           w-1/2 sm:max-w-[150px] sm:flex-shrink-0
                           text-sm sm:text-base
                           flex-shrink-0">
          <option>Property Type</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Commercial</option>
          <option>Land</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="py-2 px-2 sm:px-3 bg-transparent text-black font-semibold focus:outline-none 
                     w-1/2 sm:flex-1 sm:max-w-[150px] sm:w-auto
                     text-md sm:text-base 
                     min-h-[44px]
                     placeholder:text-gray-600 placeholder:text-sm sm:placeholder:text-base"
          value={value}
          onChange={onChange}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          inputMode="search"
        />
      </div>

      <div className="flex flex-row gap-3 items-center justify-center sm:justify-end 
                      sm:w-auto sm:flex-shrink-0 sm:gap-2">
        <button 
          type="button"
          onClick={onSearchClick}
          className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full border border-gray-300 hover:scale-110 focus:outline-none transition-transform"
          aria-label="Search"
        >
          <Search size={24} className="sm:w-5 sm:h-5 text-black" strokeWidth={2} />
        </button>
        <button 
          type="button"
          className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full border border-gray-300 hover:scale-110 focus:outline-none transition-transform"
          aria-label="Voice search"
        >
          <Mic size={24} className="sm:w-5 sm:h-5 text-black" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

