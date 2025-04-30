"use client"; // Required for useRef and client-side effects

import { useRef, useEffect, useState } from 'react'; // Import useRef
import Layout from '../../../components-foto-passaporte/layout/Layout';
import HeroSection from '../../../components-foto-passaporte/HeroSection';
import HowItWorks from '../../../components-foto-passaporte/HowItWorks';
import PhotoTutorial from '../../../components-foto-passaporte/PhotoTutorial';
import Benefits from '../../../components-foto-passaporte/Benefits';
import PassportGuide from '../../../components-foto-passaporte/PassportGuide';
import DocumentSelect from '../../../components-foto-passaporte/DocumentSelect';
import FAQ from '../../../components-foto-passaporte/FAQ';
import StickyCTA from '../../../components-foto-passaporte/StickyCTA'; // Import the new component
import LoadingOverlay from '../../../components/LoadingOverlay'; // Import LoadingOverlay
import { notFound } from 'next/navigation';
import { pageExists, productExists } from '../../../lib/supabase';

// Tipos para as páginas e produtos
interface Page {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

interface Product {
  id: string;
  pageId: string;
  slug: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export default function ProductPage({ 
  params 
}: { 
  params: { locale: string; product: string } 
}) {
  // Create a ref for the PhotoTutorial section (show trigger)
  const photoTutorialRef = useRef<HTMLElement>(null);
  // Create a ref for the FAQ section (hide trigger)
  const faqRef = useRef<HTMLDivElement>(null);
  
  const [isPageExists, setIsPageExists] = useState<boolean | null>(null);
  const [isProductExists, setIsProductExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se a página e o produto existem no Supabase
  useEffect(() => {
    async function checkPageAndProductExist() {
      setIsLoading(true);
      try {
        // Se for a página de foto-passaporte do Brasil, já sabemos que existe
        if (params.locale === 'pt-br' && params.product === 'foto-passaporte') {
          setIsPageExists(true);
          setIsProductExists(true);
          setIsLoading(false);
          return;
        }

        // Verificar se a página existe
        const pageExistsResult = await pageExists(params.locale);
        setIsPageExists(pageExistsResult);
        
        if (pageExistsResult) {
          // Verificar se o produto existe para esta página
          const productExistsResult = await productExists(params.locale, params.product);
          setIsProductExists(productExistsResult);
        } else {
          setIsProductExists(false);
        }
      } catch (error) {
        console.error('Erro ao verificar página/produto:', error);
        setIsPageExists(false);
        setIsProductExists(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkPageAndProductExist();
  }, [params.locale, params.product]);

  // Mostrar 404 se a página ou produto não existirem
  if (!isLoading && (isPageExists === false || isProductExists === false)) {
    notFound();
  }

  // Usar Loading Overlay em vez do texto "Carregando..."
  if (isLoading) {
    return <LoadingOverlay isLoading={true} />;
  }

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