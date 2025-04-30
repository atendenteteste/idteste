"use client"; // Required for useRef and client-side effects

import { useRef, useEffect, useState } from 'react'; // Import useRef
import Layout from '../../components/layout/Layout';
import HeroSection from '../../components/HeroSection';
import HowItWorks from '../../components/HowItWorks';
import PhotoTutorial from '../../components/PhotoTutorial';
import Benefits from '../../components/Benefits';
import DocumentSelect from '../../components/DocumentSelect';
import FAQ from '../../components/FAQ';
import StickyCTA from '../../components/StickyCTA'; // Import the new component
import LoadingOverlay from '../../components/LoadingOverlay'; // Import LoadingOverlay
import { notFound } from 'next/navigation';
import { pageExists } from '../../lib/supabase';

// Tipo para as páginas
interface Page {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export default function LocalePage({ params }: any) {
  // Create a ref for the hero image (show trigger when it scrolls out of view)
  const heroImageRef = useRef<HTMLImageElement>(null);
  // Create a ref for the FAQ section (hide trigger)
  const faqRef = useRef<HTMLDivElement>(null);
  // Also keep the photoTutorialRef for compatibility with existing behavior
  const photoTutorialRef = useRef<HTMLElement>(null);
  
  const [isPageExists, setIsPageExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se a página existe no Supabase
  useEffect(() => {
    async function checkPageExists() {
      setIsLoading(true);
      try {
        // Se o locale for pt-br, já sabemos que existe
        if (params.locale === 'pt-br') {
          setIsPageExists(true);
          return;
        }

        // Verificar se a página existe no Supabase
        const exists = await pageExists(params.locale);
        setIsPageExists(exists);
      } catch (error) {
        console.error('Erro ao verificar página:', error);
        setIsPageExists(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPageExists();
  }, [params.locale]);

  // Mostrar 404 se a página não existir
  if (!isLoading && isPageExists === false) {
    notFound();
  }

  // Usar Layout com Loading Overlay em vez de texto "Carregando..."
  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

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