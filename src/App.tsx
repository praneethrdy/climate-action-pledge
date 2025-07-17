import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { LiveKPIs } from './components/LiveKPIs';
import { WhyTakeAction } from './components/WhyTakeAction';
import { PledgeForm } from './components/PledgeForm';
import { CertificateModal } from './components/CertificateModal';
import { PledgeWall } from './components/PledgeWall';
import { Footer } from './components/Footer';
import { PledgeData } from './types';
import { initializeStorage } from './utils/storage';

function App() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentPledge, setCurrentPledge] = useState<PledgeData | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    initializeStorage();
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTakePledge = () => {
    const pledgeForm = document.getElementById('pledge-form');
    if (pledgeForm) {
      pledgeForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePledgeSubmitted = (pledge: PledgeData) => {
    setCurrentPledge(pledge);
    setShowCertificate(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection onTakePledge={handleTakePledge} />
      <LiveKPIs />
      <WhyTakeAction />
      <PledgeForm onPledgeSubmitted={handlePledgeSubmitted} />
      <PledgeWall />
      <Footer />

      {showCertificate && currentPledge && (
        <CertificateModal
          pledge={currentPledge}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;