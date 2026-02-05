import Header from '../components/LandingPageComponents/Header';
import Hero from '../components/LandingPageComponents/Hero';
import HowItWorks from '../components/LandingPageComponents/HowItWorks';
import AIFeatures from '../components/LandingPageComponents/AIFeatures';
import TargetAudience from '../components/LandingPageComponents/TargetAudience';
import KeyFeatures from '../components/LandingPageComponents/KeyFeatures';
import Pricing from '../components/LandingPageComponents/Pricing';
import WhySection from '../components/LandingPageComponents/WhySection';
import FinalCTA from '../components/LandingPageComponents/FinalCTA';
import ContactForm from '../components/LandingPageComponents/ContactForm';
import Footer from '../components/LandingPageComponents/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Hero />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <AIFeatures />
      <TargetAudience />
      <div id="features">
        <KeyFeatures />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <WhySection />
      <FinalCTA />
      <div id="contact-form">
      <ContactForm  />
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;