"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCustomizations } from '../lib/hooks';

export default function DocumentSelect() {
  // Use o hook de customizações para obter valores personalizados
  const customizations = useCustomizations('DocumentSelect');

  const documents = [
    {
      id: 1,
      title: customizations.document1Title || 'Passaporte Brasileiro',
      image: customizations.document1Image || '/images/passaportebrasil.png',
      href: customizations.document1Link || '/pt-br/foto-passaporte',
      buttonText: customizations.document1ButtonText || 'Iniciar'
    },
    {
      id: 2,
      title: customizations.document2Title || 'RG Brasileiro',
      image: customizations.document2Image || '/images/passaportebrasil.png',
      href: customizations.document2Link || '/pt-br/foto-rg',
      buttonText: customizations.document2ButtonText || 'Iniciar'
    },
    {
      id: 3,
      title: customizations.document3Title || 'Passaporte Bebê',
      image: customizations.document3Image || '/images/passaportebrasil.png',
      href: customizations.document3Link || '/pt-br/foto-passaporte-bebe',
      buttonText: customizations.document3ButtonText || 'Iniciar'
    },
    {
      id: 4,
      title: customizations.document4Title || 'CNH Brasileira',
      image: customizations.document4Image || '/images/passaportebrasil.png',
      href: customizations.document4Link || '/pt-br/foto-cnh',
      buttonText: customizations.document4ButtonText || 'Iniciar'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: customizations.testimonial1Name || 'Fernando Lima',
      avatar: customizations.testimonial1Avatar || '/images/avt3.png',
      location: customizations.testimonial1Location || '',
      stars: 5,
      text: customizations.testimonial1Text || 'Nunca pensei que tirar foto para passaporte seria tão simples! Em apenas alguns minutos consegui fazer minha foto digital em casa.'
    },
    {
      id: 2,
      name: customizations.testimonial2Name || 'Roberto Barros',
      location: customizations.testimonial2Location || 'Santa Catarina - SC',
      avatar: customizations.testimonial2Avatar || '/images/avt2.png',
      stars: 5,
      text: customizations.testimonial2Text || 'Estava com receio de usar um serviço online, mas fiquei impressionada com a qualidade e rapidez na entrega. Recomendo!'
    },
    {
      id: 3,
      name: customizations.testimonial3Name || 'Vânia Santana',
      location: customizations.testimonial3Location || 'Campinas - SC',
      avatar: customizations.testimonial3Avatar || '/images/avt1.png',
      stars: 5,
      text: customizations.testimonial3Text || 'Usei o PhotoID para tirar a foto do passaporte dos meus filhos. Incrível como o resultado ficou profissional e foi aceito sem problemas.'
    },
    {
      id: 4,
      name: customizations.testimonial4Name || 'Carlos Andrade',
      location: customizations.testimonial4Location || 'Rio de Janeiro - RJ',
      avatar: customizations.testimonial4Avatar || '/images/testimonial-placeholder-c.png',
      stars: 5,
      text: customizations.testimonial4Text || 'Processo muito intuitivo e o suporte foi ágil quando precisei. A foto ficou ótima e atendeu todas as exigências.'
    },
    {
      id: 5,
      name: customizations.testimonial5Name || 'Beatriz Costa',
      location: customizations.testimonial5Location || 'Belo Horizonte - MG',
      avatar: customizations.testimonial5Avatar || '/images/testimonial-placeholder-b.png',
      stars: 5,
      text: customizations.testimonial5Text || 'Excelente! Economizei tempo e evitei filas. A qualidade da foto digital é perfeita para documentos oficiais.'
    },
    {
      id: 6,
      name: customizations.testimonial6Name || 'Paulo Mendes',
      location: customizations.testimonial6Location || 'Salvador - BA',
      avatar: customizations.testimonial6Avatar || '/images/testimonial-placeholder-p.png',
      stars: 5,
      text: customizations.testimonial6Text || 'Serviço fantástico! Consegui a foto para minha CNH rapidamente e sem sair de casa. Recomendo a todos.'
    }
  ];

  // State for carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on client-side
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create circular array for infinite scrolling
  const getCircularIndex = (index: number) => {
    const length = testimonials.length;
    return ((index % length) + length) % length; // Ensure positive modulo
  };

  // Get visible testimonials based on current active index and viewport
  const getVisibleTestimonials = () => {
    if (isMobile) {
      // Only return one testimonial on mobile
      return [testimonials[getCircularIndex(activeIndex)]];
    } else {
      // Return three testimonials on desktop
      return [0, 1, 2].map(offset => {
        const index = getCircularIndex(activeIndex + offset);
        return testimonials[index];
      });
    }
  };

  const handlePrev = () => {
    setActiveIndex(prev => getCircularIndex(prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => getCircularIndex(prev + 1));
  };

  const buttonStyle = {
    background: '#F9FAFB',
    width: '100px',
    color: 'black',
    border: '1px solid black'
  };

  // Render document items based on viewport
  const renderDocuments = () => {
    if (isMobile) {
      // Mobile list view
      return (
        <div className="flex flex-col space-y-6">
          {documents.map((doc) => (
            <Link key={doc.id} href={doc.href} className="block">
              <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 rounded-3xl shadow-none relative">
                <div className="flex items-center">
                  <div className="w-16 h-16 mr-4 flex-shrink-0 relative -top-6">
                    <Image 
                      src={doc.image} 
                      alt={`Foto para ${doc.title}`} 
                      width={64} 
                      height={90} 
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">{doc.title}</h3>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      );
    } else {
      // Desktop grid view
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {documents.map((doc) => (
            <div key={doc.id} className="relative">
              <div className="relative w-full">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/5 z-10">
                  <Image 
                    src={doc.image} 
                    alt={`Foto para ${doc.title}`} 
                    width={110} 
                    height={154} 
                    className="object-contain"
                  />
                </div>
                <div className="bg-gray-50 pt-20 pb-4 px-4 rounded-lg shadow-sm h-64 w-full flex flex-col items-center justify-between mt-16">
                  <div>
                    <p className="text-center text-sm font-medium mt-16">{doc.title.split(' ')[0]}<br />{doc.title.split(' ')[1]}</p>
                  </div>
                  <Link 
                    href={doc.href} 
                    className="px-5 py-2 rounded-full text-sm font-medium text-center"
                    style={buttonStyle}
                  >
                    {doc.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="py-16 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Document Selection */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-2 text-center">{customizations.sectionTitle || 'Escolha o documento'}</h2>
          <div className="flex justify-center mb-12">
            <div className="h-0.5 w-20 bg-purple-400 rounded"></div>
          </div>
          
          {renderDocuments()}
          
          <div className="text-center mt-20 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6A0FDA] to-[#B45DEB] transform -translate-y-1/2 z-0 mx-8"></div>
            <Link 
              href={customizations.viewMoreButtonLink || '/ver-todos-documentos'}
              className="relative z-10 inline-block px-8 py-4 rounded-full text-white text-[13px] font-bold tracking-tight hover:opacity-90 transition-colors"
              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            >
              {customizations.viewMoreButtonText || 'Ver mais documentos'}
            </Link>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="relative px-8 md:px-12">
          <h2 className="text-3xl font-bold mb-2 text-center">{customizations.testimonialsTitle || 'Clientes Reais, Histórias Reais.'}</h2>
          <div className="flex justify-center mb-12">
            <div className="h-0.5 w-20 bg-purple-400 rounded"></div>
          </div>
          <p className="text-center text-gray-600 mb-12">
            {customizations.testimonialsSubtitle || 'Veja o que nossos clientes estão falando e como Photo ID ajudou a aprovar seus vistos com nossas fotos.'}
          </p>

          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden pt-8">
              {/* Visible testimonials container */}
              <div className="flex gap-6">
                {getVisibleTestimonials().map((testimonial, idx) => (
                  <div 
                    key={`${testimonial.id}-${idx}`} 
                    className={`relative bg-white p-8 pt-10 mt-4 rounded-lg border border-gray-100 shadow-xs ${isMobile ? 'w-full' : 'w-1/3'}`}
                  >
                    {/* Quote Icon */}
                    <div 
                      className="absolute -top-6 left-4 transform z-10 shadow-[0_8px_18px_-8px_rgba(180,93,235,0.9)]"
                    >
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}>
                        <Image src="/images/quotes.png" alt="Quote icon" width={20} height={20} />
                      </div>
                    </div>

                    <p className="text-gray-600 mb-8 text-sm leading-relaxed">{testimonial.text}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-3">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          {testimonial.location && (
                            <p className="text-gray-500 text-xs">{testimonial.location}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-white rounded-full p-2 shadow-md border border-gray-200 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 md:translate-x-8 bg-white rounded-full p-2 shadow-md border border-gray-200 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 