"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';

export default function HowItWorks() {
  // Get the current locale from the URL
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  
  // State to track if content is fully ready
  const [contentReady, setContentReady] = useState(false);
  
  // Get customized content based on the current locale
  const { content, loading } = usePageContent(locale);
  
  // Get HowItWorks content with fallback to default values
  const howItWorksContent = content.HowItWorks || {
    sectionTitle: 'Como funciona o PhotoID',
    sectionSubtitle: 'Tire a foto biométrica perfeita para passaporte em menos de 30 segundos!',
    step1Title: 'Tire ou carregue uma foto',
    step1Description: 'Use uma foto que você já tem ou tire uma nova. Nós verificaremos e garantimos que ela passe em todos os testes de conformidade.',
    step2Title: 'Ajustamos a sua foto com IA',
    step2Description: 'Nosso sistema de IA cortará, redimensionará e ajustará o fundo da sua imagem.',
    step3Title: 'Verificação especializada',
    step3Description: 'Nossa IA analisará cuidadosamente sua foto de passaporte, fornecendo feedback em menos de um minuto!'
  };
  
  // Set content as ready when loading is complete
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  const steps = [
    {
      id: 1,
      title: howItWorksContent.step1Title,
      description: howItWorksContent.step1Description,
      icon: 'howitworks1',
    },
    {
      id: 2,
      title: howItWorksContent.step2Title,
      description: howItWorksContent.step2Description,
      icon: 'howitworks2',
    },
    {
      id: 3,
      title: howItWorksContent.step3Title,
      description: howItWorksContent.step3Description,
      icon: 'howitworks3',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{howItWorksContent.sectionTitle}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {howItWorksContent.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center">
                  {step.id === 1 && (
                    <Image 
                      src={`/images/${step.icon}.png`} 
                      alt={step.title} 
                      width={130} 
                      height={130} 
                      className="w-auto h-auto"
                      style={{ transform: 'scale(1.61)' }}
                    />
                  )}
                  {step.id === 2 && (
                    <Image 
                      src={`/images/${step.icon}.png`} 
                      alt={step.title} 
                      width={130} 
                      height={130} 
                      className="w-auto h-auto"
                      style={{ transform: 'scale(1.4)', marginTop: '-15px' }}
                    />
                  )}
                  {step.id === 3 && (
                    <div className="ml-[-15px]">
                      <Image 
                        src={`/images/${step.icon}.png`} 
                        alt={step.title} 
                        width={130} 
                        height={130} 
                        className="w-auto h-auto"
                        style={{ transform: 'scale(1.61)' }}
                      />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 