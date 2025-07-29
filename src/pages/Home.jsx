import HeroSection from '../components/Home/HeroSection';
import Offer from '../components/Home/Offer';
import Explore from '../components/Home/Explore';
import Listing from '../components/Home/Listing';
import Info from '../components/Home/Info';
import Map from '../components/Home/Map';
import MoreProperties from '../components/Home/MoreProperties';
import UpcomingProjects from '../components/Home/UpcomingProjects';
import NewsArticle from '../components/Home/NewsArticle';
import TopLinks from '../components/Home/TopLinks';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <div id="offers"><Offer /></div>
      <div id="listings"><Listing /></div>
      <div id="explore"><Explore /></div>
      <div id="map"><Map /></div>
      <div id="more-properties"><MoreProperties/></div>
      <div id="upcoming-projects"><UpcomingProjects /></div>
      <div id="news-article"><NewsArticle /></div>
      <div id="top-links"><TopLinks /></div>
      <div id="info"><Info /></div>
    </div>
  );
}