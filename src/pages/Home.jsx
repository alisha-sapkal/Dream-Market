"use client"

import { useState } from "react"
import HeroSection from "../components/Home/HeroSection"
import Offer from "../components/Home/Offer"
import Explore from "../components/Home/Explore"
import Listing from "../components/Home/Listing"
import Info from "../components/Home/Info"
import Map from "../components/Home/Map"
import MoreProperties from "../components/Home/MoreProperties"
import UpcomingProjects from "../components/Home/UpcomingProjects"
import NewsArticle from "../components/Home/NewsArticle"
import TopLinks from "../components/Home/TopLinks"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div className="flex flex-col gap-8">
      <HeroSection onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      <div id="offers">
        <Offer searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
      <div id="listings">
        <Listing searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
      <div id="explore">
        <Explore searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
      <div id="map">
        <Map />
      </div>
      <div id="more-properties">
        <MoreProperties searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
      <div id="upcoming-projects">
        <UpcomingProjects searchTerm={searchTerm} selectedCategory={selectedCategory} />
      </div>
      <div id="news-article">
        <NewsArticle />
      </div>
      <div id="top-links">
        <TopLinks />
      </div>
      <div id="info">
        <Info />
      </div>
    </div>
  )
}
