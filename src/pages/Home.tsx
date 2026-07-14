import Hero from '../components/Hero';
import Services from '../components/Services';
import MeetNotary from '../components/MeetNotary';
import Locations from '../components/Locations';
import Reviews from '../components/Reviews';

export default function Home() {
  // LocalBusiness/ProfessionalService schema lives in index.html (site-wide,
  // present on every route) so there is a single source of truth — do not
  // re-inject a second copy here.
  return (
    <>
      <Hero />
      <Services />
      <MeetNotary />
      <Locations />
      <Reviews />
    </>
  );
}
