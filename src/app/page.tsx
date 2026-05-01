import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import HowItWorks from '@/components/sections/HowItWorks';
import ElectionProcessStory from '@/components/sections/ElectionProcessStory';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col">
        <HeroSection />
        <FeaturesGrid />
        <HowItWorks />
        <ElectionProcessStory />
        <CTASection />
      </div>
      <Footer />
    </>
  );
}
