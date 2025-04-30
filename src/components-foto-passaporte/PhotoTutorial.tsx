"use client"

import { useState, useEffect, useRef, forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePageContent } from '../lib/hooks';

// Define props (currently none, but good practice if adding more)
// type PhotoTutorialProps = {};

// Wrap component with forwardRef
const PhotoTutorial = forwardRef<HTMLElement /* Ref element type */>(
  (props, ref) => { // Accept props and ref
    // Get the current locale from the URL
    const params = useParams();
    const locale = params?.locale as string || 'pt-br';
    
    // Get customized content based on the current locale
    const { content, loading } = usePageContent(locale);
    
    // Get PhotoTutorial content with fallback to default values
    const photoTutorialContent = content.PhotoTutorial || {
      title: 'Como tirar uma foto para documento<br />em casa usando seu celular',
      description: 'Siga estas diretrizes para criar a foto perfeita para passaporte.',
      ctaButtonText: 'Escolha o documento',
      ctaButtonLink: '/upload',
      step1Title: 'Mantenha uma distância segura',
      step1Description: 'Mantenha sua câmera frontal a 40-50 cm de distância do rosto. Para câmeras traseiras, mantenha uma distância de 1-2 metros.',
      step2Title: 'Mantenha a cabeça e o corpo retos',
      step2Description: 'Olhe diretamente para a câmera e evite inclinar seu corpo. Lembre-se de manter uma expressão neutra ao tirar a foto.',
      step3Title: 'Prepare uma boa iluminação',
      step3Description: 'Tire suas fotos para passaporte em um ambiente com luz do dia, como perto de uma janela em um dia ensolarado.'
    };
    
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
    const [isMoving, setIsMoving] = useState(false);
    // Remove internal sectionRef, we'll use the forwarded ref
    // const sectionRef = useRef<HTMLElement>(null);
    const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Efeito para rastrear o mouse e pulsação
    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        // Use the forwarded ref here (check if it's assigned)
        if (ref && typeof ref !== 'function' && ref.current) {
          const rect = ref.current.getBoundingClientRect();
          setMousePosition({ 
            x: event.clientX - rect.left, 
            y: event.clientY - rect.top 
          });

          setIsMoving(true);
          if (moveTimeoutRef.current) {
            clearTimeout(moveTimeoutRef.current);
          }
          moveTimeoutRef.current = setTimeout(() => {
            setIsMoving(false);
          }, 150);
        }
      };

      // Use the forwarded ref here as well for adding/removing listener
      let currentSectionRef: HTMLElement | null = null;
      if (ref && typeof ref !== 'function') {
        currentSectionRef = ref.current;
      }

      if (currentSectionRef) {
        currentSectionRef.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (currentSectionRef) {
          currentSectionRef.removeEventListener('mousemove', handleMouseMove);
        }
        if (moveTimeoutRef.current) {
          clearTimeout(moveTimeoutRef.current);
        }
      };
    }, [ref]); // Add ref to dependency array

    // Ajustar tamanho, blur e opacidade baseado no movimento - REDUZIDO
    const glowSize = isMoving ? 280 : 210; // Reduzido em 30% (era 400 : 300)
    const glowBlur = isMoving ? 'blur(60px)' : 'blur(50px)'; // Blur mantido
    const glowOpacity = isMoving ? 0.15 : 0.1125; // Reduzido em 25% (era 0.20 : 0.15)

    return (
      <section 
        ref={ref} // Assign the forwarded ref here
        className="relative bg-[#F1F6FA] overflow-hidden py-16 font-montserrat"
      >
        {/* Mouse Glow Effect - Increased z-index */}
        <div 
          className="absolute z-[5] pointer-events-none"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: `radial-gradient(circle, rgba(121, 30, 221, ${glowOpacity}) 0%, rgba(121, 30, 221, 0) 70%)`,
            borderRadius: '50%',
            filter: glowBlur,
            transform: 'translate(-50%, -50%)',
            transition: 'left 0.3s ease-out, top 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out, filter 0.3s ease-out, opacity 0.3s ease-out', 
          }}
        />

        {/* Background elements - Kept at z-0 */}
        <div className="absolute top-0 left-0 z-0" style={{ 
          transform: 'translate(-10px, -10px)',
          clipPath: 'inset(10px 10px 10px 10px)'
        }}>
          <Image 
            src="/images/herotopleft.png" 
            alt="Background design" 
            width={620} 
            height={620} 
            className="object-contain"
          />
        </div>

        {/* Main content container - Removed z-index */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          {/* Mobile layout (flex-col) for small screens, desktop layout for larger screens */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-row lg:justify-between mb-2">
            <h2 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: photoTutorialContent.title }}></h2>
            
            {/* Only show purple line here on mobile */}
            <div className="w-32 h-1 bg-purple-600 mt-2 mb-4 lg:hidden"></div>
            
            {/* Description for mobile only */}
            <p className="text-gray-600 mb-6 lg:hidden">
              {photoTutorialContent.description}
            </p>
            
            <Link 
              href={photoTutorialContent.ctaButtonLink} 
              className="mt-4 lg:mt-0 inline-block px-8 py-4 rounded-full text-white font-bold hover:opacity-90 transition-colors text-[13px] tracking-tight w-auto mx-auto lg:mx-0"
              style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)' }}
            >
              {photoTutorialContent.ctaButtonText}
            </Link>
          </div>
          
          {/* Purple line (desktop only) */}
          <div className="w-32 h-1 bg-purple-600 mb-4 hidden lg:block"></div>
          
          {/* Description (desktop only) */}
          <p className="text-gray-600 mb-12 hidden lg:block">
            {photoTutorialContent.description}
          </p>

          {/* Desktop layout for images */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
            {/* Group 1: Image 1 */}
            <div className="md:col-span-1">
              <Image 
                src="/images/photo1.png" 
                alt="Distância da câmera" 
                width={276} 
                height={225} 
                className="w-full h-auto rounded-md"
              />
            </div>
            
            {/* Group 2: Images 2-1 and 2-2 */}
            <div className="md:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Image 
                    src="/images/photo2-1.png" 
                    alt="Posição correta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div>
                  <Image 
                    src="/images/photo2-2.png" 
                    alt="Posição incorreta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
            
            {/* Group 3: Images 3-1 and 3-2 */}
            <div className="md:col-span-1">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Image 
                    src="/images/photo3-1.png" 
                    alt="Posição correta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="relative">
                  <Image 
                    src="/images/photo2-2.png" 
                    alt="Posição incorreta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop steps section */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex items-start">
              <span 
                className="flex-shrink-0 mr-4 text-6xl font-bold"
                style={{ 
                  background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                1
              </span>
              <div>
                <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step1Title}</h3>
                <p className="text-gray-600 text-sm">
                  {photoTutorialContent.step1Description}
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-start">
              <span 
                className="flex-shrink-0 mr-4 text-6xl font-bold"
                style={{ 
                  background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                2
              </span>
              <div>
                <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step2Title}</h3>
                <p className="text-gray-600 text-sm">
                  {photoTutorialContent.step2Description}
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-start">
              <span 
                className="flex-shrink-0 mr-4 text-6xl font-bold"
                style={{ 
                  background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                3
              </span>
              <div>
                <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step3Title}</h3>
                <p className="text-gray-600 text-sm">
                  {photoTutorialContent.step3Description}
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT - Only shows on small screens */}
          <div className="flex flex-col items-center md:hidden mt-8">
            {/* Step 1 mobile */}
            <div className="max-w-xs mx-auto mb-8 text-center">
              <Image 
                src="/images/photo1.png" 
                alt="Distância da câmera" 
                width={276} 
                height={225} 
                className="w-full h-auto rounded-md mb-4"
              />
              
              <div className="flex flex-row items-center text-center">
                <span 
                  className="flex-shrink-0 mr-3 text-6xl font-bold"
                  style={{ 
                    background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  1
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step1Title}</h3>
                  <p className="text-gray-600 text-sm">
                    {photoTutorialContent.step1Description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 2 mobile */}
            <div className="max-w-xs mx-auto mb-8 text-center">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Image 
                    src="/images/photo2-1.png" 
                    alt="Posição correta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div>
                  <Image 
                    src="/images/photo2-2.png" 
                    alt="Posição incorreta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex flex-row items-center text-center">
                <span 
                  className="flex-shrink-0 mr-3 text-6xl font-bold"
                  style={{ 
                    background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  2
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step2Title}</h3>
                  <p className="text-gray-600 text-sm">
                    {photoTutorialContent.step2Description}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Step 3 mobile */}
            <div className="max-w-xs mx-auto mb-8 text-center">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Image 
                    src="/images/photo3-1.png" 
                    alt="Posição correta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="relative">
                  <Image 
                    src="/images/photo2-2.png" 
                    alt="Posição incorreta" 
                    width={170} 
                    height={225} 
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex flex-row items-center text-center">
                <span 
                  className="flex-shrink-0 mr-3 text-6xl font-bold"
                  style={{ 
                    background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  3
                </span>
                <div className="text-left">
                  <h3 className="font-semibold text-xl mb-2">{photoTutorialContent.step3Title}</h3>
                  <p className="text-gray-600 text-sm">
                    {photoTutorialContent.step3Description}
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

PhotoTutorial.displayName = 'PhotoTutorial'; // Add display name

export default PhotoTutorial; // Export the wrapped component 