import HeroSection from '../components/Home/HeroSection';
import Offer from '../components/Home/Offer';
import Explore from '../components/Home/Explore';
import Listing from '../components/Home/Listing';
import Info from '../components/Home/Info';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <div id="offers"><Offer /></div>
      <div id="listings"><Listing /></div>
      <div id="explore"><Explore /></div>
      <div id="info"><Info /></div>
    </div>
  );
} 