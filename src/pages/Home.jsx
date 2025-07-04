import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import Offer from '../components/Offer';
import Explore from '../components/Explore';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <Offer />
      <Explore />
      <FeaturedListings />
    </div>
  );
} 