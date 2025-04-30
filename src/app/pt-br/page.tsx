"use client"; // Required for useRef and client-side effects

import { useRef } from 'react'; // Import useRef
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/HeroSection';
import HowItWorks from '../../components/HowItWorks';
import PhotoTutorial from '../../components/PhotoTutorial';
import Benefits from '../../components/Benefits';
import DocumentSelect from '../../components/DocumentSelect';
import FAQ from '../../components/FAQ';
import StickyCTA from '../../components/StickyCTA'; // Import the new component

export default function Home() {
  // Create a ref for the hero image (show trigger when it scrolls out of view)
  const heroImageRef = useRef<HTMLImageElement>(null);
  // Create a ref for the FAQ section (hide trigger)
  const faqRef = useRef<HTMLDivElement>(null);
  // Also keep the photoTutorialRef for compatibility with existing behavior
  const photoTutorialRef = useRef<HTMLElement>(null);

  return (
    <Layout>
      <HeroSection ref={heroImageRef} />
      <HowItWorks />
      {/* Keep the ref on PhotoTutorial for compatibility */}
      <PhotoTutorial ref={photoTutorialRef} />
      <Benefits />
      <DocumentSelect />
      {/* Wrap FAQ in a div and attach the faqRef */}
      <div ref={faqRef}>
        <FAQ />
      </div>
      {/* Render StickyCTA and pass heroImageRef as the triggerRef */}
      <StickyCTA triggerRef={heroImageRef} hideTriggerRef={faqRef} />
    </Layout>
  );
} 