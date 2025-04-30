"use client"

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProductContent } from '../lib/hooks';

// Define props type if you need other props besides the ref
// type BenefitsProps = { /* other props if needed */ };

// Use React.forwardRef to allow passing a ref to the underlying section element
const Benefits = React.forwardRef<HTMLElement /* Ref element type */>(
  (props, ref) => { // props is the first argument, ref is the second
    // Get the current locale and product from the URL
    const params = useParams();
    const locale = params?.locale as string || 'pt-br';
    const product = params?.product as string || 'foto-passaporte';
    
    // State to track if content is fully ready
    const [contentReady, setContentReady] = useState(false);
    
    // Get customized content based on the current product
    const { content, loading } = useProductContent(product);
    
    // Get Benefits content with fallback to default values
    const benefitsContent = content.Benefits || {
      sectionTitle: 'Fotos para o passaporte Brasileiro',
      sectionDescription: 'Para solicitar um passaporte brasileiro, a foto deve atender aos seguintes requisitos:',
      benefit1Title: 'Conforme Padrões Oficiais',
      benefit1Description: 'Atende a todos os requisitos de tamanho e formato',
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
      advantage3Description: 'Garante que sua foto será aceita conforme diretrizes e legislação.',
      // Valores da tabela
      table_tamanho: '5,08 cm x 5,08 cm',
      table_resolucao: '300 dpi',
      table_online: 'Sim',
      table_imprimivel: 'Sim',
      table_fundo: 'Branco',
      table_altura_cabeca: '1.29 polegada → 3.28 cm',
      table_distancia_olhos: '1.18 polegada → 3.00 cm',
      // Títulos da tabela
      table_titulo_tamanho: 'Tamanho',
      table_titulo_resolucao: 'Resolução',
      table_titulo_online: 'É adequado para envio on-line?',
      table_titulo_imprimivel: 'É imprimível?',
      table_titulo_fundo: 'Cor do fundo',
      table_titulo_parametros: 'Parâmetros de definição de imagem',
      table_titulo_altura_cabeca: 'Altura da cabeça:',
      table_titulo_distancia_olhos: 'Do fundo da foto até a linha dos olhos:',
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
                  src="/images/frameprod1.png" 
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
              <h2 className="text-4xl font-bold mb-4">
                {benefitsContent.sectionTitle}
              </h2>
              
              {/* Purple separator */}
              <div className="w-32 h-1 bg-purple-600 mb-4"></div>
              
              <p className="text-gray-700 text-lg mb-8">
                {benefitsContent.sectionDescription}
              </p>
              
              {/* Requirements table */}
              <div className="bg-gray-50 rounded-[20px] p-4 sm:p-6 w-full md:w-[90%] md:ml-5 text-sm mx-auto md:mx-0">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-[15px]">{benefitsContent.table_titulo_tamanho}</span>
                  <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_tamanho}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-[15px]">{benefitsContent.table_titulo_resolucao}</span>
                  <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_resolucao}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-[15px]">{benefitsContent.table_titulo_online}</span>
                  <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_online}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-[15px]">{benefitsContent.table_titulo_imprimivel}</span>
                  <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_imprimivel}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-[15px]">{benefitsContent.table_titulo_fundo}</span>
                  <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_fundo}</span>
                </div>
                
                <div className="py-3">
                  <div className="font-semibold mb-2 text-[15px]">{benefitsContent.table_titulo_parametros}</div>
                  <div className="pl-4">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-[14px]">{benefitsContent.table_titulo_altura_cabeca}</span>
                      <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_altura_cabeca}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-[14px]">{benefitsContent.table_titulo_distancia_olhos}</span>
                      <span className="text-[14px] text-[#4B5A68]">{benefitsContent.table_distancia_olhos}</span>
                    </div>
                  </div>
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