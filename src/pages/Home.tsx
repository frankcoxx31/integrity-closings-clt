import Hero from '../components/Hero';
import Services from '../components/Services';
import MeetNotary from '../components/MeetNotary';
import Locations from '../components/Locations';
import Reviews from '../components/Reviews';

export default function Home() {
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
