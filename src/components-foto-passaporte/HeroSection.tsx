import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { usePageContent, useProductContent } from '../lib/hooks';

export default function HeroSection() {
  // State to track if content is fully ready
  const [contentReady, setContentReady] = useState(false);
  
  // Create ref for the hero image
  const heroImageRef = useRef<HTMLImageElement>(null);
  
  // Get the current locale from the URL
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  const product = params?.product as string || 'foto-passaporte';
  
  // Get customized content based on the current locale AND product
  const { content: pageContent } = usePageContent(locale);
  const { content: productContent, loading } = useProductContent(product);
  
  // Check if we're in the special case path /pt-br/foto-passaporte which needs fixed text
  const isDefaultPassportPage = locale === 'pt-br' && product === 'foto-passaporte';
  
  // Use custom content for the special case path
  const content = isDefaultPassportPage ? {
    mainTitle: 'Tire sua foto para o passaporte Brasileiro',
    mainSubtitle: 'Capture a sua foto para passaporte Brasileiro sem a necessidade de ir ao local. Tudo o que você precisa é da nossa plataforma IA de fotos para Passaporte Brasileiro!',
    ctaButton: 'Tirar foto',
    ctaButtonLink: '/upload',
    secondaryButton: 'Faça o upload da sua imagem',
    secondaryButtonLink: '/upload',
    ratingText: '4.9 (6.493 avaliações)',
    usersText: 'Mais de 200 mil usuários satisfeitos',
    productImage: '/images/passaportebrasil.png'
  } : {
    ...pageContent?.HeroSection || {},
    ...productContent?.HeroSection || {}
  };
  
  // Set content as ready when loading is complete
  useEffect(() => {
    if (!loading) {
      // Aumentar o timeout para ser consistente com outros componentes
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);
  
  // Return a minimal container while loading to prevent content flash
  if (!contentReady) {
    return (
      <section className="relative bg-[#FAFAFA] overflow-hidden md:min-h-[720px] md:h-[calc(80vh-80px)] md:max-h-[840px] min-h-[900px] h-auto">
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
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <Image src="/images/herodown.png" alt="Background gradient" width={1920} height={200} className="w-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full relative z-10 flex items-center">
          {/* Loading placeholders */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-40"></div>
              <div className="h-12 bg-gray-100 rounded-lg animate-pulse w-64 mt-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#FAFAFA] overflow-hidden md:min-h-[720px] md:h-[calc(80vh-80px)] md:max-h-[840px] min-h-[900px] h-auto">
      {/* Background elements */}
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
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <Image src="/images/herodown.png" alt="Background gradient" width={1920} height={200} className="w-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <div className="self-center space-y-6 md:pt-0 pt-[50px]">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {content.mainTitle || 'Tire sua foto para o passaporte Brasileiro'}
            </h1>
            <div className="w-12 bg-purple-600" style={{ background: 'linear-gradient(to right, #6A0FDA, #B45DEB)', height: '2px', marginTop: '-10px' }}></div>
            <p className="text-lg text-gray-700">
              {content.mainSubtitle || 'Capture a sua foto para passaporte Brasileiro sem a necessidade de ir ao local. Tudo o que você precisa é da nossa plataforma IA de fotos para Passaporte Brasileiro!'}
            </p>
            
            {/* Mobile hero image after subtitle */}
            <div className="block md:hidden mt-4 mb-6" style={{ marginTop: '-30px' }}>
              <div className="mx-auto relative" style={{ maxWidth: '384px', marginLeft: 'calc(50% - 172px)' }}>
                <img 
                  src="/images/foto1produto.png" 
                  alt="Person taking passport photo" 
                  className="w-full h-auto"
                />
                {/* Imagem do produto no canto inferior direito para mobile */}
                {content.productImage && (
                  <div className="absolute z-10" style={{ bottom: '8px', right: '68px' }}>
                    <img 
                      src={content.productImage} 
                      alt="Product" 
                      className="w-16 h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:flex md:justify-start md:ml-[80px] flex justify-center ml-0 relative">
              <Image 
                src="/images/framedrop.png" 
                alt="Escolha o documento" 
                width={384} 
                height={115} 
                className="object-contain"
              />
              {/* Mobile buttons (hidden on desktop) */}
              <div className="md:hidden absolute" style={{ 
                top: 'calc(50% + 65px)',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '320px',
                zIndex: 10
              }}>
                <button 
                  className="w-full inline-block rounded-full text-white font-bold hover:opacity-90 transition-colors tracking-tight text-[12px] px-4 py-3 mb-2"
                  style={{ 
                    background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {content.ctaButton || "Tirar foto"}
                </button>
                
                <button 
                  className="w-full inline-block rounded-full text-white font-bold hover:opacity-90 transition-colors tracking-tight text-[12px] px-4 py-3"
                  style={{ 
                    background: 'linear-gradient(to right, #0F53DA, #03BDFB)',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
                >
                  {content.secondaryButton || "Faça o upload da sua imagem"}
                </button>
              </div>
              
              {/* Desktop buttons (hidden on mobile) */}
              <div className="hidden md:block absolute" style={{ 
                top: 'calc(50% + 68px)',
                left: 'calc(50% - 68px)',
                transform: 'translate(-50%, -50%)',
                width: '310px',
                zIndex: 10
              }}>
                <button 
                  className="w-full inline-block rounded-full text-white font-bold hover:opacity-90 transition-colors tracking-tight text-[14px] px-9 py-3 mb-1.5"
                  style={{ 
                    background: 'linear-gradient(to right, #6A0FDA, #B45DEB)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {content.ctaButton || "Tirar foto"}
                </button>
                
                <button 
                  className="w-full inline-block rounded-full text-white font-bold hover:opacity-90 transition-colors tracking-tight text-[14px] px-9 py-3"
                  style={{ 
                    background: 'linear-gradient(to right, #0F53DA, #03BDFB)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {content.secondaryButton || "Faça o upload da sua imagem"}
                </button>
              </div>
            </div>
            
            {/* Ratings section - only visible on desktop */}
            <div className="md:flex hidden items-center gap-2 pt-4">
              <div className="flex -space-x-3">
                {/* User avatars */}
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p1.png" alt="Avatar 1" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p2.png" alt="Avatar 2" width={44} height={44} className="object-cover" />
                </div>
                <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                  <Image src="/images/p3.png" alt="Avatar 3" width={44} height={44} className="object-cover" />
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  {/* Star rating */}
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{content.ratingText || "4.9 (6.493 avaliações)"}</span>
                </div>
                <p className="text-xs text-gray-500">{content.usersText || "Mais de 200 mil usuários satisfeitos"}</p>
              </div>
            </div>
          </div>
          
          {/* Desktop hero image */}
          <div className="hidden md:flex items-center justify-end h-full relative">
            <div className="relative w-full h-full">
              <img 
                ref={heroImageRef}
                src="/images/foto1produto.png" 
                alt="Person taking passport photo" 
                className="h-full w-auto object-contain"
                style={{ position: 'absolute', right: '0px', bottom: 0, top: 0 }}
              />
              {/* Imagem do produto no canto inferior direito */}
              {content.productImage && (
                <div className="absolute z-10" style={{ bottom: '136px', right: '126px' }}>
                  <img 
                    src={content.productImage} 
                    alt="Product" 
                    className="w-20 h-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Mobile ratings section */}
          <div className="flex md:hidden justify-center items-center gap-2 pt-2 pb-8">
            <div className="flex -space-x-3">
              {/* User avatars */}
              <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/images/p1.png" alt="Avatar 1" width={44} height={44} className="object-cover" />
              </div>
              <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/images/p2.png" alt="Avatar 2" width={44} height={44} className="object-cover" />
              </div>
              <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden relative">
                <Image src="/images/p3.png" alt="Avatar 3" width={44} height={44} className="object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-center">
                {/* Star rating */}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{content.ratingText || "4.9 (6.493 avaliações)"}</span>
              </div>
              <p className="text-xs text-gray-500">{content.usersText || "Mais de 200 mil usuários satisfeitos"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 