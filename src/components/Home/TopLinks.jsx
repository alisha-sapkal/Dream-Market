import React from "react";

const topLinks = [
  {
    title: "People Also Search For",
    links: [
      "Studio Apartments in Mumbai",
      "Resale Flats in Mumbai",
      "Ready to Move Flats in Mumbai",
      "Flats for Sale in Mumbai Without Brokerage Mumbai",
      "Duplex in Mumbai",
      "Resale House in Mumbai",
    ],
  },
  {
    title: "City Collections",
    links: [
      "Affordable Projects in Mumbai",
      "Townships in Mumbai",
      "Ready to Move Projects in Mumbai",
      "Properties for sale in Mumbai",
    ],
  },
  {
    title: "Filter Your Search",
    links: [
      "Penthouse in Mumbai",
      "Affordable House for sale in Mumbai",
      "House for sale without brokerage in Mumbai",
      "Rowhouse in Mumbai",
      "Under Construction Apartments in Mumbai",
    ],
  },
];

export default function TopLinks() {
  return (
    <section className="w-full bg-white rounded-2xl shadow-sm py-8 px-2 sm:px-6 md:px-12 my-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8">
        Browse top links to search your home
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 max-w-5xl mx-auto">
        {topLinks.map((col, idx) => (
          <div key={col.title} className="flex-1 min-w-[180px]">
            <h3 className="font-semibold text-base sm:text-lg mb-3 text-center md:text-left">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((link, i) => (
                <li key={i} className="text-gray-700 text-sm sm:text-base text-center md:text-left">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {/* Arrow button for desktop only */}
        <div className="hidden md:flex items-center justify-center">
          <button className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition">
            <span className="text-2xl text-gray-700">&#8594;</span>
          </button>
        </div>
      </div>
      {/* Arrow button for mobile, centered below columns */}
      <div className="flex md:hidden justify-center mt-6">
        <button className="bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition">
          <span className="text-2xl text-gray-700">&#8594;</span>
        </button>
      </div>
    </section>
  );
}