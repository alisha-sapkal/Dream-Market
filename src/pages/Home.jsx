import HeroSection from '../components/HeroSection';
import Offer from '../components/Offer';
import Explore from '../components/Explore';
import Listing from '../components/Listing';
import Info from '../components/Info';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <Offer />
      <Explore />
      <Listing />
      <Info />
    </div>
  );
} 