import HeroSection from '../components/HeroSection';
import FeaturedListings from '../components/FeaturedListings';
import Offer from '../components/Offer';
import Explore from '../components/Explore';
import Listing from '../components/Listing';

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <HeroSection />
      <Offer />
      <Explore />
      <Listing />
      <FeaturedListings />
    </div>
  );
} 