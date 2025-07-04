import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import Offer from '../components/Offer';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <Offer/>
      <FeaturedListings />
    </div>
  );
} 