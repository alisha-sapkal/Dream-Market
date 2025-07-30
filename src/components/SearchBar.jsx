import { Mic, Bell } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex flex-row sm:flex-row items-stretch sm:items-center gap-2 bg-white/80 rounded-full px-2 sm:px-3 py-2 shadow w-full">
      <select className="rounded-full border-none bg-white text-black font-semibold px-3 py-2 focus:outline-none w-full sm:w-auto">
        <option>property type</option>
        <option>Apartment</option>
        <option>House</option>
        <option>Commercial</option>
        <option>Land</option>
      </select>
      <input
        type="text"
        placeholder="Search..............."
        className="flex-1 px-2 py-2 bg-transparent text-black font-semibold focus:outline-none w-full sm:w-auto"
        value={value}
        onChange={onChange}
      />
      <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 mx-auto sm:mx-2">
        <Bell size={22} strokeWidth={2} className="text-black" />
      </span>
      <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 mx-auto">
        <Mic size={22} strokeWidth={2} className="text-black" />
      </span>
    </div>
  );
}