"use client"; // Required for useRef and client-side effects

import { useRef } from 'react'; // Import useRef
import Layout from '../../components-foto-passaporte/layout/Layout';
import HeroSection from '../../components-foto-passaporte/HeroSection';
import HowItWorks from '../../components-foto-passaporte/HowItWorks';
import PhotoTutorial from '../../components-foto-passaporte/PhotoTutorial';
import Benefits from '../../components-foto-passaporte/Benefits';
import PassportGuide from '../../components-foto-passaporte/PassportGuide';
import DocumentSelect from '../../components-foto-passaporte/DocumentSelect';
import FAQ from '../../components-foto-passaporte/FAQ';
import StickyCTA from '../../components-foto-passaporte/StickyCTA'; // Import the new component

export default function FotoPassaporte() {
  // Create a ref for the PhotoTutorial section (show trigger)
  const photoTutorialRef = useRef<HTMLElement>(null);
  // Create a ref for the FAQ section (hide trigger)
  const faqRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      {/* Pass the ref to the PhotoTutorial component */}
      <PhotoTutorial ref={photoTutorialRef} />
      {/* Benefits no longer needs the ref */}
      <Benefits />
      <PassportGuide />
      <DocumentSelect />
      {/* Wrap FAQ in a div and attach the faqRef */}
      <div ref={faqRef}>
        <FAQ />
      </div>
      {/* Render StickyCTA and pass both refs */}
      <StickyCTA triggerRef={photoTutorialRef} hideTriggerRef={faqRef} />
    </Layout>
  );
} 