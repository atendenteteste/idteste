"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';

// Define props type if you need other props besides the ref
// type BenefitsProps = { /* other props if needed */ };

// Use React.forwardRef to allow passing a ref to the underlying section element
const Benefits = React.forwardRef<HTMLElement /* Ref element type */>(
  (props, ref) => { // props is the first argument, ref is the second
    // Get the current locale from the URL
    const params = useParams();
    const locale = params?.locale as string || 'pt-br';
    
    // State to track if content is fully ready
    const [contentReady, setContentReady] = useState(false);
    
    // Get customized content based on the current locale
    const { content, loading } = usePageContent(locale);
    
    // Get Benefits content with fallback to default values
    const benefitsContent = content.Benefits || {
      sectionTitle: 'Principais benefícios de usar<br />nossa ferramenta de foto<br />para passaporte',
      sectionDescription: 'Fique à vontade em casa, pegue seu celular e tire algumas fotos. Termine com um resultado com o qual você esteja 100% satisfeito!',
      benefit1Title: 'Independência',
      benefit1Description: 'Não há necessidade de dirigir ou esperar na fila. Tire uma boa onde quer que você esteja, usando apenas seu telefone.',
      benefit2Title: 'Serviço confiável',
      benefit2Description: 'Mais de um milhão de usuários em todo o mundo. Fotos para passaporte e milhões de documentos gerados no TrustPilot.',
      benefit3Title: 'Suporte profissional',
      benefit3Description: 'Perguntas ou dúvidas sobre suas fotos? Nossos especialistas em fotografia e agentes de suporte estão prontos em ajudá-lo.',
      benefit4Title: 'Garantia de aceitação',
      benefit4Description: 'Depois que você fizer o pedido, nossa IA e um especialista humano verificarão sua foto para garantir que ela esteja 100% em conformidade.',
      advantagesTitle: 'Vantagens de usar a PhotoID',
      advantagesDescription: 'Nós verificamos e garantimos que ela passe em todos os testes de conformidade.',
      advantage1Title: 'Foto em',
      advantage1Subtitle: '3 segundos',
      advantage1Description: 'Tire sua foto em casa, sem esperar em filas ou se locomover até o local.',
      advantage2Title: 'Serviço',
      advantage2Subtitle: 'profissional',
      advantage2Description: 'Tecnologia IA + feedback instantâneo e profissional.',
      advantage3Title: '100% em',
      advantage3Subtitle: 'confirmidade',
      advantage3Description: 'Garante que sua foto será aceita conforme diretrizes e legislação.'
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
    
    return (
      // Pass the ref to the root section element
      <section ref={ref} className="py-16 bg-white font-montserrat">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* First section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* Left side - Main image */}
            <div className="relative pl-4 flex justify-center items-center md:block">
              <div className="w-4/5 mx-auto">
                <Image 
                  src="/images/imgb1.png" 
                  alt="Benefícios da ferramenta" 
                  width={400} 
                  height={400} 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Right side - Benefits information */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              {/* Title and description */}
              <h2 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: benefitsContent.sectionTitle }}></h2>
              
              {/* Purple separator */}
              <div className="w-32 h-1 bg-purple-600 mb-4"></div>
              
              <p className="text-gray-700 text-lg mb-8">
                {benefitsContent.sectionDescription}
              </p>
              
              {/* Benefits grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-8 mx-auto w-full max-w-[95%] sm:max-w-full">
                {/* Benefit 1 */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="mb-2 sm:mb-3 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                    <Image 
                      src="/images/independenciaico.png" 
                      alt="Independência" 
                      width={50} 
                      height={50} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{benefitsContent.benefit1Title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {benefitsContent.benefit1Description}
                  </p>
                </div>
                
                {/* Benefit 2 */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="mb-2 sm:mb-3 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                    <Image 
                      src="/images/serviçoconfiavelico.png" 
                      alt="Serviço confiável" 
                      width={50} 
                      height={50} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{benefitsContent.benefit2Title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {benefitsContent.benefit2Description}
                  </p>
                </div>
                
                {/* Benefit 3 */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="mb-2 sm:mb-3 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                    <Image 
                      src="/images/suporteprofissionalico.png" 
                      alt="Suporte profissional" 
                      width={50} 
                      height={50} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{benefitsContent.benefit3Title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {benefitsContent.benefit3Description}
                  </p>
                </div>
                
                {/* Benefit 4 */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="mb-2 sm:mb-3 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                    <Image 
                      src="/images/aceitaçãoico.png" 
                      alt="Garantia de aceitação" 
                      width={50} 
                      height={50} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-1">{benefitsContent.benefit4Title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {benefitsContent.benefit4Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second section */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="text-3xl font-bold mb-4">{benefitsContent.advantagesTitle}</h2>
            <p className="text-gray-600 mb-8">
              {benefitsContent.advantagesDescription}
            </p>
            
            {/* Three images in a row with text overlays */}
            <div className="flex flex-row justify-between space-x-2 w-full md:w-[90%] mx-auto overflow-x-auto pb-4">
              {/* First advantage card */}
              <div className="relative rounded-lg overflow-hidden flex-1 min-w-[30%] max-w-[32%]">
                <Image 
                  src="/images/vant1.png" 
                  alt="Foto em 3 segundos" 
                  width={400} 
                  height={450} 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white w-full">
                  <h3 className="font-bold mb-0 text-[0.65rem] md:text-base leading-tight text-left">{benefitsContent.advantage1Title}</h3>
                  <h3 className="font-bold text-[0.9rem] md:text-3xl leading-tight text-left">{benefitsContent.advantage1Subtitle}</h3>
                  <div className="w-7 h-[1px] bg-purple-600 my-1 md:w-12 md:h-0.5 md:my-2"></div>
                  <p className="text-[0.55rem] md:text-sm leading-tight text-left">
                    {benefitsContent.advantage1Description}
                  </p>
                </div>
              </div>
              
              {/* Second advantage card */}
              <div className="relative rounded-lg overflow-hidden flex-1 min-w-[30%] max-w-[32%]">
                <Image 
                  src="/images/vant2.png" 
                  alt="Serviço profissional" 
                  width={400} 
                  height={450} 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white w-full">
                  <h3 className="font-bold mb-0 text-[0.65rem] md:text-base leading-tight text-left">{benefitsContent.advantage2Title}</h3>
                  <h3 className="font-bold text-[0.9rem] md:text-3xl leading-tight text-left">{benefitsContent.advantage2Subtitle}</h3>
                  <div className="w-7 h-[1px] bg-purple-600 my-1 md:w-12 md:h-0.5 md:my-2"></div>
                  <p className="text-[0.55rem] md:text-sm leading-tight text-left">
                    {benefitsContent.advantage2Description}
                  </p>
                </div>
              </div>
              
              {/* Third advantage card */}
              <div className="relative rounded-lg overflow-hidden flex-1 min-w-[30%] max-w-[32%]">
                <Image 
                  src="/images/vant3.png" 
                  alt="100% em confirmidade" 
                  width={400} 
                  height={450} 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 p-2 md:p-6 text-white w-full">
                  <h3 className="font-bold mb-0 text-[0.65rem] md:text-base leading-tight text-left">{benefitsContent.advantage3Title}</h3>
                  <h3 className="font-bold text-[0.9rem] md:text-3xl leading-tight text-left">{benefitsContent.advantage3Subtitle}</h3>
                  <div className="w-7 h-[1px] bg-purple-600 my-1 md:w-12 md:h-0.5 md:my-2"></div>
                  <p className="text-[0.55rem] md:text-sm leading-tight text-left">
                    {benefitsContent.advantage3Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Benefits.displayName = 'Benefits'; // Set display name for DevTools

export default Benefits; // Export the wrapped component 