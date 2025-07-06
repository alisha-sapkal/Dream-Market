import HeroSection from '../components/HeroSection';
import Offer from '../components/Offer';
import Explore from '../components/Explore';
import Listing from '../components/Listing';
import Info from '../components/Info';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <div id="offers"><Offer /></div>
      <div id="explore"><Explore /></div>
      <div id="listings"><Listing /></div>
      <div id="info"><Info /></div>
    </div>
  );
} 